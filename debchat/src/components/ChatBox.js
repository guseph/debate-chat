import React, {Component} from 'react';
import axios from 'axios';
//import {Link} from 'react-router-dom';

const ChatMessage = props => (
    <tr>
        <td>{props.message[1]}</td>
        <td>{props.message[0]}</td>
    </tr>
    
)

export default class ChatBox extends Component{
    constructor (props){
        super(props);

        this.io = require('socket.io-client');
        this.chatSocket = this.io.connect('http://localhost:5000');

        this.onChangeMessage = this.onChangeMessage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        // io: require('socket.io-client'), chatSocket: io('http://localhost:5000'), 
        this.state = {
                    debateID: props.debateID, 
                    messages: [], 
                    currentMessage: "", 
                    currentUser: 0}
    }

    componentDidMount(){
        // first, get original messages
        axios.get(`http://localhost:5000/debates/convo/${this.state.debateID}`)
            .then(response =>{
                this.setState({
                    messages: response.data.conversation
                })
            })
            .catch((error) =>{
                console.log(error);
            })


        // socket.io stuff
        
        this.chatSocket.on('connect', () => {  // upon successful connection
            this.setState({currentUser: this.chatSocket.id});  // set unique user to unique socket ID
            this.chatSocket.emit('joinDebate', {debateID: this.state.debateID})  // emit to server that a user was successfully connected
            // ideally have them join the specific debate room, but this isn't working rn
            // right now, I think all chats across all debates will receive everything

            // when told by server to updateChatbox
            this.chatSocket.on('updateChatbox', () => {
                console.log('RECEIVED UPDATECHATBOX')

                // get new messages
                axios.get(`http://localhost:5000/debates/convo/${this.state.debateID}`)
                    .then(response =>{
                        this.setState({
                            messages: response.data.conversation
                        })
                    })
                    .catch((error) =>{
                        console.log(error);
                    })
                // force React component to display new changes
                // although calling setState should already do this
                // this.forceUpdate();
            })

            this.chatSocket.on("disconnect", () => {
                console.log("User disconnected");
            })
        })

        
    }


    chatMessages(){
        return this.state.messages.map(m => {
            console.log(m);
            return <ChatMessage message = {m} key = {m[0] + m[1]}/>
            //return <ChatMessage chatMessage={m[1]} fromUser={m[0]}  />
        })
    }

    onChangeMessage(e){
        this.setState({
            currentMessage: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();  // prevent from reloading all the time

        const message = {
            userInputTuple: [this.state.currentUser, this.state.currentMessage]
            // passes the current user and the current message as json
        }

        // send user data to backend
        axios.post(`http://localhost:5000/debates/update/convo/${this.state.debateID}`, message)
            .then(res => console.log(res.data))
            .catch((error) =>{
                console.log(error);
            })

        
        // notify other sockets that a message was sent
        // this.chatSocket.to(`${this.state.debateID}`).emit('newMessage', {message: this.state.currentMessage}); <= use this if rooms are successful
        this.chatSocket.emit('newMessage', {debateID: this.state.debateID, message: this.state.currentMessage})

        // reset this window
        this.setState(
            {
                currentMessage: ""
            }
        )
    }

    render(){
        return(
            <div>
                <table className = "table">
                    <thead className = "thead-light">
                        <tr>
                            <th>Message</th>
                            <th>FromUser</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.chatMessages()}
                    </tbody>
                </table>
                <form onSubmit = {this.onSubmit}>
                    <div className = "form-group">
                        <label>Type Here: </label>
                        <input type = "text"
                                required    
                                className = "form-control"
                                value = {this.state.currentMessage}
                                onChange = {this.onChangeMessage} />
                    </div>
                    <div className = "row">
                            <input type = "submit" value = "Send Message" className = "btn btn-primary" />
                        
                    </div>
                </form>
            </div>
        );
    }
}