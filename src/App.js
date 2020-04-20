import React from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Toolbar from "./components/Toolbar/Toolbar";
import Login from "./pages/signIn/Login";
import Register from "./pages/signIn/Register";
import MainFeed from "./pages/MainFeed/MainFeed";
import SideDrawer from "./components/SideDrawer/SideDrawer";
import { BrowserRouter as Router, Route } from "react-router-dom";
import BackDrop from "./components/BackDrop/Backdrop";


class App extends React.Component {
  state = {
    sideDrawer: false,
    noNav: true,
  };

  drawerToggleClickHandler = () => {
    this.setState(prevState => {
      return { sideDrawer: !prevState.sideDrawer };
    });
  };

  render() {
    let backDrop;

    if (this.state.sideDrawer) {
      backDrop = (
        <BackDrop drawerToggleClickHandler={this.drawerToggleClickHandler} />
      );
    }
    return (
      <Router>
        <div style={{ height: "100%" }}>
          <Toolbar
            show={this.state.noNav}
            showX={this.state.sideDrawer}
            drawClickHandler={this.drawerToggleClickHandler}
          />
          <SideDrawer
            closeDraw={this.drawerToggleClickHandler}
            show={this.state.sideDrawer}
          />
          ;
          {backDrop}
          <main style={{ marginTop: "64px" }}>
            <Route exact path="/">
              <Login />
            </Route>
            <Route path="/login" component={Login}>
              <Login />
            </Route>
            <Route path="/register">
              <Register />           
            </Route>
            <Route path="/MainFeed">
              <MainFeed />           
            </Route>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
