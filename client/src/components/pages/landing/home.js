import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {Container, Col, Row} from "../../Grid";
import {GoalInput, NewGoalFormBtn} from '../../form'
import {Card, CardBody} from "../../card";
import './home.css';
import logo from "../../../Images/openChannel_indexpic.png";
import openChannel from "../../../Images/openChannel_indexlogo.png";
import API from "../../../utils/API";
import itemAPI from '../../../utils/itemAPI'


export default class Home extends Component {
    state = {
        goalInput: '',
        goals: {},
        items: [],
        author: '',
        allEmployee: 'AllEmployees',

    };
    componentWillMount() {
        this.loadGoals();

    }
    handleChange = event => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        })
    };
    loadGoals = () => {
        API.getAllEmployeeGoals()
            .then( goal => {
                console.log(goal.data);
                this.setState({
                    goalInput: '',
                    goals: goal.data[0] || {},
                    items: goal.data.items || [],
                    author: localStorage.getItem('user_email'),

                })
            })

    };

    feedbackFormSubmit = event => {
        event.preventDefault();
        itemAPI.saveItem(this.state.goals._id, {
            text: this.state.goalInput,
            author: this.state.author
        })
            .then(response => {
                console.log(response);
                this.loadGoals();
            })
    };
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
                                    <h1>Pipeline</h1>

                                    <Card>

                                        <CardBody>

                                                {/*<h3>*/}

                                                {/*Do you see any Teletubbies in here? Do you see a slender plastic tag*/}
                                                {/*clipped to my shirt with my name printed on it? Do you see a little*/}
                                                {/*Asian child with a blank expression on his face sitting outside on a*/}
                                                {/*mechanical helicopter that shakes when you put quarters in it? No? Well,*/}
                                                {/*that's what you see at a toy store. And you must think you're in a toy*/}
                                                {/*store, because you're here shopping for an infant named Jeb.*/}

                                                {/*</h3>*/}
                                            {this.state.goals ?
                                                <h3>{this.state.goals.title}</h3> :
                                                <h3>Nothing to display</h3>
                                            }

                                        </CardBody>

                                    </Card>
                                    <GoalInput
                                        value={this.state.goalInput}
                                        name='goalInput'
                                        placeholder='Feedback'
                                        onChange={this.handleChange}
                                    />
                                    <NewGoalFormBtn onClick={this.feedbackFormSubmit}>Add Feedback</NewGoalFormBtn>
                                    <Link to={'/goals'}><NewGoalFormBtn>Take Action </NewGoalFormBtn></Link>
                                </Col>

                                <Col size='sm-6'>
                                    <h1>Feedback</h1>
                                    {this.state.goals.items ?
                                        this.state.goals.items.map( (item, i) => (
                                            <Card key={i}>
                                                <p>{item.author}</p>
                                                <p>{item.text}</p>
                                            </Card>
                                        )) :
                                        <Card>
                                            <p>No items to display yet</p>
                                        </Card>
                                    }


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
                                    <img src={openChannel} alt="openChannel2" className="openChannel" width={'40%'}/>
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