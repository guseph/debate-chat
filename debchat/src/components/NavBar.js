import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class NavBar extends Component{
    render(){
        return(
            <nav className = "navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to = "/" className = "navbar-brand"> 
                    {/* <img src="../../debatelogo.png" width="30" height="30" alt=""/> */}
                    DebateChat
                </Link>
                <div className = "collapse navbar-collapse">
                    <ul className = "navbar-nav mr-auto">
                        <li className = "navbar-item">
                            <Link to = "/debates" className = "nav-link">Debates</Link>
                        </li>
                        <li>
                            <Link to ="/rules" className = "nav-link">Rules</Link>
                        </li>
                        <li>
                            <Link to = "/debates/add" className = "nav-link"> Create New Debate</Link>
                        </li>
                        <li>
                            <Link to ="/users/add" className = "nav-link">Create User</Link>
                        </li>
                        <li>
                            <Link to ="/debates/history" className = "nav-link">Debate History</Link>
                        </li>
                 
                    </ul>
                </div>
            </nav>
        );
    }
}