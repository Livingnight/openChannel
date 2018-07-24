import React from 'react';
import './modal.css'

const CompleteModal = props => (
    <div className={`modal ${props.show_modal ? 'show' : ''}`}>
        <h1>YAY!</h1>
        <p>You completed a {props.completeModal}</p>
         <button onClick={() => props.setCompleteModal(false)}>Close</button>
    </div>
);

export default CompleteModal;