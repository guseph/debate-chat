import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { faTrash, } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Debate = props => (
    <tr>
        {/*
        CHANGE LATER! <td><Link to = {"debates/display/" + props.debate._id}>{props.debate.topic}</Link></td>*/}
        <td>{props.debate.topic}</td>
        <td>{props.debate.proponent}</td>
        <td>{props.debate.opponent}</td>
        <td>{props.debate.date.substring(0, 10)}</td>
        <td>
            <Link class="btn btn-info " to={"/debates/history/" + props.debate._id}>View</Link>
            <button class="btn btn-danger" href="/" onClick={() => { props.deleteDebate(props.debate._id) }}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></button>

        </td>

    </tr>
)

export default class History extends Component {
    constructor(props) {
        super(props);

        this.state = { debates: [] }
        this.deleteDebate = this.deleteDebate.bind(this);

    }

    // get and store closed debates in state
    componentDidMount() {
        axios.get('http://localhost:5000/debates/')
            .then(response => {
                this.setState({
                    debates: response.data.filter(el => el.closed === true)
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteDebate(id) {
        axios.delete('http://localhost:5000/debates/' + id)
            .then(res => console.log(res.data));

        // get rid of the element from the table by resetting the state
        // puts all elements back intot the state except the one we deleted
        this.setState({
            debates: this.state.debates.filter(el => el._id !== id && el.closed === true)
        })

        window.location = "/debates/history/";
    }


    debateList() {
        if (this.state.debates.length === 0) {
            return (<tr><td>There are no closed debates</td></tr>);
        }
        else {
            return this.state.debates.map(currentdebate => {
                return <Debate debate={currentdebate} deleteDebate={this.deleteDebate} key={currentdebate._id} />
            });
        }

    }

    render() {
        return (
            <div>
                <h1> Logged Debates </h1>
                <table className="table">
                    <thead className="thead-light">
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