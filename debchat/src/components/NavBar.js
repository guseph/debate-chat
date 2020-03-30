import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { useAuth0 } from "../react-auth0-spa";

// export default class NavBar extends Component{
//     render(){
//         const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
//         return(
//             <nav className = "navbar navbar-dark bg-dark navbar-expand-lg">
//                 <Link to = "/" className = "navbar-brand"> 
//                     {/* <img src="../../debatelogo.png" width="30" height="30" alt=""/> */}
//                     DebateChat
//                 </Link>
//                 <div className = "collapse navbar-collapse">
//                     <ul className = "navbar-nav mr-auto">
//                         <li className = "navbar-item">
//                             <Link to = "/debates" className = "nav-link">Debates</Link>
//                         </li>
//                         <li>
//                             <Link to ="/rules" className = "nav-link">Rules</Link>
//                         </li>
//                         <li>
//                             <Link to = "/debates/add" className = "nav-link"> Create New Debate</Link>
//                         </li>
//                         <li>
//                             <Link to ="/users/add" className = "nav-link">Create User</Link>
//                         </li>
//                         <li>
//                             <Link to ="/debates/history" className = "nav-link">Debate History</Link>
//                         </li>
//                         <li>
//                             <div>
//                                 {!isAuthenticated && (
//                                     <button onClick={() => loginWithRedirect({})}>Log in</button>
//                                 )}

//                                 {isAuthenticated && <button onClick={() => logout()}>Log out</button>}
//                             </div>
//                         </li>
//                     </ul>
//                 </div>
//             </nav>
//         );
//     }
// }

// This new NavBar is a function that returns a component, instead of a class component
// This allows us to use Auth0's React hooks
// Alternative: use a wrapper to wrap the hook around the class, then modify the class. See ChatBox for how that's done
const NavBar = () => {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
    if (!isAuthenticated){
        return(
            <nav className = "navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to = "/" className = "navbar-brand"> 
                    {/* <img src="../../debatelogo.png" width="30" height="30" alt=""/> */}
                    DebateChat
                </Link>
                <div className = "collapse navbar-collapse">
                    <ul className = "navbar-nav mr-auto">
                        <li>
                            <Link to ="/rules" className = "nav-link">Rules</Link>
                        </li>
                        <li>
                            <div>
                                {!isAuthenticated && (
                                    <button onClick={() => loginWithRedirect({})}>Log in</button>
                                )}

                                {isAuthenticated && <button onClick={() => logout()}>Log out</button>}
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
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
                    <li>
                        <Link to ="/profile" className = "nav-link">User Profile</Link>
                    </li>
                    <li>
                        <div>
                            {!isAuthenticated && (
                                <button onClick={() => loginWithRedirect({})}>Log in</button>
                            )}

                            {isAuthenticated && <button onClick={() => logout()}>Log out</button>}
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    );
};
export default NavBar;
