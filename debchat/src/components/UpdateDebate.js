import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

export default class UpdateDebate extends Component{
    constructor (props){
        super(props);

        this.onChangeTopic = this.onChangeTopic.bind(this);
        this.onChangeUser = this.onChangeUser.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            // database model
            topic: '',
            users: [],
            date: new Date(), 

            // other properties
         //    users: [],
             username: ""
        }
    }

    // alter this later
    componentDidMount(){
        axios.get('http://localhost:5000/debates/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    topic: response.data.topic,
                    users: response.data.users,
                    date: new Date(response.data.date)
                })
            })
            .catch(function (error){
                console.log(error);
            })

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
        this.setState(
            {
                topic: e.target.value
            }
        );
    }

    onChangeUser(e){
        this.setState(
            {
                username: e.target.value
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

        // add the user that creates the debate to the list of users in the debate obj

        // THIS NEEDS TO BE CHANGED TO WORK WITH THE ARRAY OF USERS IF THE USER IS CHANGED??
        let newUserList = this.state.users;
        newUserList.push(this.state.username);
        this.setState(
            {
                users: newUserList
            }
        );
        
        const debate = {
            topic: this.state.topic,
            users: this.state.users,
            date: this.state.date

        }

        // will submit to database later
        console.log(debate)

        axios.post('http://localhost:5000/debates/update' + this.props.match.params.id, debate)
            .then(res => console.log(res.data));

        window.location = "/";
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

                    {/* <div className = "form-group">
                        <label>User: </label>
                        <input type = "text"
                                className = "form-control"
                                //value = {this.state.username}
                                onChange = {this.onChangeUser}>
                        </input>
                    </div> */}

                    <select ref = "userInput"
                            required
                            className = "form-control"
                            value = {this.state.username}
                            onChange = {this.onChangeUser}>
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
                        <input type = "submit" value = "Edit Exercise Log" className = "btn btn-primary"></input>
                    </div>

                </form>

            </div>
        );
    }
}