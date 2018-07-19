import React from 'react';

export const TextBox = (props) => (
    <div className="form-check">
        <input type="checkbox" className="form-check-input" {...props}/>
            {/*<label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>*/}
    </div>
)