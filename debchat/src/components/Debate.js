import React, { Component } from 'react';
import axios from 'axios';
import './Debate.css';
import ChatBox from "./ChatBox.js";
import Timer from "./Timer.js";

export default class Debate extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            debateName: "",
            proponent: "",
            opponent: "",
            date: new Date(),
            debateId: this.props.match.params.id
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/debates/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    debateName: response.data.topic,
                    proponent: response.data.proponent,
                    opponent: response.data.opponent,
                    date: new Date(response.data.date)
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    // implement this later
    // will save chat messages into the debate item that will be saved to database
    onSubmit(e) {
        e.preventDefault();

        const debate = {
            // topic: this.state.debateName,
            // proponent: this.state.proponent,
            // opponent: this.state.opponent,
            // date: this.state.date,
            // conversation: this.state.conversation,
            closed: true

        }

        // console.log(debate)

        axios.post('http://localhost:5000/debates/update/closed/' + this.props.match.params.id, debate)
            .then(res => console.log(res.data));

        window.location = "/debates/history";

    };

    render() {
        return (
            <div className="container">
                <div className="container" id="header">
                    <div className="row justify-content-center">
                        <h1>{this.state.debateName}</h1>
                    </div>
                    <div className="row justify-content-center">
                        <h2><i>{this.state.proponent} v. {this.state.opponent}</i></h2>
                    </div>
                    <div className="row justify-content-center">
                        <i>{this.state.date.toString().substring(0, 10)}</i>
                    </div>
                </div>
                <hr></hr>


                <div className="row" id="content">
                    <div className="col-4">
                        <Timer startTime="200" />
                        <h3>TIMELINE</h3>
                        <p>Timeline will go here</p>
                    </div>
                    <div className="container col-8">
                        <ChatBox debateID={this.state.debateId} />
                    </div>

                </div>

                <hr></hr>
                <div className="row container justify-content-center">
                    <div className="col 4">
                        <button onClick={this.onSubmit} className="btn btn-danger">End Debate</button>
                    </div>

                    <div className="col-4">

                    </div>
                </div>

            </div>

        );
    }

}