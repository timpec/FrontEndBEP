import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';

import { getDetailedEvent, addReservation } from '../../services/graphqlService';
import Map from '../../components/Map/map.gl'
import moment from "moment"
export default function MainFeed() {
  const {id} = useParams();
  const [event, updateEvent] = React.useState([]);
  const [reservedData, updateReservedData] = React.useState("");
  const [reservedSuccess, updateReservedSuccess] = React.useState(false);

useEffect(() => {
  const getData = async () => { 
    let data = await getDetailedEvent(id, moment(new Date()).startOf('day').format('hh:mm:ss'));
    console.log(data);
    updateEvent(data);
  }
  getData();
}, [id]);

const reserve = async () => {
  //get from the localStorage
  let userToken = "5ea5859e28b80937a44c760f";
  let data = await addReservation(userToken, id, reservedData);
  console.log(data);
  //check if reserved is success
}

return ( 
<div>
{event.map(item => (
        <li className="list-group-item p-0" key={item.id}>
        <div className="list-group-item">
        <h5 className="">{item.name.fi}</h5>
        <img className="MainFeedImage rounded mx-auto d-block" alt="Event" src={item.description.images[0] ? item.description.images[0].url : "https://i.picsum.photos/id/100/50/50.jpg?blur=1"}></img>
        <Tabs defaultActiveKey="routes" id="uncontrolled-tab-example">
        <Tab eventKey="main" title={<img alt="main info"src={require("../../assets/info.svg")}/>}>
        <div className="d-flex flex-row bd-highlight mb-3">
          <div className="d-flex flex-column bd-highlight mb-3">
          <div className="p-2 bd-highlight">{moment(new Date(parseInt(item.event_dates.starting_day)).toString()).subtract(0, 'days').calendar() +""+ (item.event_dates.ending_day ? "-"+moment(new Date(parseInt(item.event_dates.ending_day)).toString()).calendar() : "")}</div>
          <div className="p-2 bd-highlight">{item.location.address.street_address}</div>
          <div className="p-2 bd-highlight">more info</div>
          </div>
          </div>
        </Tab>
        <Tab eventKey="more" title={<img alt="more info" src={require("../../assets/file.svg")}/>}>
          <div className="d-flex flex-row bd-highlight mb-3">
          <div className="d-flex flex-column bd-highlight mb-3">
          <div className="p-2 bd-highlight">{item.description.intro}</div>
          </div>
          </div>
        </Tab>
        <Tab eventKey="weather" title={<img alt="weather" src={require("../../assets/cloud.svg")}/>}>
          <div className="d-flex flex-column bd-highlight mb-3">
            {item.event_dates.weather.map((daysWeather) => (
                <div key={daysWeather.ts} className="d-flex w-auto flex-row justify-content-between bd-highlight p-3 ">
                <div className="p-1 bd-highlight">{moment(new Date(parseInt(daysWeather.ts * 1000)).toString()).subtract(0, 'days').calendar()}</div>
                <div className="d-flex flex-column bd-highlight mb-3">
                <img alt="weather" className="imageIcon" height="30" width="30" id="imageIcon" src={"https://www.weatherbit.io/static/img/icons/"+daysWeather.weather.icon+".png"}></img>
                <h5 className="p-1 bd-highlight">{daysWeather.temp+ "°C"}</h5>
                </div>
                </div>
            ))}
          </div>
        </Tab>
        <Tab eventKey="map" title={<img alt="Map to the place" src={require("../../assets/map.svg")}/>}>
          <div className="d-flex flex-row bd-highlight mb-3">
            {item.location.lat && item.location.lon ? 
              <Map props={item}/>
              : <div><h3>Ei Paikkaa määritelty</h3></div>
            }
          </div>
        </Tab>
        <Tab eventKey="routes" title={<img alt="Map to the place" src={require("../../assets/arrow.svg")}/>}>
          <h5 className="p-2 bd-highlight">Example routes currently</h5>
          <ul className="list-group">
          {item.location.route.plan.itineraries.map((route) => (
            <div  key={Math.random(0,100)} className="card border-primary flex-column bd-highlight mb-1 list-group-item">  
            <p>{Math.round(route.duration / 60)} minutes</p>
            {route.legs.map((leg) => (
              <div key={Math.random(0,100)} className="d-flex flex-row bd-highlight mb-3">
                <p className="p-2 bd-highlight">{leg.mode}</p>
                <p className="p-2 bd-highlight">{Math.round(leg.distance)} meters</p>

              </div>
            ))}
            </div>
          ))}
            </ul>
        </Tab>
        <Tab eventKey="reserved" disabled={item.reservedById != null} title={<img alt="if Reserved" src={require("../../assets/"+ (item.reservedById != null ? "reserved" : "notReserved") + ".svg")}/>}>
          <div className="d-flex flex-row bd-highlight mb-3">
          <div className="d-flex flex-column bd-highlight mb-3">
          <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
        Date
        </Dropdown.Toggle>
        <Dropdown.Menu>
        {item.event_dates.weather.map((daysWeather) => (
                <Dropdown.Item as="button" onClick={((event) => {updateReservedData(daysWeather.ts)})}>{moment(new Date(parseInt(daysWeather.ts * 1000)).toString()).subtract(0, 'days').calendar()}</Dropdown.Item>
        ))}
        </Dropdown.Menu>
        </Dropdown>
        <Button variant="success" disabled={!reservedData || !reservedSuccess} onClick={reserve}>Reserve</Button>{' '}

          </div>
          </div>
        </Tab>
        <Tab eventKey="link" title={<img alt="link" src={require("../../assets/link.svg")}/>}>
          <div className="d-flex flex-row bd-highlight mb-3">
          <div className="d-flex flex-column bd-highlight mb-3">
          <div className="p-2 bd-highlight">
            {
            item.info_url ? 
            <Button variant="primary" target="_blank" href={item.info_url}>Website</Button>
              :<div>
               <div className="p-2 bd-highlight">No link provided</div>
              </div>
            }
          </div>
          </div>
          </div>
        </Tab>
        </Tabs>
      </div>
          
         
          </li>
      ))}
  </div>
);
}
/*
<Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
  <Tab eventKey="home" title="Home">
    <Sonnet />
  </Tab>
  <Tab eventKey="profile" title="Profile">
    <Sonnet />
  </Tab>
  <Tab eventKey="contact" title="Contact" disabled>
    <Sonnet />
  </Tab>
</Tabs>
 */

