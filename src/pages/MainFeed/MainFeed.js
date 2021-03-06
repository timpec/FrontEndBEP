import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import Image from 'react-bootstrap/Image';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import {getTodayEvents, getEvents} from '../../services/graphqlService';

import "./MainFeed.css";
import moment from "moment"

export default function MainFeed(props) {
  const [events, updateEvents] = React.useState([]);
  const [todayEvents, updateTodayEvents] = React.useState([]);
  const [eventId, setEventId] = React.useState("");
  const [detailPage, setdetailPage] = React.useState(false);

useEffect(() => {
  const getData = async () => { 
    let data = await getEvents();
    let data1 = await getTodayEvents("today");
    updateEvents(data);
    updateTodayEvents(data1);
  }
  getData();
},[todayEvents]);

const redirectToDetailPage = (id) => {
  setEventId(id);
  setdetailPage(true);
}

const getSearch = async () => {
  let string = document.getElementById("MainFeedInput").value
  if(string.length >= 3) {
    let data = await getEvents(string);
    updateEvents(data);
  } else if(string.length === 0) {
    let data = await getEvents();
    updateEvents(data);
  }
  }

const popover = (tags) => {
  return (<Popover id="popover-positioned-bottom">
    <Popover.Content>
    {tags.map(item => (
      <p>{item.name}</p>
    )
    )}
    </Popover.Content>
  </Popover>
  )};

return (

    <div className="p-1">
      {detailPage ? <Redirect push to={"/DetailPage/"+eventId}/> : <div></div>}
      <h3  className="align-self-center">This week:</h3>
      <div className="d-flex p-1 justify-content-around">
      {todayEvents.map(item => (
          <Image className="MainFeedThumbNail" onClick={() => {redirectToDetailPage(item.id)}} key={item.id}  src={item.description.images[0] ? item.description.images[0].url : "https://i.picsum.photos/id/100/50/50.jpg?blur=1"} rounded />
        ))}
      
      </div>
      <div className="md-form mt-0 d-flex flex-row">
      <input className="form-control" onChange={(() => {getSearch()})} type="text" id="MainFeedInput" placeholder="Search" aria-label="Search"/>
      </div>
      <ul className="list-group">
      {events.map(item => (
        <li className="list-group-item" key={item.id}>
        <div className="list-group-item">
        <img className="MainFeedImage rounded mx-auto d-block" onClick={() => {redirectToDetailPage(item.id)}} alt="Event" src={item.description.images[0] ? item.description.images[0].url : "https://i.picsum.photos/id/100/50/50.jpg?blur=1"}></img>
          <h5>{item.name.fi}</h5>
          <div className="d-flex flex-row bd-highlight mb-3">
          <div className="d-flex flex-column bd-highlight mb-3">
          <div className="p-2 bd-highlight">{moment(new Date(parseInt(item.event_dates.starting_day)).toString()).subtract(0, 'days').calendar() +""+ (item.event_dates.ending_day ? "-"+moment(new Date(parseInt(item.event_dates.ending_day)).toString()).calendar() : "")}</div>
          <div className="p-2 bd-highlight">{item.location.address.street_address}</div>
          <div className="p-2 bd-highlight">Participants: {item.reserved.length}</div>      

          <div className="d-flex justify-content-around">
            {item.tags[0] ? 
              <Badge pill variant="secondary">{item.tags[0].name}</Badge>:<div></div>
          }
          {item.tags[1] ? 
              <Badge pill variant="secondary">{item.tags[1].name}</Badge>:<div></div>
          }
           {item.tags[2] ? 
           <OverlayTrigger trigger="click" placement="bottom" overlay={(popover(item.tags.slice(2)))}>
              <Badge pill variant="secondary">{item.tags.length -2 + " more"}</Badge></OverlayTrigger>:<div></div>
          }
          </div>
          </div>
          </div>
          </div>
          </li>
      ))}
      </ul>      
    </div>
  );
}

/*

<div className="d-flex flex-column bd-highlight mb-1">
          <p className="p-1 bd-highlight">Flex item 2</p>
          <p className="p-1 bd-highlight">Flex item 2</p>          
          </div>

//jos tarvii lisä kolumneja
          <div className="d-flex flex-column bd-highlight mb-3">
          <div className="p-2 bd-highlight">Flex item 1</div>
          <div className="p-2 bd-highlight">Flex item 2</div>
          <div className="p-2 bd-highlight">Flex item 3</div>
          </div>

          <h3  className="align-self-center">Today:</h3>
      <div class="d-flex p-5 justify-content-around">
      <Image src="https://i.picsum.photos/id/100/50/50.jpg?blur=1" roundedCircle />
      <Image src="https://i.picsum.photos/id/100/50/50.jpg?blur=1" roundedCircle />
      <Image src="https://i.picsum.photos/id/100/50/50.jpg?blur=1" roundedCircle />
      <Image src="https://i.picsum.photos/id/100/50/50.jpg?blur=1" roundedCircle />
      </div>
      */

