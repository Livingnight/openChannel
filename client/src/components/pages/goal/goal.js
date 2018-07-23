import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {Container, Col, Row} from "../../Grid";
import {GoalInput, NewGoalFormBtn } from '../../form'
import {Card, CardBody, CardHeader} from "../../card";
import CompleteModal from '../../modal/completeModal';
import CreateModal from '../../modal/createModal';
import './goal.css';

import API from "../../../utils/API";

export default class Goal extends Component {
    state = {
        goalInput: '',
        goals: [],
        showCompleteModal: false,
        showCreateModal: false,
        email: '',

    };

    componentWillMount() {
        const { isAuthenticated } = this.props.auth;
        if(isAuthenticated()){
            this.getUser(localStorage.getItem("user_email"))
        }
        this.loadGoals(localStorage.getItem("user_email"));
    }
    // componentDidMount() {
        // const { isAuthenticated } = this.props.auth;
        // if(isAuthenticated()){
        //     this.getUser(localStorage.getItem("user_email"))
        // }
    // }
    setCompleteModal = (show) => {
        if ( show ) {
            console.log('complete show is true');
            this.setState({ showCompleteModal: true });
        } else this.setState({ showCompleteModal: false });
    }
    setCreateModal = (show) => {
        if ( show ) {
            console.log('show is true');
            this.setState({ showCreateModal: true });
        } else this.setState({ showCreateModal: false });
    }
    handleChange = event => {
        const {name, value} = event.target;
        console.log(`name: ${name}, value: ${value}`);
        this.setState({
            [name]: value
        })
    };
    deleteGoal = id => {
        API.deleteGoal(id)
            .then( goal => {
                console.log(goal);
                this.loadGoals(this.state.email);
            })
    }
    loadGoals = (email) => {
        console.log(email);
        API.getGoals(email)
            .then(goal => {
                console.log(`Goals: ${goal.data}`);
                this.setState({
                    goals: goal.data,
                    goalInput: ''
                })
            })

    };

    goalFormSubmit = event => {
        this.setState({showCreateModal: true});
        event.preventDefault();
        API.saveGoal({
            title: this.state.goalInput,
            allEmployee: false,
            author: this.state.email
        })
            .then(response => {
                console.log(`response: ${response}`);
                console.log(this.state.showCreateModal);
                this.setCreateModal(this.state.showCreateModal);
                this.loadGoals(this.state.email);
            })
    };
    // handleComplete = (id, data) => {
    //     console.log('data', data);
    //     API.updateGoal(id, data)
    //         .then(response => {
    //             this.loadGoals(this.state.email);
    //         })
    // }
    getUser = () => {
        // console.log(localStorage.getItem('user_email'));
        this.setState({
            email: localStorage.getItem('user_email')
        })
    };

    login() {
        this.props.auth.login();
    }

    render() {
        const {isAuthenticated} = this.props.auth;
        return (
            <div>
                {/*<Navi auth={this.props.auth}/>*/}
                {
                    isAuthenticated() && (
                        <Container fluid>
                            <Row>
                                <Col size='sm-6'>
                                    <Row>
                                        <Col size="sm-12">
                                            <CompleteModal showModal={this.state.showCompleteModal} completeModal="Goal" />
                                            <CreateModal show_modal={this.state.showCreateModal} completeModal="Goal"/>
                                            <h1>Goals</h1>
                                            <Card className={`card stuff`}>
                                                <CardHeader>These are the active goals</CardHeader>
                                                <CardBody>
                                                    {this.state.goals.length ? (
                                                        <Card>

                                                            {this.state.goals.map((goal, i) => (
                                                                !goal.complete &&


                                                                    <CardBody key={i}>
                                                                        <h3>{goal.title}
                                                                            <Link to={{
                                                                                pathname: `/goalItem/${goal._id}`,
                                                                                state: {test: this.state.goals[i]}
                                                                            }}>
                                                                                <button
                                                                                    className={'btn btn-success'}>Manage
                                                                                </button>
                                                                            </Link>
                                                                        </h3>




                                                                    </CardBody>


                                                            ))}
                                                        </Card>
                                                    ) : (
                                                        <h3>Nothing to display yet</h3>
                                                    )}
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        <Col size="sm-12">
                                            <h1>Goals</h1>
                                            <Card className={`card stuff`}>
                                                <CardHeader>These are the completed goals</CardHeader>
                                                <CardBody>
                                                    {this.state.goals.length ? (
                                                        <Card>

                                                            {this.state.goals.map((goal, i) => (
                                                                goal.complete &&
                                                                <CardBody key={i}>
                                                                    <h3>{goal.title}
                                                                        <Link to={{
                                                                            pathname: `/goalItem/${goal._id}`,
                                                                            state: {test: this.state.goals[i]}
                                                                        }}>
                                                                            <button
                                                                                className={'btn btn-success'}>Manage
                                                                            </button>
                                                                        </Link>
                                                                    </h3>
                                                                </CardBody>

                                                            ))}
                                                        </Card>
                                                    ) : (
                                                        <h3>Nothing to display yet</h3>
                                                    )}
                                                </CardBody>
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