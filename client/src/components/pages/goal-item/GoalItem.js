import React, {Component} from 'react';
import {Container, Col, Row} from "../../Grid";
import {GoalInput, NewGoalFormBtn} from '../../form'
import {Card, CardBody, CardHeader} from "../../card";
import itemAPI from '../../../utils/itemAPI'

export default class GoalItem extends Component {
    state = {
        goal: this.props.location.state.test,
        email: this.props.location.state.test.author,
        id: this.props.location.state.test._id,
        actionInput: ''
    };

    componentDidMount() {
        console.log(this.state.goal);
        console.log(this.state.goal.items.map(item => {
            return item.text
        }));
        this.loadItems(this.state.id);

    }
    componentWillMount() {
        this.loadItems(this.state.id);

    }

    handleChange = event => {
        const {name, value} = event.target;
        console.log(`name: ${name}, value: ${value}`);
        this.setState({
            [name]: value
        })
    };
    loadItems = (id) => {
        console.log(id);
        itemAPI.getItems(id)
            .then( items => {
                console.log('items', items.data);
                this.setState({
                    goal: items.data[0],
                    actionInput: ''
                })
            })
    };
    itemFormSubmit = event => {
        event.preventDefault();
        console.log('button works');
        itemAPI.saveItem( this.state.id, {
            text: this.state.actionInput,
            author: this.state.email
        })
            .then(response => {
                console.log(`response: ${response}`);
                this.loadItems(this.state.id);
            })
    };
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
                                            <h1>Items</h1>
                                            <Card className={`card stuff`}>
                                                <CardHeader>{this.state.goal.title}</CardHeader>
                                                <CardBody>
                                                    {this.state.goal.items.length > 0 ? (
                                                        <div>
                                                            {this.state.goal.items.map((item) => (
                                                                <Card key={item._id}>
                                                                    <p>{item.text}</p>
                                                                </Card>
                                                            ))}


                                                        </div>
                                                    ) : (
                                                        <h3>Nothing to display yet</h3>
                                                    )}
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col size="sm-6">
                                    <h1>New Item</h1>
                                    <GoalInput value={this.state.actionInput}
                                               name='actionInput'
                                               placeholder='Enter Goal action'
                                               onChange={this.handleChange}
                                    />

                                    <NewGoalFormBtn onClick={this.itemFormSubmit}>Submit Item</NewGoalFormBtn>
                                </Col>
                            </Row>
                        </Container>
                    )
                }
                {
                    !isAuthenticated() && (
                        <div>
                            <h4>You must be logged in to see your goal items!!</h4>
                        </div>
                    )
                }
            </div>
        )
    }
}