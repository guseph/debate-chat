import React from 'react';
import {Link} from 'react-router-dom';
import { useAuth0 } from "../react-auth0-spa";

import {faCoffee, faPencilAlt, faBook, faComments, faScroll, faUser} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const NavBar = () => {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

    {/* Links that appear when user is logged in */}
    var authLinks = [
        (<Link to = "/debates" key = "debates" className = "nav-link navbar-item"> <FontAwesomeIcon icon = {faComments} />  Debates  </Link>),
        (<Link to = "/debates/add" key = "createDebate" className = "nav-link navbar-item"><FontAwesomeIcon icon = {faPencilAlt} />   Create New Debate  </Link>),
        (<Link to ="/debates/history" key = "debateHistory" className = "nav-link navbar-item"> <FontAwesomeIcon icon = {faBook} />  Debate History  </Link>),
    ];

    var noAuthLinks = [];

    var visibleLinks = [];
    isAuthenticated? visibleLinks = authLinks: visibleLinks = noAuthLinks;
    visibleLinks = visibleLinks.map((link) => link);

    return(
        <nav className = "navbar navbar-dark bg-dark navbar-expand-lg">
            <Link to = "/" className = "navbar-brand"> DebateChat </Link>
            <button class = "navbar-toggler" type = "button" data-toggle = "collapse" data-target = "#toggler" area-controls = "toggler" area-expanded="false" aria-label="Toggle navigation">
                <span class = "navbar-toggler-icon"></span>
            </button>
            <div className = "collapse navbar-collapse" id="toggler">

                {/* Left side of Navbar */}
                <div className = "navbar-nav mr-auto mt-2 mt-lg-0">
                    <Link to ="/rules" key = "rules" className = "nav-link nav-item"> <FontAwesomeIcon icon = {faScroll} />  Rules </Link>
                    {visibleLinks}
                </div>
                
                {/* Right side of Navbar */}
                <div className = "navbar-nav navbar-right">
                    {isAuthenticated && <Link to = "/profile" key = "profile" className = "nav-link nav-item"> <FontAwesomeIcon icon = {faUser} /> Profile  </Link>}
                    {/* Shows Login or Logout depending on if user is logged in */}
                    {isAuthenticated? <Link className = "nav-link navbar-item" to = "#" key = "logOut" onClick = {() => logout()}>Log Out</Link>
                    : <Link className = "nav-link navbar-item" to = "#" key = "logIn" onClick = {() => loginWithRedirect({})}>Sign Up / Log In</Link>}
                </div>
            
            </div>
        </nav>
    );
}

export default NavBar;