import React from 'react'

export const CardHeader = props => (
    <div className={`card-header ${props.className}`} style={props.style}>

        {props.children}
    </div>
);