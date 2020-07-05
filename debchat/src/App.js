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
//import PrivateRoute from './components/PrivateRoute';


function App() {
  //const { loading, isAuthenticated } = useAuth0();

  return (
    <Router history={history}>
      
      <div className = "container">
          <NavBar />
          <br />
          <Route path = "/" exact component = {Home} />
          <Route path = "/debates/history/:id" exact component = {ViewOldDebate} />
          <Route path = "/debates" exact component = {DebatesList} />
          <Route path = "/debates/update/:id" exact component = {UpdateDebate} />
          <Route path = "/debates/add" exact component = {CreateDebate} />
          <Route path = "/users/add" exact component = {CreateUser} />
          <Route path = "/rules" exact component = {Rules} />
          <Route path = "/debates/display/:id" exact component = {Debate} />
          <Route path = "/debates/history" exact component = {History} />
          <Route path = "/profile" exact component={Profile} />
      </div>
      <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
      <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
    </Router>
  );
  
}

export default App;
