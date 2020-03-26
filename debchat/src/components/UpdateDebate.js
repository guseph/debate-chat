import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

export default class UpdateDebate extends Component{
    constructor (props){
        super(props);

        this.onChangeTopic = this.onChangeTopic.bind(this);
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
             users: [],
             username: ""
        }
    }

    // alter this later
    componentDidMount(){
        axios.get('http://localhost:5000/debates/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    topic: response.data.topic,
                    proponent: response.data.proponent,
                    opponent: response.data.opponent,
                    date: new Date(response.data.date)
                })
            })
            .catch(function (error){
                console.log(error);
            })

        // get list of users for the dropdown

        axios.get('http://localhost:5000/users/')
            .then(response =>{
                if(response.data.length > 0){
                    this.setState({
                        users: response.data.map(user => user.username),
                    })
                }
            })
    }

    onChangeTopic(e){
        console.log("changed topic to " + e.target.value);
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
        console.log("changed opponent to " + e.target.value);
        this.setState({
            opponent: e.target.value
        });
    }

    onChangeDate(date){
        console.log("changed date");
        this.setState(
            {
                date: date
            }
        );
    }

    onSubmit(e){
        console.log("Submitting!");
        e.preventDefault();
        
        const debate = {
            topic: this.state.topic,
            proponent: this.state.proponent,
            opponent: this.state.opponent,
            date: this.state.date,
            conversation: []

        }

        console.log(debate)

        axios.post('http://localhost:5000/debates/update/' + this.props.match.params.id, debate)
            .then(res => console.log(res.data));

        //window.location = "/";
    }

    render(){
        return(
            <div>
                <h3>Update Debate</h3>
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
                        <label>Proponent: </label>
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
                        <label>Opponent: </label>
                        <select 
                                required
                                className = "form-control"
                                value = {this.state.opponent}
                                onChange = {this.onChangeOpponent}>
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
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected = {this.state.date}
                                onChange = {this.onChangeDate}
                            />
                        </div>
                    </div>

                    <div className = "form-group">
                        <input type = "submit" value = "Save Changes" className = "btn btn-primary"></input>
                    </div>

                </form>

            </div>
        );
    }
}