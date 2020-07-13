import React from 'react';
import { useAuth0 } from "../react-auth0-spa";


const Home = function () {
    const { isAuthenticated, loginWithRedirect } = useAuth0();

    // picks what elements to be rendered based on if user is logged in 
    const getContent = () => {
        if (isAuthenticated) {
            return (
                <a className="btn btn-info btn-lg" href="/debates" role="button">View Debates</a>
            )
        }
        return (
            <div>
                <p>Sign up or log in to easily create, schedule, and carry out debates on whatever topics you're passionate about.</p>
                <button className="btn btn-info" onClick={loginWithRedirect} >Sign Up to Get Started!</button>
            </div>
        );
    }


    return (
        <div>
            <div className="row">
                {/* <-- Jumbotron !-->  */}
                <div className="col-6">
                    <div className="jumbotron">
                        <h1>Welcome to DebateChat!</h1>
                        <p className="lead">A platform to make remote debating simple and easy</p>
                        <hr className="my-4"></hr>
                        {getContent()}

                    </div>
                </div>

                {/* <-- Carosel !-->  */}
                <div className="col-6">
                    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                        </ol>
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src="/img/photo1.jpeg" class="d-block w-100" alt="..." />
                            </div>
                            <div className="carousel-item">
                                <img src="/img/photo2.png" class="d-block w-100" alt="..." />
                            </div>
                            <div className="carousel-item">
                                <img src="/img/debateclipart.jpg" class="d-block w-100" alt="..." />
                            </div>
                        </div>
                        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
