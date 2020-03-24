import React, {Component} from 'react';

export default class CreateDebate extends Component{
    constructor (props){
        super(props);
        this.state = {
            // database model
            topic: '',
            users: new Array(10),
            date: new Date()

            // other properties
            // users: []
        }
    }

    

    render(){
        return(
            <div>
                <p>You are on the CreateDebate Component</p>
            </div>
        );
    }
}