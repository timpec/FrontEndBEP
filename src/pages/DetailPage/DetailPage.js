import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';

import { getDetailedEvent, addReservation, removeReservation } from '../../services/graphqlService';
import { Redirect } from "react-router-dom";
import Map from '../../components/Map/map.gl'
import MainCard from '../../components/cards/mainCard'
import MoreInfoCard from '../../components/cards/moreInfoCard'
import WeatherCard from '../../components/cards/weatherCard'
import RouteCard from '../../components/cards/routeCard'

import moment from "moment"

export default function MainFeed() {
  const {id} = useParams();
  const [event, updateEvent] = React.useState([]);
  const [reservedData, updateReservedData] = React.useState("");
  const [reservedSuccess, updateReservedSuccess] = React.useState(false);
  const [userToken, updateuserToken] = React.useState(true);
  const [errorMessage, updateErrorMessage] = React.useState(false);
  const [successMessage, updateSuccessMessage] = React.useState(false);

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
  const userToken = localStorage.getItem('userid');
  if(!userToken) {
    updateuserToken(false)
  }
  let data = await addReservation(userToken, id, reservedData);
  if(data && data.data) {
    updateReservedSuccess(true)
  } else {
    updateErrorMessage(true)
  }
}
const deleteReservation = async () => {
  const userToken = localStorage.getItem('userid');
  if(!userToken) {
    updateuserToken(false)
  }
  let data = await removeReservation(userToken, id);
  if(data && data.data) {
    updateSuccessMessage(true)
  } else {
    updateErrorMessage(true)
  } 
} 

return ( 
<div>
  {userToken ? <div></div>: <Redirect to='/login' />}
{event.map(item => (
        <li className="list-group-item p-0" key={item.id}>
        <div className="list-group-item">
        <h5 className="">{item.name.fi}</h5>
        <img className="MainFeedImage rounded mx-auto d-block" alt="Event" src={item.description.images[0] ? item.description.images[0].url : "https://i.picsum.photos/id/100/50/50.jpg?blur=1"}></img>
        <Tabs defaultActiveKey="main" id="uncontrolled-tab-example">
        <Tab eventKey="main" title={<img alt="main info"src={require("../../assets/info.svg")}/>}>
            <MainCard ending_day={item.event_dates.ending_day} starting_day={item.event_dates.starting_day} address={item.location.address.street_address}/>
        </Tab>
        <Tab eventKey="more" title={<img alt="more info" src={require("../../assets/file.svg")}/>}>
          <MoreInfoCard moreInfo={item.description.intro}/>
        </Tab>
        <Tab eventKey="weather" title={<img alt="weather" src={require("../../assets/cloud.svg")}/>}>
              <WeatherCard daysWeather={item.event_dates.weather}/>
        </Tab>
        <Tab eventKey="map" mountOnEnter={true} title={<img alt="Map to the place" src={require("../../assets/map.svg")}/>}>
          <div className="d-flex flex-row bd-highlight mb-3">
            {item.location.lat && item.location.lon ? 
              <Map event={[item]}/>
              : <div><h3>Ei Paikkaa määritelty</h3></div>
            }
          </div>
        </Tab>
        <Tab eventKey="routes" title={<img alt="Map to the place" src={require("../../assets/arrow.svg")}/>}>
            <RouteCard routes={item.location.route.plan.itineraries}/>
        </Tab>
        <Tab eventKey="reserved" title={<img alt="if Reserved" src={require("../../assets/"+ (item.reservedById != null || reservedSuccess ? "reserved" : "notReserved") + ".svg")}/>}>
        {item.reservedById == null || reservedSuccess ? (
             <div className="d-flex flex-row bd-highlight p-3">
             <div className="d-flex flex-column bd-highlight p-3">
          <Dropdown>
        <Dropdown.Toggle variant="success m-3 d-flex justify-content-center" id="dropdown-basic">
        {!reservedData ? "Date" : moment(new Date(parseInt(reservedData * 1000))).calendar() }
        </Dropdown.Toggle>
        <Dropdown.Menu>
        {item.event_dates.weather.map((daysWeather) => (
                <Dropdown.Item as="button" onClick={((event) => {updateReservedData(daysWeather.ts)})}>{moment(new Date(parseInt(daysWeather.ts * 1000)).toString()).subtract(0, 'days').calendar()}</Dropdown.Item>
        ))}
        </Dropdown.Menu>
        </Dropdown>
        <Button variant="success m-3" disabled={!reservedData || reservedSuccess} onClick={reserve}>Reserve</Button>{' '}
        <div hidden={!errorMessage} className="alert alert-danger m-3" role="alert">
         Something went wrong
         </div>
         <div hidden={!reservedSuccess} className="alert alert-info m-3" role="alert">
         Reserved the event!
         </div>
         </div>
          </div>):(
           <div className="d-flex flex-column bd-highlight p-3">
            <p>You have already reserved the event</p>
            <div hidden={!errorMessage} className="alert alert-danger m-3" role="alert">
         Something went wrong!
         </div>
         <div hidden={!successMessage} className="alert alert-info m-3" role="alert">
         Deleted the event!
         </div>
            <Button variant="danger" onClick={deleteReservation}>Delete reservation</Button>{' '}
          </div>)}

        </Tab>
        <Tab eventKey="link" title={<img alt="link" src={require("../../assets/link.svg")}/>}>
          <div className="d-flex flex-row bd-highlight p-3">
          <div className="d-flex flex-column bd-highlight p-3">
          <div className="p-2 bd-highlight">
            {
            item.info_url ? 
            <Button variant="primary" target="_blank" href={item.info_url}>Website</Button>
              :<div>
               <h5 className="p-2 bd-highlight">No link provided</h5>
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

