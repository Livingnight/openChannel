import React from 'react';

export const NewItemFormBtn = props =>(
    <button {...props} className='btn btn-success'>
        {props.children}
    </button>
)
