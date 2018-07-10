import React, { Component } from 'react';
import Goal from '../goal/goal'
import jwtDecode from "jwt-decode";
import API from "../../../utils/API";

export default class Home extends Component {
    state = {
        goalInput: '',
        goals: [],
        items: [],
        email: '',
        user: '',
        userId: '',
        goalId: '',
        itemId: ''

    };
    componentDidMount() {
        // this.loadGoals();
        // this.getUser(localStorage.getItem("id_token"))
    }
    handleChange = event => {
        const { name, value} = event.target;
        console.log(`name: ${name}, value: ${value}`);
        this.setState({
            [name]: value
        })
    };
    loadGoals = () => {
        API.getGoals()
            .then( goal => {
                this.setState({
                    goals: goal.data
                })
            })

    };

    goalFormSubmit = event => {
        event.preventDefault();
        API.saveGoal({
            title: this.state.goalInput
        })
            .then(response => {
                this.loadGoals();
            })
    };
    getUser = token => {
        const userInfo = jwtDecode(token);
        console.log(userInfo);
        this.setState({
            email: userInfo.email
        })
    }
    login() {
        this.props.auth.login();
    }

    render() {
        const { isAuthenticated } = this.props.auth;
        return (
            <div>
                {
                    isAuthenticated() && (
                        <Goal
                            {...this.state}
                            handleChange={() => this.handleChange}
                        />

                    )
                }
                {
                    !isAuthenticated() && (
                        <h4>
                            You are not logged in! Please{' '}
                            <a
                                style={{ cursor: 'pointer' }}
                                onClick={this.login.bind(this)}
                            >
                                Log In
                            </a>
                            {' '}to continue.
                        </h4>
                    )
                }
            </div>
        );
    }
}