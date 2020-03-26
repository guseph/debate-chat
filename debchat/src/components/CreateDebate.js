import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

export default class CreateDebate extends Component{
    constructor (props){
        super(props);

        this.onChangeTopic = this.onChangeTopic.bind(this);
        //this.onChangeUser = this.onChangeUser.bind(this);
        this.onChangeProponent = this.onChangeProponent.bind(this);
        this.onChangeOpponent = this.onChangeOpponent.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            // database model
            topic: '',
            proponent: '',
            opponent: '',
            date: new Date(), 

            // other properties
         //    users: [],
            users: [],
            username: ""
        }
    }

    // alter this later
    componentDidMount(){
        axios.get('http://localhost:5000/users/')
            .then(response =>{
                if(response.data.length > 0){
                    this.setState({
                        users: response.data.map(user => user.username),
                        username: response.data[0].username
                    })
                }
            })
    }

    onChangeTopic(e){
        this.setState(
            {
                topic: e.target.value
            }
        );
    }

    onChangeProponent(e){
        this.setState(
            {
                proponent: e.target.value
            }
        );
    }


    onChangeOpponent(e){
        this.setState(
            {
                opponent : e.target.value
            }
        );
    }

    onChangeDate(date){
        this.setState(
            {
                date: date
            }
        );
    }

    onSubmit(e){
        e.preventDefault();
        
        const debate = {
            topic: this.state.topic,
            proponent: this.state.proponent,
            opponent: this.state.opponent,
            date: this.state.date,
            conversation: []

        }

        // will submit to database later
        console.log(debate)

        axios.post('http://localhost:5000/debates/add', debate)
            .then(res => console.log(res.data));

        window.location = "/";
    }

    render(){
        return(
            <div>
                <h3>Create New Debate</h3>
                <form onSubmit = {this.onSubmit}>
                    <div className = "form-group">
                        <label>Topic: </label>
                        <input type = "text"
                                className = "form-control"
                                value = {this.state.topic}
                                onChange = {this.onChangeTopic}>
                        </input>
                    </div>

                    <div className = "form-group">
                        <label>Proponent:</label>
                        <select 
                                required
                                className = "form-control"
                                value = {this.state.proponent}
                                onChange = {this.onChangeProponent}>
                            {/* map returns something for each item in the array*/}

                            {
                                this.state.users.map(function(user){
                                    return <option
                                            key = {user}
                                            value = {user}>
                                                {user}
                                            </option>
                                })
                            }
                        </select>
                    </div>
                   
                    <div className = "form-group">
                        <label>Opponent:</label>
                        <select 
                            required
                            className = "form-control"
                            value = {this.state.opponent}
                            onChange = {this.onChangeOpponent}>
    x                    {/* map returns something for each item in the array*/}
                        {
                            this.state.users.map(function(user){
                                return <option
                                        key = {user}
                                        value = {user}>
                                            {user}
                                        </option>
                            })
                        }
                        </select>
                    </div>
                    

                    <div className = "form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected = {this.state.date}
                                onChange = {this.onChangeDate}
                            />
                        </div>
                    </div>

                    <div className = "form-group">
                        <input type = "submit" value = "Create Debate" className = "btn btn-primary"></input>
                    </div>

                </form>

            </div>
        );
    }
}