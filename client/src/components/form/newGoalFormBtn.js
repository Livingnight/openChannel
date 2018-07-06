import React from 'react';

export const NewGoalFormBtn = props =>(
    <button {...props} className='btn btn-success'>
        {props.children} Create Goal!
    </button>
)