import React from 'react';
import {rules} from './data.js';

const Rules = function () {
    const sect1 = "Creating Debates";
    const sect2 = "Participating In Debates";
    const sect3 = "Debate Rules";
    const sect4 = "Other"
    return (
        <div>
            <h1>Rules</h1>
            <p></p>
            <div className="row">
                <div className="col-3">

                    <div id="list-example" class="list-group">
                        <a className="list-group-item list-group-item-action" href="#list-item-1">{sect1}</a>
                        <a className="list-group-item list-group-item-action" href="#list-item-2">{sect2}</a>
                        <a className="list-group-item list-group-item-action" href="#list-item-3">{sect3}</a>
                        <a className="list-group-item list-group-item-action" href="#list-item-4">{sect4}</a>
                    </div>
                </div>
                <div className="col-9">
                    <div data-spy="scroll" data-target="#list-example" data-offset="0" className="scrollspy-example">
                        <h4 id="list-item-1">{sect1}</h4>
                        <p>{rules.pt1}</p>
                        <h4 id="list-item-2">{sect2}</h4>
                        <p>{rules.pt2}</p>
                        <h4 id="list-item-3">{sect3}</h4>
                        <p>{rules.pt3}</p>
                        <h4 id="list-item-4">{sect4}</h4>
                        <p>{rules.pt4}</p>
                    </div>

                </div>

            </div>


        </div>
    );
}

export default Rules;
