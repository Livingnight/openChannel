import React, {Component} from 'react'
import {GoalInput} from '../../form'
import {Container, Row, Col,} from "../../Grid";
import {Card, CardBody, CardHeader} from "../../card";
import API from '../../../utils/API'


export default class Goal extends Component {
    state = {
        goalInput: '',
        goals: []

    };
    componentDidMount() {
        this.loadGoals();
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
            .then( res => {
                this.setState({goals: res.data, title: ""})
            })
            .catch(err => console.log(err));

    };



    goalFormSubmit = event => {
        event.preventDefault();
        if (this.state.goals)
        API.saveGoal({
            title: this.state.goalInput
        })
            .then(response => {
                this.loadGoals();
            })

    }


    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size="sm-3"></Col>
                    <Col size="sm-6">
                <h1>New Goal</h1>
                <GoalInput value={this.state.email}
                           name='goalInput'
                           placeholder='Enter Goal Title'
                           onChange={this.handleChange}
                />
                        <CardHeader
                            value={this.state.goals}
                            onChange={this.handleChange}
                            name="synopsis"
                            placeholder="Synopsis (Optional)"
                            />


                <button className={"btn btn-primary"} onClick={this.goalFormSubmit}>Create Goal</button>

                    </Col>
                </Row>
                <Row>
                    <Col size="sm-3"></Col>
                    <Col size="sm-6">
                    <Card>
                        <CardHeader>These are the goals</CardHeader>
                        <CardBody>Titles of Goals(click to see goal items)</CardBody>
                    </Card>
                    </Col>
                </Row>


            </Container>




        )
    }
}