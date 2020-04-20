import React, { useState, useEffect } from "react";
import { ApolloClient, HttpLink, InMemoryCache, gql } from '@apollo/client';
import "./MainFeed.css";
import moment from "moment"

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:3001/Graphql',
  })
});

const getEvents = () => { 

  return client.query({
    query: gql`
    {
      event(limit: 3) {
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
        }
      }
    }
    `
  })
  .then(result => {
    return(result.data.event)
  });
}

export default function MainFeed() {
  const [events, updateEvents] = React.useState([]);

useEffect(() => {
  const getData = async () => { 
    let data = await getEvents();
    console.log(data[0])
    updateEvents(data);
  }
  getData();
}, []);

return (
      
    <div>
      <h1  class="align-self-center">Events</h1>
      <div class="md-form mt-0">
      <input class="form-control" type="text" placeholder="Search" aria-label="Search"/>
      </div>
      <ul class="list-group">
      {events.map(item => (
        <li class="list-group-item" key={item.id}>
        <div class="list-group-item">
        <img class="MainFeedImage rounded mx-auto d-block" alt="image" src={item.description.images[0].url ? item.description.images[0].url : "https://i.picsum.photos/id/100/50/50.jpg?blur=1"}></img>
          <h5>{item.name.fi}</h5>
          <div class="d-flex flex-row bd-highlight mb-3">
          <div class="d-flex flex-column bd-highlight mb-3">
          <div class="p-2 bd-highlight">{moment(new Date(parseInt(item.event_dates.starting_day)).toString()).subtract(10, 'days').calendar()}</div>
          <div class="p-2 bd-highlight">{item.location.address.street_address}</div>
          <div class="p-2 bd-highlight">Flex item 3</div>
          <div class="d-flex justify-content-around">
            {item.tags[0].name ? 
              <div class="card p-2 m-1 bd-highlight">{item.tags[0].name}</div>:
              <div></div>
          }
          {item.tags[0].name ? 
              <div class="card p-2 m-1 bd-highlight">{item.tags[1].name}</div>:
              <div></div>
          }
          {item.tags[0].name ? 
              <div class="card p-2 m-1 bd-highlight">{item.tags[2].name}</div>:
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
/*

<div class="d-flex flex-column bd-highlight mb-1">
          <p class="p-1 bd-highlight">Flex item 2</p>
          <p class="p-1 bd-highlight">Flex item 2</p>          
          </div>

//jos tarvii lisä kolumneja
          <div class="d-flex flex-column bd-highlight mb-3">
          <div class="p-2 bd-highlight">Flex item 1</div>
          <div class="p-2 bd-highlight">Flex item 2</div>
          <div class="p-2 bd-highlight">Flex item 3</div>
          </div>
      */

