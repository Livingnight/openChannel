import React, {Component} from 'react';
import {Container, Col, Row} from "../../Grid";
import {GoalInput, NewGoalFormBtn} from '../../form'
import {Card, CardBody, CardHeader} from "../../card";
import API from '../../../utils/API';
import itemAPI from '../../../utils/itemAPI';
import {TextArea} from "../../form/TextArea";
import {TextBox} from "../../form/text-box";
import Navi from "../../nav/Nav";

export default class GoalItem extends Component {
    state = {
        goal: this.props.location.state.test,
        email: this.props.location.state.test.author,
        id: this.props.location.state.test._id,
        textarea: this.props.location.state.test.description,
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

    handleDescriptionUpdate(id, data) {
        console.log(`id: ${id} data: ${JSON.stringify(data)}`);
        console.log('clicked');
        API.updateGoal(id, data)
            .then(goal => {
                console.log(goal)
            }).then(response => {
            this.loadGoal(id);
        })

    }
    handleChange = event => {
        const {name, value} = event.target;
        console.log(`name: ${name}, value: ${value}`);
        this.setState({
            [name]: value
        })
    };
    loadGoal = (id) => {
        console.log(id);
        API.getGoal(id)
            .then(goal => {
                console.log(`Goals: ${goal.data}`);
                this.setState({
                    goal: goal.data,
                    goalInput: ''
                })
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
    deleteItem = (id, data) => {
        console.log(id);
        itemAPI.deleteItem(id, data)
            .then(items => {
                console.log(items);
                this.loadItems(this.state.id);
            })
    }
    handleGoalComplete = (id, data) => {
        console.log('data', data);
        API.updateGoal(id, data)
            .then(response => {
                console.log(response);
                this.loadGoal(this.state.id);
            })
    };
    handleItemComplete = (id, data) => {
        console.log('id:', id);
        console.log('data:', data);
        itemAPI.updateItem(id, data)
            .then( response => {
                this.loadGoal(this.state.id);
            })

    };
    setStyle = (complete) => {
        let style;
        complete ? style={'text-decoration': 'line-through'} : ''
    }
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
        const style = {
            'text-decoration': this
        }

        return (
            <div>
                {/*<Navi auth={this.props.auth}/>*/}
                {
                    isAuthenticated() && (
                        <Container fluid>
                            <Row>
                                <Col size="sm-12">

                                    <h1 style={{textAlign: "center"}}>{this.state.goal.title}</h1>

                                    <Row>
                                        <Col size='sm-4'></Col>
                                        <Col size='sm-4'>
                                            <TextArea placeholder={'further describe your purpose'}
                                                      value={this.state.textarea} onChange={this.handleChange}/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col size='sm-5'></Col>
                                        <Col size={'sm-1'}>
                                            <button
                                                onClick={() => this.handleDescriptionUpdate(this.state.id, {description: this.state.textarea})}>Update
                                            </button>

                                        </Col>
                                        <Col size={'sm-1'}>
                                            <button onClick={() => this.handleGoalComplete(this.state.id, {complete: !this.state.goal.complete})}>
                                                {!this.state.goal.complete ? 'In Progress' : 'Completed'}
                                            </button>

                                        </Col>
                                        <Col size='sm-5'></Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col size='sm-6'>
                                    <Row>
                                        <Col size="sm-12">
                                            <h1>Items</h1>
                                            <Card className={`card stuff`}>
                                                <CardBody>
                                                    {this.state.goal.items.length > 0 ? (
                                                        <div>
                                                            {this.state.goal.items.map((item) => (
                                                                <Card key={item._id}>
                                                                    <CardBody>
                                                                        <h4 style={{'text-decoration': item.complete ? 'line-through' : ''}}>{item.text}</h4>
                                                                        <button
                                                                            onClick={() => this.deleteItem(item._id, {id: this.state.id})}
                                                                            className={`btn btn-warning`}>Delete
                                                                        </button>
                                                                        <TextBox
                                                                            checked={item.complete}
                                                                            onClick={() => this.handleItemComplete(item._id, {complete: !item.complete})}
                                                                        />
                                                                    </CardBody>
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