import React from 'react';

const Home = function(){
    return(
            <div>
                <div className="jumbotron">
                    <h1>Welcome to DebChat!</h1>
                    <p className="lead">A platform to make remote debating simple and easy</p>
                    <hr className="my-4"></hr>
                    <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                    <p className="lead">
                        <a className="btn btn-primary btn-lg" href="/debates" role="button">View Debates</a>
                    </p>
                </div>

            </div>
    );
}

export default Home;
