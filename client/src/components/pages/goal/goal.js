import React, {Component} from 'react'
import {GoalInput, NewGoalFormBtn } from '../../form'
import {Container, Row, Col} from "../../Grid";
import {Card, CardBody, CardHeader} from "../../card";
// import API from '../../../utils/API'
// import jwtDecode from 'jwt-decode';

export default class Goal extends Component {
    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size="sm-3"></Col>
                    <Col size="sm-6">
                <h1>New Goal</h1>
                <GoalInput value={this.props.goalInput}
                           name='goalInput'
                           placeholder='Enter Goal Title'
                           onChange={this.props.handleChange}
                />

                <NewGoalFormBtn/>
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