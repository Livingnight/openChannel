import React from 'react';
import './modal.css';

const CreateModal = props => (
    <div className={`modal ${props.show_modal ? 'show' : ''}`}>
        <h1>YAY!</h1>
        <p>You completed a {props.complete}</p>
         <button onClick={() => props.setCreateModal(false)}>Close</button>
    </div>
);

export default CreateModal;