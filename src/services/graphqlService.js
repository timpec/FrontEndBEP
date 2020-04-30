import { ApolloClient, HttpLink, InMemoryCache, gql, from } from '@apollo/client';
import { setContext } from 'apollo-link-context';

const httpLink = new HttpLink({
  uri: 'http://localhost:3001/Graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

  export const getExampleRoutes = () => { 

    return client.query({
      query: gql`
      {
        route(
          fromLat:60.220127,
          fromLon:24.795761,
          toLat:60.220127,
          toLon:24.785761,
          routeNumber: 2) {
              plan {
                
                itineraries {
                  duration
                  legs {
                    mode
                    distance
                  }
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

  export const getTodayEvents = () => { 

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

  export const getEvents = (string) => { 
    return client.query({
      query: gql`
      {
        events(${string ? "limit:2, nameIncludes:\""+string+"\"" : "limit: 10"}) {
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
  
  export const getDetailedEvent = (id, time) => { 
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
            route(fromLat:60.220127, fromLon:24.795761) {
              plan {
                itineraries {
                  startTime
                  endTime
                  duration
                  legs {
                    mode
                    distance
                    startTime
                  }
                }
              }
            }
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
              weather{
                icon
              }
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
  