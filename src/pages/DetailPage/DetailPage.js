import React, { useEffect } from "react";
import { ApolloClient, HttpLink, InMemoryCache, gql } from '@apollo/client';
import { useParams } from "react-router-dom";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Button from 'react-bootstrap/Button';

import moment from "moment"

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:3001/Graphql',
  })
});

export default function MainFeed() {
  const {id} = useParams();
  const [event, updateEvent] = React.useState([]);

useEffect(() => {
  const getData = async () => { 
    let data = await getEvent(id);
    console.log(data);
    updateEvent(data);
  }
  getData();
}, [id]);

return ( 
<div>
{event.map(item => (
        <li className="list-group-item p-0" key={item.id}>
        <div className="list-group-item">
        <h5 className="">{item.name.fi}</h5>
        <img className="MainFeedImage rounded mx-auto d-block" alt="Event" src={item.description.images[0].url ? item.description.images[0].url : "https://i.picsum.photos/id/100/50/50.jpg?blur=1"}></img>
        <Tabs defaultActiveKey="weather" id="uncontrolled-tab-example">
        <Tab eventKey="main" title={<img alt="main info"src={require("../../assets/info.svg")}/>}>
        <div className="d-flex flex-row bd-highlight mb-3">
          <div className="d-flex flex-column bd-highlight mb-3">
          <div className="p-2 bd-highlight">{moment(new Date(parseInt(item.event_dates.starting_day)).toString()).subtract(0, 'days').calendar()+"-"+moment(new Date(parseInt(item.event_dates.ending_day)).toString()).calendar() }</div>
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
          <div className="d-flex flex-row bd-highlight mb-3">
          <div className="d-flex flex-column bd-highlight mb-3">
            {item.event_dates.weather.map((daysWeather) => (
                <div key={daysWeather.ts} className="justify-content-around p-3 ">
                <div className="p-1 bd-highlight">{moment(new Date(parseInt(daysWeather.ts * 1000)).toString()).subtract(0, 'days').calendar()}</div>
                <div>         </div>
                <h5 className="p-1 bd-highlight">{daysWeather.temp+ "°C"}</h5>
                </div>
            ))}
          </div>
          </div>
        </Tab>
        <Tab eventKey="map" title={<img alt="Map to the place" src={require("../../assets/map.svg")}/>}>
          <div className="d-flex flex-row bd-highlight mb-3">
          <div className="d-flex flex-column bd-highlight mb-3">
          <div className="p-2 bd-highlight">more info</div>
          </div>
          </div>
        </Tab>
        <Tab eventKey="reserved" title={<img alt="if Reserved" src={require("../../assets/notReserved.svg")}/>}>
          <div className="d-flex flex-row bd-highlight mb-3">
          <div className="d-flex flex-column bd-highlight mb-3">
          <div className="p-2 bd-highlight">more info</div>
          </div>
          </div>
        </Tab>
        <Tab eventKey="link" title={<img alt="link" src={require("../../assets/link.svg")}/>}>
          <div className="d-flex flex-row bd-highlight mb-3">
          <div className="d-flex flex-column bd-highlight mb-3">
          <div className="p-2 bd-highlight">
          <Button variant="primary" target="_blank" href={item.info_url}>Website</Button>
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

const getEvent = (id) => { 

  return client.query({
    query: gql`
    {
      event(name: \"${id}\") {
        id
        name {
          fi
        }
        info_url
        location {
          lat
          lon
          address {
            street_address
          }
        }
        description{
          intro
          body
          images {
            url
          }
        }
        event_dates {
          starting_day
          ending_day
          weather(city:"Espoo") {
            temp
            ts
          }
        }
      }
    }
    `
  })
  .then(result => {
    return(result.data.event)
  });
}

