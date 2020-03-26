import React, {Component} from 'react';
import axios from 'axios';
import './Debate.css';

export default class Debate extends Component{
    constructor (props){
        super(props);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            debateName: "",
            proponent: "",
            opponent: "",
            conversation: [],
            date: new Date()
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/debates/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    debateName: response.data.topic,
                    proponent: response.data.proponent,
                    opponent: response.data.opponent,
                    date: new Date(response.data.date)
                })
            })
            .catch(function (error){
                console.log(error);
            })
    }

    // implement this later
    // will save chat messages into the debate item that will be saved to database
    onSubmit(){

    };

    render(){
        return(
            <div className = "container">
                <div class = "container" id = "header">
                    <div className = "row justify-content-center">
                        <h1>{this.state.debateName}</h1>
                    </div>
                    <div className = "row justify-content-center">
                        <h2><i>{this.state.proponent} v. {this.state.opponent}</i></h2>
                    </div>
                    <div className = "row justify-content-center">
                        <emphasis>{this.state.date.toString().substring(0,10)}</emphasis>
                    </div>
                </div>
                <hr></hr>
              

                <div className = "row" id = "content">
                    <div className = "col-6">
                        <h3>TIMELINE</h3>
                        <p>Timeline will go here</p>
                    </div>
                    <div className = "container col-6">
                        <h1>Chatbox will go here</h1>
                    </div>
                
                </div>

                <hr></hr>
               <div className = "row container justify-content-center">
                    <button onClick = {this.onSubmit} className = "btn btn-danger">End Debate</button>
               </div>

            </div>

        );
    }
       
}