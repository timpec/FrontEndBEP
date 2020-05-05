import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import gql from 'graphql-tag';
import { setContext } from 'apollo-link-context';

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URL,
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

  export const getYourEvents = (id) => {
    return client.query({
      query: gql`
      {
      user(id: "${id}") {
      id
      reservations {
        id
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
        events(today: true, limit:3) {
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
        events {
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
    const userToken = localStorage.getItem('userid');
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

  export const removeReservation = (userId, reservationId) => {
    let query = gql`
      mutation UserRemoveReservation($id: ID!, $reservation: ID!) {
        UserRemoveReservation(id: $id, reservation: $reservation) {
          username
        }
      }
      `
    return client.mutate({
      mutation: query,
      variables: {
        id: userId,
        reservation: reservationId,
      }
    })
    .then(result => {
      return(result)
    }).catch((error) => {
      return error
    })
  }

  export const getDataPackage = async (id) => {
    //getEvents, getFriendsEvents, getYourEvents,
    let events = await getEvents();
    let friendsEvents = await getFriendsEvents(id);
    let yourEvents = await getYourEvents(id);

    let dataPackage = {events: events, friendsEvents: friendsEvents, YourEvents: yourEvents}
    return dataPackage
  }

  export const postLogin = (username, password) => { 
    return client.query({
      query: gql`
      {
        userLogin 
        (username:"${username}" password: "${password}") {
          id
          token
        }
      }
      `
    })
    .then(result => {
      const usr = result.data.userLogin
      console.log(usr)
      localStorage.setItem('userid', usr.id)
      localStorage.setItem('token', usr.token)
      return true
    })
    .catch(err => {
      console.log(err)
      return false
    });
  }

  export const postRegister = (username, password, address, email) => { 
    return client.mutate({
      mutation: gql`
      mutation {
        UserRegister (
          username: "${username}"
          password: "${password}"
          email: "${email}"
          address: "${address}"
        ) {id token}
      }
      `
    })
    .then(result => {
      const usr = result.data.UserRegister
      console.log(usr)
      localStorage.setItem('userid', usr.id)
      localStorage.setItem('token', usr.token)
      return true
    })
    .catch(err => {
      console.log(err)
      return false
    });
  }

  export const getUser1 = (id) => { 
    return client.query({
      query: gql`
      {
        user (id: "${id}") {
          id 
          username
          email
          address
          intrests
          friends {
            id
            email
            intrests
            reservations {
              id
              name {fi en}
              event_dates {
                starting_day
                ending_day
              }
            }
          }
          reservations {
            id
            name {fi en}
            source_type {id name}
            info_url
            location {
              lat
              lon
              address {
                locality
                street_address
                postal_code
              }
            }
            description {
              intro
              body
              images {url}
            }
            tags {id name}
            event_dates {
              starting_day
              ending_day
              additional_description
              weather {temp}
            }
          }
        }
      }
      `
    })
    .then(result => {
      return(result.data.user)
    })
    .catch(err => {
      console.log(err)
      return false
    });
  }
  
