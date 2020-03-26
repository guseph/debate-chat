import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const Debate = props => (
    <tr>
        <td><Link to = {"debates/display/" + props.debate._id}>{props.debate.topic}</Link></td>
        <td>{props.debate.proponent}</td>
        <td>{props.debate.opponent}</td>
        <td>{props.debate.date.substring(0,10)}</td>
        <td>
            <Link to = {"debates/update/" + props.debate._id}>edit</Link> |  <a href = "/" onClick = {() => {props.deleteDebate(props.debate._id)}}>delete</a>
        </td>
    </tr>
    
)

export default class DebatesList extends Component{
    constructor (props){
        super(props);

        this.deleteDebate = this.deleteDebate.bind(this);
        
        this.state = {debates: []}
    }

    componentDidMount(){
        axios.get('http://localhost:5000/debates/')
            .then(response =>{
                this.setState({
                    debates: response.data
                })
            })
            .catch((error) =>{
                console.log(error);
            })

        this.setState({
            debates: this.state.debates.filter(el => el.closed !== true)
        })
    }

    deleteDebate(id){
        axios.delete('http://localhost:5000/debates/'+id)
            .then(res => console.log(res.data));

        // get rid of the element from the table by resetting the state
        // puts all elements back intot the state except the one we deleted
        this.setState({
            debates: this.state.debates.filter(el => el._id !== id)
        })

        window.location = "/debates";
    }

    debateList(){
        return this.state.debates.map(currentdebate => {
            return <Debate debate = {currentdebate} deleteDebate = {this.deleteDebate} key = {currentdebate._id} />
        })
    }

    render(){
        return(
            <div>
                <h1> Open Debates </h1>
                <table className = "table">
                    <thead className = "thead-light">
                        <tr>
                            <th>Topic</th>
                            <th>Proponent</th>
                            <th>Opponent</th>
                            <th>Date</th>
                            <th>Options</th>
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