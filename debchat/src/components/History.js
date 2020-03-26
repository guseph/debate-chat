import React, {Component} from 'react';
import axios from 'axios';
//import {Link} from 'react-router-dom';

const Debate = props => (
    <tr>
        {/*
        CHANGE LATER! <td><Link to = {"debates/display/" + props.debate._id}>{props.debate.topic}</Link></td>*/}
        <td>{props.debate.topic}</td>
        <td>{props.debate.proponent}</td>
        <td>{props.debate.opponent}</td>
        <td>{props.debate.date.substring(0,10)}</td> 
        <td><button>View</button></td>
    </tr>
)

export default class History extends Component{
    constructor (props){
        super(props);
        
        this.state = {debates: []}
    }

    componentDidMount(){
    {/* Possibly change route to get only closed debates! */}
        axios.get('http://localhost:5000/debates/')
            .then(response =>{
                this.setState({
                    debates: response.data
                })
            })
            .catch((error) =>{
                console.log(error);
            })
    }


    debateList(){
        return this.state.debates.map(currentdebate => {
            return <Debate debate = {currentdebate} deleteDebate = {this.deleteDebate} key = {currentdebate._id} />
        })
    }

    render(){
        return(
            <div>
                <h1> Logged Debates </h1>
                <table className = "table">
                    <thead className = "thead-light">
                        <tr>
                            <th>Topic</th>
                            <th>Proponent</th>
                            <th>Opponent</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.debateList()}
                    </tbody>
                </table>
            </div>
        );
    }
}