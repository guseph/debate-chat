import React from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, } from '@fortawesome/free-solid-svg-icons';


const DebateCard = (props) => {
    return (
        <div class="card" style={{width: "18rem"}}>
            {/* <img src="..." class="card-img-top" alt="..." /> */}
            <div class="card-body">
                <h4 class="card-title">{props.debate.topic}</h4>
                <p className = "card-text">{props.debate.proponent} v. {props.debate.opponent}</p>
                <p className = "card-text">{props.debate.date.substring(0, 10)}</p>
                <p class="card-text">Description of Debate here.</p>
                {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                <Link  to={"/debates/history/" + props.debate._id}>View</Link>
                <a  id = "delete" href="/" onClick={() => { props.deleteDebate(props.debate._id) }}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></a>
            </div>
        </div>
    )

}

export default DebateCard;