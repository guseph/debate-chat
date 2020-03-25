import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class CreateDebate extends Component{
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
        this.setState(
            {username: "test user"}
        )
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
                        <label>User: </label>
                        <input type = "text"
                                className = "form-control"
                                //value = {this.state.username}
                                onChange = {this.onChangeUser}>
                        </input>
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