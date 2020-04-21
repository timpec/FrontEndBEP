import React, { useEffect } from "react";
import { ApolloClient, HttpLink, InMemoryCache, gql } from '@apollo/client';

import Image from 'react-bootstrap/Image';
import "./MainFeed.css";
import moment from "moment"

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:3001/Graphql',
  })
});


export default function MainFeed(props) {
  const [events, updateEvents] = React.useState([]);
  const [todayEvents, updateTodayEvents] = React.useState([]);

useEffect(() => {
  const getData = async () => { 
    let data = await getEvents();
    let data1 = await getTodayEvents("today");
    updateEvents(data);
    updateTodayEvents(data1);
  }
  getData();
});

const getSearch = async () => {
  let string = document.getElementById("MainFeedInput").value
  let data = await getEvents(string);
  updateEvents(data);
}

return (
    <div className="p-1">
      <h3  className="align-self-center">This week:</h3>
      <div className="d-flex p-1 justify-content-around">
      {todayEvents.map(item => (
          <Image className="MainFeedThumbNail" onClick={props.handleClick} key={item.id}  src={item.description.images[0].url ? item.description.images[0].url : "https://i.picsum.photos/id/100/50/50.jpg?blur=1"} rounded />
        ))}
      
      </div>
      <div className="md-form mt-0">
      <input className="form-control" type="text" id="MainFeedInput" onChange={(() => {getSearch()})} placeholder="Search" aria-label="Search"/>
      </div>
      <ul className="list-group">
      {events.map(item => (
        <li className="list-group-item" key={item.id}>
        <div className="list-group-item" onClick={(() => {})}>
        <img className="MainFeedImage rounded mx-auto d-block" alt="Event" src={item.description.images[0].url ? item.description.images[0].url : "https://i.picsum.photos/id/100/50/50.jpg?blur=1"}></img>
          <h5>{item.name.fi}</h5>
          <div className="d-flex flex-row bd-highlight mb-3">
          <div className="d-flex flex-column bd-highlight mb-3">
          <div className="p-2 bd-highlight">{moment(new Date(parseInt(item.event_dates.starting_day)).toString()).subtract(10, 'days').calendar()+"-"+moment(new Date(parseInt(item.event_dates.ending_day)).toString()).subtract(10, 'days').calendar() }</div>
          <div className="p-2 bd-highlight">{item.location.address.street_address}</div>
          <div className="d-flex justify-content-around">
            {item.tags[0].name ? 
              <div className="card p-2 m-1 bd-highlight">{item.tags[0].name}</div>:
              <div></div>
          }
          {item.tags[0].name ? 
              <div className="card p-2 m-1 bd-highlight">{item.tags[1].name}</div>:
              <div></div>
          }
          {item.tags[0].name ? 
              <div className="card p-2 m-1 bd-highlight">{item.tags[2].name}</div>:
              <div></div>
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

const getTodayEvents = () => { 

  return client.query({
    query: gql`
    {
      events(today: true) {
        id
        description{
          images {
            url
          }
        }
      }
    }
    `
  })
  .then(result => {
    return(result.data.events)
  });
}


const getEvents = (string) => { 
  return client.query({
    query: gql`
    {
      events(${string ? "limit:2, nameIncludes:\""+string+"\"" : "limit: 2"}) {
        id
        name {
          fi
        }
        location {
          lat
          lon
          address {
            street_address
          }
        }
        description{
          images {
            url
          }
        }
        tags {
          name
        }
        event_dates {
          starting_day
          ending_day
        }
      }
    }
    `
  })
  .then(result => {
    return(result.data.events)
  });
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

