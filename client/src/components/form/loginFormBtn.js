import React from 'react';

export const LoginFormBtn = props =>(
    <button {...props} className='btn btn-success'>
        {props.children}
    </button>
)