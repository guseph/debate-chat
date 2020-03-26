import React from 'react';

const Home = function(){
    return(
            <div>
                <div class="jumbotron">
                    <h1>Welcome to DebChat!</h1>
                    <p class="lead">A platform to make remote debating simple and easy</p>
                    <hr class="my-4"></hr>
                    <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                    <p class="lead">
                        <a class="btn btn-primary btn-lg" href="/debates" role="button">View Debates</a>
                    </p>
                </div>

            </div>
    );
}

export default Home;
