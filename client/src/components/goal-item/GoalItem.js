import React, {Component} from 'react';

export default class GoalItem extends Component {
    render() {
        const {isAuthenticated} = this.props.auth;

        return (
            <div>

                {
                    isAuthenticated() && (
                        <h4>this is where the goal items are rendered.</h4>
                    )
                }
                {
                    !isAuthenticated() && (
                        <div>
                            <h4>You must be logged in to see your goal items!!</h4>
                        </div>
                    )
                }
            </div>
        )
    }
}