import React, { Component } from 'react';

import { Container, Col, Row } from "../../Grid";
import { GoalInput, NewGoalFormBtn } from '../../form'
import { Card, CardBody } from "../../card";
import API from "../../../utils/allEmployeeAPI";
import "./home.css"


export default class Home extends Component {
    state = {
        goalInput: '',
        goals: [],
        items: [],
        email: 'allEmployees',
        user: '',
        userId: '',
        goalId: '',
        itemId: ''

    };
    componentDidMount() {
        this.loadGoals(this.state.email);
        if (this.props.auth.isAuthenticated()) {
            this.getUser(localStorage.getItem("id_token"))
        }

    }
    handleChange = event => {
        const { name, value } = event.target;
        console.log(`name: ${name}, value: ${value}`);
        this.setState({
            [name]: value
        })
    };
    loadGoals = (email) => {
        API.getGoals(email)
            .then(goal => {
                console.log(goal);
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
                this.loadGoals(this.state.email);
            })
    };
    getUser = () => {
        console.log(localStorage.getItem('user_email'));
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
                        <Container fluid>
                            <Row>
                                <Col size="sm-6">
                                    <h1>PIPELINE</h1>

                                    <Card>

                                        <CardBody className="text-box">

                                            <p>

                                                Do you see any Teletubbies in here? Do you see a slender plastic tag
                                                clipped to my shirt with my name printed on it? Do you see a little
                                                Asian child with a blank expression on his face sitting outside on a
                                                mechanical helicopter that shakes when you put quarters in it? No? Well,
                                                that's what you see at a toy store. And you must think you're in a toy
                                                store, because you're here shopping for an infant named Jeb.
                                            </p>

                                        </CardBody>

                                    </Card>
                                    <GoalInput
                                        className="feedbackInput"
                                        value={this.state.goalInput}
                                        name='goalInput'
                                        placeholder='Feedback'
                                        onChange={this.handleChange}
                                    />
                                    <NewGoalFormBtn>Add Feedback </NewGoalFormBtn>
                                    <NewGoalFormBtn>Take Action </NewGoalFormBtn>
                                </Col>
                                <Col Col size='sm-6'>
                                    <div className="feedback">
                                        <h2>Feedback</h2>
                                        <div className='feedbackDisplay'>
                                            <Card>
                                                <CardBody>
                                                    <h5>employee@gmail.com</h5>
                                                    <p id='comment'>Thats a dumb thing to say</p>
                                                </CardBody>
                                            </Card>
                                            <Card>
                                                <CardBody>
                                                <h5>employee@gmail.com</h5>
                                                    <p id='comment'>Thats a dumb thing to say</p>
                                                </CardBody>
                                            </Card>
                                            <Card>
                                                <CardBody>
                                                <h5>employee@gmail.com</h5>
                                                    <p id='comment'>Thats a dumb thing to say</p>
                                                </CardBody>
                                            </Card>
                                            <Card>
                                                <CardBody>
                                                <h5>employee@gmail.com</h5>
                                                    <p id='comment'>Thats a dumb thing to say</p>
                                                </CardBody>
                                            </Card>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    )
                }
                {
                    !isAuthenticated() && (
                        <Container>
                            <div className='jumbotron'>
                                <h4>
                                    Welcome to openChannel! Please{' '}
                                    <a
                                        style={{ cursor: 'pointer' }}
                                        onClick={this.login.bind(this)}
                                    >
                                        <button className='btn btn-success'>Log In</button>
                                    </a>
                                    {' '}to continue.
                        </h4>
                            </div>
                        </Container>
                    )
                }
            </div>
        );
    }
}