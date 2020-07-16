import React from 'react';

const Timeline = () => {
    return (
        // Add jquery to change the active based on the timer somehow? Need state for this
        <div>
            <ul class="list-group">
                <li class="list-group-item active">Intro</li>
                <li class="list-group-item">Proponent Turn</li>
                <li class="list-group-item">Opponent Turn</li>
                <li class="list-group-item">Proponent Turn</li>
            </ul>
        </div>
    )
}

export default Timeline;