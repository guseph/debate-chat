import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        //this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            // database model
            username: ""
            //password: ""

        }
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    // onChangePassword(e){
    //     this.setState({
    //         password: e.target.value
    //     });
    // }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username
        }

        console.log(user);

        // send user data to backend
        axios.post('http://localhost:5000/users/add', user)
            .then(res => console.log(res.data));

        // reset this window
        this.setState(
            {
                username: ""
            }
        )
    }

    render() {
        return (
            <div>
                <h1>Create New User</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername} />
                    </div>

                    {/*For later */}
                    {/* <div className = "form-group">
                        <label>Password: </label>
                        <input type = "text"
                                required    
                                className = "form-control"
                                value = {this.state.password}
                                onChange = {this.onChangePassword} />
                    </div> */}

                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}