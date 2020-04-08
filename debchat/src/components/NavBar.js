import React from 'react';
import {Link} from 'react-router-dom';
import { useAuth0 } from "../react-auth0-spa";

// This new NavBar is a function that returns a component, instead of a class component
// This allows us to use Auth0's React hooks
// Alternative: use a wrapper to wrap the hook around the class, then modify the class. See ChatBox for how that's done
const NavBar = () => {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

    var authLinks = [
        (<Link to ="/rules" key = "rules" className = "nav-link">Rules</Link>),
        (<Link to = "/debates" key = "debates" className = "nav-link">Debates</Link>),
        (<Link to = "/debates/add" key = "createDebate" className = "nav-link"> Create New Debate</Link>),
        //(<Link to ="/users/add" key = "createUser" className = "nav-link">Create User</Link>),
        (<Link to ="/debates/history" key = "debateHistory" className = "nav-link">Debate History</Link>)
    ];

    var noAuthLinks = [
        (<Link to ="/rules" key = "rules" className = "nav-link">Rules</Link>)
    ];

    var visibleLinks = [];
    isAuthenticated? visibleLinks = authLinks: visibleLinks = noAuthLinks;
    visibleLinks = visibleLinks.map((link) => 
        <li className = "navbar-item">{link}</li>
    );

    return(
        <nav className = "navbar navbar-dark bg-dark navbar-expand-lg">
            <Link to = "/" className = "navbar-brand"> 
                {/* <img src="../../debatelogo.png" width="30" height="30" alt=""/> */}
                DebateChat
            </Link>
            <div className = "collapse navbar-collapse">
                <ul className = "navbar-nav mr-auto">
                    {visibleLinks}
                </ul>

                <ul className = "navbar-nav navbar-right">
                    <li className = "navbar-item">
                        {isAuthenticated? <Link className = "nav-link" to = "#" key = "logOut" onClick = {() => logout()}>Log Out</Link>
                        : <Link className = "nav-link" to = "#" key = "logIn" onClick = {() => loginWithRedirect({})}>Sign Up / Log In</Link>}

                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;