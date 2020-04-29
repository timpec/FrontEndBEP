import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/signIn/Login";
import Register from "./pages/signIn/Register";
import MainFeed from "./pages/MainFeed/MainFeed";
import Map from "./pages/Map/Map";
import Friends from "./pages/Friends/Friends";
import Profile from "./pages/Profile/Profile";

import DetailPage from "./pages/DetailPage/DetailPage";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

export default function App() {
  return (
      <Router>
        <div style={{ height: "100%" }}>
          <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Helmet</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/MainFeed">Aloitus</Nav.Link>
                <Nav.Link href="/Map">Kartta</Nav.Link>
                <Nav.Link href="/Friends">Kaverit</Nav.Link>
                <Nav.Link href="/Profile">Profiili</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

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
            <Route path="/MainFeed" component={MainFeed}>
              <MainFeed/>
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
          </main>
        </div>
      </Router>
    )
}