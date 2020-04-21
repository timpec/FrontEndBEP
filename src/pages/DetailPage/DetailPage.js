import React, { useEffect } from "react";
import { ApolloClient, HttpLink, InMemoryCache, gql } from '@apollo/client';
import { useParams } from "react-router-dom";
import Card from 'react-bootstrap/Card';
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
    updateEvent(data);
  }
  getData();
}, []);

return ( 
<div>
{event.map(item => (
        <li className="list-group-item" key={item.id}>
        <div className="list-group-item">
        <img className="MainFeedImage rounded mx-auto d-block" alt="Event" src={item.description.images[0].url ? item.description.images[0].url : "https://i.picsum.photos/id/100/50/50.jpg?blur=1"}></img>
          <h5>{item.name.fi}</h5>
          <div className="d-flex flex-row bd-highlight mb-3">
          <div className="d-flex flex-column bd-highlight mb-3">
          <div className="p-2 bd-highlight">{moment(new Date(parseInt(item.event_dates.starting_day)).toString()).subtract(10, 'days').calendar()+"-"+moment(new Date(parseInt(item.event_dates.ending_day)).toString()).subtract(10, 'days').calendar() }</div>
          <div className="p-2 bd-highlight">{item.location.address.street_address}</div>
          <div className="p-2 bd-highlight">more info</div>
          <div className="p-2 bd-highlight">more info</div>
          <div className="p-2 bd-highlight">more info</div>

          </div>
          </div>
          </div>
          </li>
      ))}
  </div>
);
}

const getEvent = (id) => { 

  return client.query({
    query: gql`
    {
      event(name: \"${id}\") {
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
    return(result.data.event)
  });
}

