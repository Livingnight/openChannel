import React from 'react';

const CreateModal = props => (
    <div className={`scratchModal ${props.show_modal ? 'show' : ''}`}>
        <h1>YAY!</h1>
        <p>You completed a {props.completeModal}</p>
         <button onClick={() => props.setCreateModal(false)}>Close</button>
    </div>
);

export default CreateModal;