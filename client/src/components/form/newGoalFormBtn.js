import React from 'react';

export const NewGoalFormBtn = props =>(
    <button {...props} style={props.style} className='btn btn-success manageBtn'>
        {props.children}
    </button>
)