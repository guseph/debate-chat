import React from 'react';
import { useAuth0 } from "../react-auth0-spa";


const Home = function(){
    const {isAuthenticated} = useAuth0();

    return(
            <div>
                <div className="jumbotron">
                    <h1>Welcome to DebChat!</h1>
                    <p className="lead">A platform to make remote debating simple and easy</p>
                    <hr className="my-4"></hr>
                    <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                    {isAuthenticated? 
                        <a className="btn btn-primary btn-lg" href="/debates" role="button">View Debates</a> 
                        : <p className = "lead" >Log in to view debates!</p>

                    }
                </div>

            </div>
    );
}

export default Home;
