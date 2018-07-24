import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {Container, Col, Row} from "../../Grid";
import {GoalInput, NewGoalFormBtn } from '../../form'
import {Card, CardBody, CardHeader} from "../../card";
import CompleteModal from '../../modal/completeModal';
import CreateModal from '../../modal/createModal';
import './goal.css';
import '../../modal/modal.css';



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
        // this.setState({showCreateModal: true});
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
                {
                    isAuthenticated() && (
                        <Container fluid>
                            <Row>
                                <Col size='sm-6'>
                                    <Row>
                                        <Col size="sm-12">
                                            <h1>Working on...</h1>
                                            <Card className="cardStuff">
                                                {/* <CardHeader>These are the active goals</CardHeader> */}
                                            <CompleteModal showModal={this.state.showCompleteModal} completeModal="Goal" />
                                            <CreateModal setCreateModal={this.setCreateModal} show_modal={this.state.showCreateModal} completeModal="Goal"/>

                                                <CardBody>
                                                    {this.state.goals.length ? (
                                                        <Card>

                                                            {this.state.goals.map((goal, i) => (
                                                                !goal.complete &&


                                                                <CardBody key={i}>
                                                                    <p className='goalTitle'>{goal.title}
                                                                        <Link to={{
                                                                            pathname: `/goalItem/${goal._id}`,
                                                                            state: { test: this.state.goals[i] }
                                                                        }}>
                                                                            <button
                                                                                className={`btn btn-success manageBtn`}>Manage
                                                                                </button>
                                                                        </Link>
                                                                    </p>




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
                                            <h1>Completed</h1>
                                            <Card className="cardStuff">
                                                {/* <CardHeader>These are the completed goals</CardHeader> */}
                                                <CardBody>
                                                    {this.state.goals.length ? (
                                                        <Card>
                                                            {this.state.goals.map((goal, i) => (
                                                                goal.complete &&
                                                                <CardBody key={i}>
                                                                    <p className='goalTitle'>{goal.title}
                                                                        <Link to={{
                                                                            pathname: `/goalItem/${goal._id}`,
                                                                            state: {test: this.state.goals[i]}
                                                                        }}>
                                                                            <button
                                                                                className={'btn btn-success manageBtn'}>Manage
                                                                            </button>
                                                                        </Link>
                                                                    </p>
                                                                </CardBody>

                                                            ))}
                                                        </Card>
                                                    ) : (
                                                            <h3>Nothing to display yet</h3>
                                                        )}
                                                </CardBody>
                                            </Card>                                        </Col>
                                    </Row>
                                </Col>
                                <Col size="sm-6">
                                    <div className="newGoalSection">
                                        <h2>New Goal</h2>
                                        <GoalInput className="feedbackDisplay"value={this.state.goalInput}
                                            name='goalInput'
                                            placeholder='Enter Goal Title'
                                            onChange={this.handleChange}
                                        />

                                        <NewGoalFormBtn className= "manageBtn"onClick={this.goalFormSubmit}>Add new goal</NewGoalFormBtn>
                                    </div>
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