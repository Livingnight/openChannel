import React, {Component} from 'react';
import {Link} from 'react-router-dom'
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
        showModal: false,
        email: '',
        goalId: '',
        itemId: ''

    };

    componentWillMount() {
        const { isAuthenticated } = this.props.auth;
        if(isAuthenticated()){
            this.getUser(localStorage.getItem("user_email"))
        }
        this.loadGoals(localStorage.getItem("user_email"));
    }
    componentDidMount() {
        // const { isAuthenticated } = this.props.auth;
        // if(isAuthenticated()){
        //     this.getUser(localStorage.getItem("user_email"))
        // }
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
        event.preventDefault();
        API.saveGoal({
            title: this.state.goalInput,
            email: this.state.email
        })
            .then(response => {
                console.log(`response: ${response}`);
                this.loadGoals(this.state.email);
            })
    };
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
                {
                    isAuthenticated() && (
                        <Container fluid>
                            <Row>
                                <Col size='sm-6'>
                                    <Row>
                                        <Col size="sm-12">
                                            <Card className={`card stuff`}>
                                                <CardHeader>These are the active goals</CardHeader>
                                                <CardBody>
                                                    {this.state.goals.length ? (
                                                        <Card>

                                                            {this.state.goals.map((goal, i) => (
                                                                <h3 key={i}>
                                                                    <Link to={{
                                                                        pathname: `/goalItem/${goal._id}`,
                                                                        state: {test: this.state.goals[i]}
                                                                    }}>{goal.title}</Link>
                                                                    <button onClick={() => this.deleteGoal(goal._id)} className={`btn btn-warning`}>Delete
                                                                    </button>
                                                                </h3>

                                                            ))}
                                                        </Card>
                                                    ) : (
                                                        <h3>Nothing to display yet</h3>
                                                    )}
                                                </CardBody>
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