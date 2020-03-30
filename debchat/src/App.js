import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import { useAuth0 } from "./react-auth0-spa";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar.js";
import DebatesList from "./components/DebatesList.js";
import UpdateDebate from "./components/UpdateDebate.js";
import CreateDebate from "./components/CreateDebate.js";
import CreateUser from "./components/CreateUser.js";
import Rules from "./components/Rules.js";
import Debate from "./components/Debate.js";
import Home from "./components/Home.js";
import History from "./components/History.js";
import ViewOldDebate from './components/ViewOldDebate.js';
import Profile from './components/Profile.js';
import history from './utils/history';
import PrivateRoute from './components/PrivateRoute';


function App() {
  const { loading, isAuthenticated } = useAuth0();

  return (
    <Router history={history}>
      <div className = "container">
          <NavBar />
          <br />
          <Route path = "/" component = {Home} />
          <Route path = "/debates/history/:id" component = {ViewOldDebate} />
          <Route path = "/debates" component = {DebatesList} />
          <Route path = "/debates/update/:id" component = {UpdateDebate} />
          <Route path = "/debates/add" component = {CreateDebate} />
          <Route path = "/users/add" component = {CreateUser} />
          <Route path = "/rules" component = {Rules} />
          <Route path = "/debates/display/:id" component = {Debate} />
          <Route path = "/debates/history" component = {History} />
          <Route path = "/profile" component={Profile} />
      </div>
    </Router>
  );
  // return (
  //   <Router history={history}>
  //     <div className = "container">
  //         <NavBar />
  //         <br />
  //         <Route path = "/" component = {Home} />
  //         <PrivateRoute path = "/debates/history/:id" component = {ViewOldDebate} />
  //         <PrivateRoute path = "/debates" component = {DebatesList} />
  //         <PrivateRoute path = "/debates/update/:id" component = {UpdateDebate} />
  //         <PrivateRoute path = "/debates/add" component = {CreateDebate} />
  //         <PrivateRoute path = "/users/add" component = {CreateUser} />
  //         <Route path = "/rules" component = {Rules} />
  //         <PrivateRoute path = "/debates/display/:id" component = {Debate} />
  //         <PrivateRoute path = "/debates/history" component = {History} />
  //         <PrivateRoute path = "/profile" component={Profile} />
  //     </div>
  //   </Router>
  // );
}

export default App;
