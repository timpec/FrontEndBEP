import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/signIn/Login";
import Register from "./pages/signIn/Register";
import MainFeed from "./pages/MainFeed/MainFeed";
import DetailPage from "./pages/DetailPage/DetailPage";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

export default function App() {

  const handleClick = () => {
    console.log("here")
  }
    return (
      <Router>
        <div style={{ height: "100%" }}>
          <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Helmet</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/MainFeed">Aloitus</Nav.Link>
                <Nav.Link href="/map">Kartta</Nav.Link>
                <Nav.Link href="/friends">Kaverit</Nav.Link>
                <Nav.Link href="/profile">Profiili</Nav.Link>
                <Nav.Link href="/login">Kirjaudu ulos</Nav.Link>
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
          </main>
        </div>
      </Router>
    )
}