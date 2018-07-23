import React from 'react'

export const TextArea = (props) => (
    <div className="form-group">
        <textarea className="form-control" value={props.value} name='textarea' rows="5" {...props} >

        </textarea>
    </div>
)