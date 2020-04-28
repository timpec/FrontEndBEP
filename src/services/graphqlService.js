import { ApolloClient, HttpLink, InMemoryCache, useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: 'http://localhost:3001/Graphql',
    })
  });

  export const getYourEvents = (id) => {
    return client.query({
      query: gql`
      {
        user(id: "${id}") {
          id
    reservations {
      id
      created_timestamp
      name {fi}
      description {
        intro
      }
      location {
        lat
        lon
            }
          }
        }
      }

      `
    })
    .then(result => {
      return(result.data.user)
    });
  }

  export const getFriendsEvents = (id) => {
    return client.query({
      query: gql`
      {
        user(id: "${id}") {
          id
          friends {
            id
            username
            reservations {
              id
              description {
                intro
              }
              location {
                lat
                lon
              }
            }
          }
        }
      }
      `
    })
    .then(result => {
      return(result.data.user)
    });
  }

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
          reserved {
            username
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

  export const getUser = (string) => { 
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

    let userToken = "5ea5859e28b80937a44c760f";
    return client.query({
      query: gql`
      {
        event(name: \"${id}\") {
          id
          name {
            fi
          }
          info_url
          reservedById(id:"${userToken}") {
            name {
              fi
            }
          }
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

  export const addReservation = (userId, reservationId, dateTs) => {
    let query = gql`
      mutation UserAddReservation($id: ID!, $reservation: String! , $date:String!) {
        UserAddReservation(id: $id, reservation: $reservation , date: $date) {
          username
        }
      }
      `
    
    return client.mutate({
      mutation: query,
      variables: {
        id: userId,
        reservation: reservationId,
        date: dateTs
      }

    })
    .then(result => {
      return(result)
    }).catch((error) => {
      return error
    })
  }