import { ApolloClient, HttpLink, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: 'http://localhost:3001/Graphql',
    })
  });

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
  
  export const getDetailedEvent = (id) => { 

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
            route(lat: 60.220127, lon:24.785761) {
              plan {
                itineraries {
                  startTime
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