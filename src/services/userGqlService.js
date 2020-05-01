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

  export const getUser = (id) => { 
    return client.query({
      query: gql`
      {
        user (id: "${id}") {
          id 
          username
          email
          address {
            street_address
            locality
            coordinates {
              lat
              lon
            }
          }
          intrests
          friends {
            id
            username
            email
            address {
              locality
            }
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

  export const removeFriend = (id, friends) => { 
    return client.mutate({
      mutation: gql`
      mutation {
        UserRemoveFriend (
          id: "${id}" friends: "${friends}"
        ) {
          id
          username
          email
          address {
            street_address
            locality
            coordinates {
              lat
              lon
            }
          }
          intrests
          friends {
            id
            username
            email
            intrests
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
        }
        }
      }
      `
    })
    .then(result => {
      const usr = result.data.UserRemoveFriend
      console.log(usr)
      return true
    })
    .catch(err => {
      console.log(err)
      return false
    });
  }

  export const modifyUser = (id, email, address, password) => { 
    return client.mutate({
      mutation: gql`
      mutation {
        UserModify (
          id: "${id}"
          email: "${email}"
          password: "${password}"
          address: "${address}"
        ) {
          id
          username
          email
          address {
              street_address
          }
        }
      }
      `
    })
    .then(result => {
      const usr = result.data.UserModify
      console.log(usr)
      return true
    })
    .catch(err => {
      console.log(err)
      return false
    });
  }

  export const addIntrests = (id, intrests) => { 
    return client.mutate({
      mutation: gql`
      mutation {
        UserAddIntrest (
          id: "${id}"
          intrests: "${intrests}"
        ) {
          username
          email
          address {
            street_address
            locality
          }
          intrests
          friends {
            username
            email
            intrests
          }
          reservations {
            id
          }
        }
      }
      `
    })
    .then(result => {
      const usr = result.data.UserAddIntrest
      console.log(usr)
      return true
    })
    .catch(err => {
      console.log(err)
      return false
    });
  }

  export const removeIntrests = (id, intrests) => { 
    return client.mutate({
      mutation: gql`
      mutation {
        UserRemoveIntrest (
          id: "${id}"
          intrests: "${intrests}"
        ) {
          username
          email
          address {
            street_address
            locality
          }
          intrests
          friends {
            username
            email
            intrests
          }
          reservations {
            id
          }
        }
      }
      `
    })
    .then(result => {
      const usr = result.data.UserRemoveIntrest
      console.log(usr)
      return true
    })
    .catch(err => {
      console.log(err)
      return false
    });
  }

  export const removeUser = (id) => { 
    return client.mutate({
      mutation: gql`
      mutation {
        UserDelete (
          id: "${id}"
        ) {
          id
        }
      }
      `
    })
    .then(result => {
      const usr = result.data.UserDelete
      console.log(usr)
      return true
    })
    .catch(err => {
      console.log(err)
      return false
    });
  }