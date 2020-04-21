import React, { useEffect } from "react";
import { ApolloClient, HttpLink, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:3001/Graphql',
  })
});

export default function MainFeed(props) {
  const [events, updateEvents] = React.useState([]);
useEffect(() => {
  const getData = async () => { 
    let data = await getEvent();
    
    updateEvents(data);
  }
  getData();
}, []);

  return <p>{props.id}'s Page</p>;
}

const getEvent = () => { 

  return client.query({
    query: gql`
    {
      events(limit: 2) {
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

