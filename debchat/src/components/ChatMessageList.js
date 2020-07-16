import React from 'react';
import './ChatMessageList.css';



function ChatMessageList(props) {
    // gets passed the list of messages (conversation stored in debate object)
    console.log(props.conversation);
    return (
        <ul id="messageBox" className="container">
            {props.conversation.map(messageTuple => {
                return (
                    <li className="message container" key={Math.random()}> {/* bad practice but idk what other key to put here */}
                        <div>
                            <div className="user">
                                <strong>{messageTuple[0]}</strong>
                            </div>
                            <div className="textBox">
                                <p className="text">{messageTuple[1]}</p>
                            </div>
                        </div>

                    </li>
                );
            })}
        </ul>

    );
}

export default ChatMessageList;

