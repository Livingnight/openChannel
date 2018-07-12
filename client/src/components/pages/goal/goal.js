import React, {Component} from 'react';
import {Container, Col, Row} from "../../Grid";
import {GoalInput, NewGoalFormBtn } from '../../form'
import {Card, CardBody, CardHeader} from "../../card";
import styles from './goal.css';
import API from "../../../utils/API";
export default class Goal extends Component {
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
        const { isAuthenticated } = this.props.auth;
        if(isAuthenticated()){
            this.getUser(localStorage.getItem("user_email"))
        }

    }

    handleChange = event => {
        const {name, value} = event.target;
        console.log(`name: ${name}, value: ${value}`);
        this.setState({
            [name]: value
        })
    };
    loadGoals = () => {
        API.getGoals()
            .then(goal => {
                this.setState({
                    goals: goal.data,
                    goalInput: ''
                })
            })

    };

    goalFormSubmit = event => {
        event.preventDefault();
        console.log('goal submit button was pressed');
        API.saveGoal({
            title: this.state.goalInput
        })
            .then(response => {
                console.log(response);
                this.loadGoals();
            })
    };
    getUser = token => {
        console.log(localStorage.getItem('user_email'));
    }

    login() {
        this.props.auth.login();
    }

    render() {
        const {isAuthenticated} = this.props.auth;
        return (
            <div>
                {
                    isAuthenticated() && (
                        <Container fluid>
                            <Row>
                                <Col size='sm-6'>
                                    <Row>
                                        <Col size="sm-12">
                                            <Card className={`card stuff`}>
                                                <CardHeader>These are the active goals</CardHeader>
                                                <CardBody>Titles of Goals(click to see goal items)</CardBody>
                                            </Card>
                                        </Col>
                                        <Col size="sm-12">
                                            <Card className={'card'}>
                                                <CardHeader style={styles.stuff}>These are the completed goals</CardHeader>
                                                <CardBody>Titles of Goals(click to see goal items)</CardBody>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col size="sm-6">
                                    <h1>New Goal</h1>
                                    <GoalInput value={this.state.goalInput}
                                               name='goalInput'
                                               placeholder='Enter Goal Title'
                                               onChange={this.handleChange}
                                    />

                                    <NewGoalFormBtn onClick={this.goalFormSubmit}>Submit Goal</NewGoalFormBtn>
                                </Col>
                            </Row>


                        </Container>

                    )
                }
                {
                    !isAuthenticated() && (
                        <h4>
                            You are not logged in! Please{' '}
                            <a
                                style={{cursor: 'pointer'}}
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