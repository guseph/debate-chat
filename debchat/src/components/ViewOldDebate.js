import React, {Component} from 'react';
import axios from 'axios';

const Message = props => (
    <tr>
        <td>{props.message}</td>
        <td>{props.user}</td>
    </tr>
)

export default class ViewOldDebate extends Component{
    constructor (props){
        super(props)

        this.state = {
            debateName: "",
            proponent: "",
            opponent: "",
            conversation: [],
            date: new Date()
        }

        this.chatMessages = this.chatMessages.bind(this);
        
    }
    
    componentDidMount(){
        console.log("mounted View OldDebate");
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

    chatMessages(){
        return this.state.messages.map(m =>{
            return <Message message = {m[1]} user = {m[0]}></Message>
        })
    }

    render(){
        return(
            <div className = "container">
                <div className = "container" id = "header">
                    <div className = "row justify-content-center">
                        <h1>{this.state.debateName}</h1>
                    </div>
                    <div className = "row justify-content-center">
                        <h2><i>{this.state.proponent} v. {this.state.opponent}</i></h2>
                    </div>
                    <div className = "row justify-content-center">
                        <i>{this.state.date.toString().substring(0,10)}</i>
                    </div>
                </div>
                <hr></hr>
              

               <div className = "row container justify-content-center">
                   <table className = "table">
                       <thead>
                            <tr>
                                <th>Message</th>
                                <th>User</th>
                            </tr>
                       </thead>
                       <tbody>
                           {this.chatMessages()}
                       </tbody>
                    
                   </table>
               </div>

            </div>

        );
    }

}