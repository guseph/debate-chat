import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar.js";
import DebatesList from "./components/DebatesList.js";
import UpdateDebate from "./components/UpdateDebate.js";
import CreateDebate from "./components/CreateDebate.js";
import CreateUser from "./components/CreateUser.js";
import Rules from "./components/Rules.js";
import Debate from "./components/Debate.js";


function App() {
  return (
    <Router>
      <div className = "container">
          <NavBar />
          <br />
          <Route path = "/" exact component = {DebatesList} />
          <Route path = "/debates/update/:id" component = {UpdateDebate} />
          <Route path = "/debates/add" component = {CreateDebate} />
          <Route path = "/users/add" component = {CreateUser} />
          <Route path = "/rules" component = {Rules} />
          <Route path = "/debates/:id" component = {Debate} />

      </div>
      
    </Router>
  );
}

export default App;
