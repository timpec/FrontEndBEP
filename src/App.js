import React from "react";
import "./App.css";
import "./assets/bootstrap.min.css";
import './index.css';
import Login from "./pages/signIn/Login";
import Register from "./pages/signIn/Register";
import MainFeed from "./pages/MainFeed/MainFeed";
import Map from "./pages/Map/Map";
import Friends from "./pages/Friends/Friends";
import Profile from "./pages/Profile/Profile";
import Reservations from "./pages/Reservations/reservations";
import { Redirect, BrowserRouter } from "react-router-dom";
import DetailPage from "./pages/DetailPage/DetailPage";
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";



export default function App() {

  const checkAuthentication = () => {
    const user = localStorage.getItem('userid');
    if(!user) {
      return false
    }
    return true
  }

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      checkAuthentication()
      ? <MainFeed/>
        : <Redirect to='/login' />
    )} />
  )

  const NavBar = () => {
    return (
      <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">Helmet</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/MainFeed">Aloitus</Nav.Link>
          <Nav.Link href="/Map">Kartta</Nav.Link>
          <Nav.Link href="/Friends">Kaverit</Nav.Link>
          <Nav.Link href="/Reservations">Varaukset</Nav.Link>
          <Nav.Link href="/Profile">Profiili</Nav.Link>
          <Nav.Link href="/login">Kirjaudu ulos</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    )
  }

  const Main = withRouter(({ location}) => {

    return(
  <Router>
        <div style={{ height: "100%" }}>
        {location.pathname !== "/login" && location.pathname !== "/register" ?  (<NavBar />):(<div></div>)}
          <main style={{ marginTop: "64px" }}>
            <Route exact path="/">
              <Login />
            </Route>
            <Route path="/login" component={Login}>
              <Login />
            </Route>
            <Route path="/register" component={Register}>
              <Register />
            </Route>
            <Route path="/detailPage/:id" component={DetailPage}>
              <DetailPage/>
            </Route>
            <Route path="/Map" component={Map}>
              <Map/>
            </Route>
            <Route path="/Friends" component={Friends}>
              <Friends/>
            </Route>
            <Route path="/Profile" component={Profile}>
              <Profile/>
            </Route>
            <Route path="/Reservations" component={Reservations}>
              <Reservations/>
              </Route>
              <PrivateRoute path='/MainFeed' component={MainFeed} /> 

            {/** KYTKE PÄÄLLE KUN ON AIKA
            <PrivateRoute path='/MainFeed' component={MainFeed} /> 
            <PrivateRoute path='/Map' component={Map} />
            <PrivateRoute path='/Friends' component={Friends} />
            <PrivateRoute path='/Profile' component={Profile} />
            <PrivateRoute path='/Reservations' component={Reservations} />
               */}
            </main>
        </div>
      </Router>
  )
  })

  return (
    <BrowserRouter>
      <Main />    
    </BrowserRouter>
    )
}
/** KYTKE PÄÄLLE KUN ON AIKA 
            <PrivateRoute path='/Map' component={MainFeed} />
            <PrivateRoute path='/Friends' component={MainFeed} />
            <PrivateRoute path='/Profile' component={MainFeed} />
            <PrivateRoute path='/Reservations' component={MainFeed} />
               */

               /*
 location.pathname !== "/login" || location.pathname !== "/register" ?  (
          <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">Helmet</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/MainFeed">Aloitus</Nav.Link>
              <Nav.Link href="/Map">Kartta</Nav.Link>
              <Nav.Link href="/Friends">Kaverit</Nav.Link>
              <Nav.Link href="/Reservations">Varaukset</Nav.Link>
              <Nav.Link href="/Profile">Profiili</Nav.Link>
              <Nav.Link href="/login">Kirjaudu ulos</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        ) : (
          <div></div>
        )

               */