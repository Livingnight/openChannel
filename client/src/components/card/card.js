import React from 'react';

export class Card extends React.Component {
    render() {
        // let className = '';
        //
        // if (this.props.className != undefined) {
        //     className = this.props.className;
        // }

        return (
            <div className={this.props.className} >
                {this.props.children}
            </div>
        )
    }
}
