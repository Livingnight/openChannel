import React, {Component} from 'react';

import {Container, Col, Row} from "../../Grid";
import {GoalInput, NewGoalFormBtn} from '../../form'
import {Card, CardBody} from "../../card";
import API from "../../../utils/allEmployeeAPI";
import './home.css';
import logo from "../../../Images/openChannel_indexpic.png";
import openChannel from "../../../Images/openChannel_indexlogo.png"


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
        const {name, value} = event.target;
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
        const {isAuthenticated} = this.props.auth;
        return (
            <div>
                {
                    isAuthenticated() && (
                        <Container fluid>
                            <Row>
                                <Col size="sm-6">
                                    <h1>Pipeline</h1>

                                    <Card>

                                        <CardBody>

                                            <h3>

                                                Do you see any Teletubbies in here? Do you see a slender plastic tag
                                                clipped to my shirt with my name printed on it? Do you see a little
                                                Asian child with a blank expression on his face sitting outside on a
                                                mechanical helicopter that shakes when you put quarters in it? No? Well,
                                                that's what you see at a toy store. And you must think you're in a toy
                                                store, because you're here shopping for an infant named Jeb.

                                            </h3>

                                        </CardBody>

                                    </Card>
                                    <GoalInput
                                        value={this.state.goalInput}
                                        name='goalInput'
                                        placeholder='Feedback'
                                        onChange={this.handleChange}
                                    />
                                    <NewGoalFormBtn>Add Feedback </NewGoalFormBtn>
                                    <NewGoalFormBtn>Take Action </NewGoalFormBtn>
                                </Col>

                                <Col size='sm-6'>
                                    <h1>Feedback</h1>
                                    <Card>
                                        <CardBody>
                                            <strong><em>employee@gmail.com</em></strong>
                                            <p>Thats a dumb thing to say</p>
                                        </CardBody>
                                    </Card>
                                    <Card>
                                        <CardBody>
                                            <strong><em>employee@gmail.com</em></strong>
                                            <p>Thats a dumb thing to say</p>
                                        </CardBody>
                                    </Card>
                                    <Card>
                                        <CardBody>
                                            <strong><em>employee@gmail.com</em></strong>
                                            <p>Thats a dumb thing to say</p>
                                        </CardBody>
                                    </Card>
                                    <Card>
                                        <CardBody>
                                            <strong><em>employee@gmail.com</em></strong>
                                            <p>Thats a dumb thing to say</p>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>


                        </Container>

                    )
                }
                {
                    !isAuthenticated() && (

                        <Container fluid>
                            <Row>
                                <Col size='6'>
                                    <img src={logo} alt="openChannel logo" className="homelogo" width={'100%'}/>
                                </Col>

                                <Col size='6'>
                                    <div className="loginColumn">
                                    <img src={openChannel} alt="openChannel2" className="openChannel" width={'400'}/>
                                    <a
                                        style={{cursor: 'pointer'}}
                                        onClick={this.login.bind(this)}
                                    >
                                        <br/>
                                        <button className='btn btn-success'>Log In</button>
                                    </a>
                                    </div>
                                </Col>

                            </Row>
                            {/*<div className="homelogo">*/}
                            {/*/!*<img src={logo} alt="openChannel logo" className="homelogo" width={'625'}/>*!/*/}
                            {/*<div className='jumbotron'>*/}
                            {/*<div>*/}
                            {/*<img src={openChannel} alt="openChannel2" className="openChannel" width={'400'}/>*/}
                            {/*<a*/}
                            {/*style={{cursor: 'pointer'}}*/}
                            {/*onClick={this.login.bind(this)}*/}
                            {/*>*/}
                            {/*<br/>*/}
                            {/*<button className='btn btn-success'>Log In</button>*/}
                            {/*</a>*/}
                            {/*{' '}*/}
                            {/*</div>*/}
                            {/*</div>*/}
                            {/*</div>*/}
                         </Container>
                    )
                }
            </div>
        );
    }
}