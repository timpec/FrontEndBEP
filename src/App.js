import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/signIn/Login";
import Register from "./pages/signIn/Register";
import MainFeed from "./pages/MainFeed/MainFeed";
import DetailPage from "./pages/DetailPage/DetailPage";
import BackDrop from "./components/BackDrop/Backdrop";
import Navbar from "react-bootstrap/Navbar";
import {useRoutes, A, navigate} from 'hookrouter';
import Nav from "react-bootstrap/Nav";

  export default function App() {  

    const changeRoute = (route,data) => {
      navigate('/'+route + data ? '/'+data : "");
    }

    const handleClick= () => {
      console.log("here")
    }

    const routes = {
      "/": () => <Login />,
      "/register": () => <Register />,
      "/MainFeed": () => <MainFeed props={handleClick}/>,
      "/DetailPage": ({id}) => <DetailPage id={id}/>,
      "/Login": () => <Login />
  
    };
    const routeResult = useRoutes(routes);

    return <div style={{ height: "100%" }}>
          <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Helmet</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/MainFeed">Main Feed</Nav.Link>
                <Nav.Link href="/Map">Map</Nav.Link>
                <Nav.Link href="/Friends">Friends</Nav.Link>
                <Nav.Link href="/profile">Profiili</Nav.Link>
                <Nav.Link href="/Login">Log out</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          {routeResult}
          </div>
}
