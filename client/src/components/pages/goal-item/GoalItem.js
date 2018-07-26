import React, {Component} from 'react';
import {Container, Col, Row} from "../../Grid";
import {GoalInput, NewGoalFormBtn} from '../../form'
import {Card, CardBody} from "../../card";
import API from '../../../utils/API';
import itemAPI from '../../../utils/itemAPI';
import {TextArea} from "../../form/TextArea";
import {TextBox} from "../../form/text-box";
import "./GoalItem.css";

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
                            <div className='goalItempage'>
                            <Row>

                                <Col size="sm-12">

                                    <button className='description' style={{textAlign: "center"}}>{this.state.goal.title}</button>
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
                                            <button className='updateButton'
                                                onClick={() => this.handleDescriptionUpdate(this.state.id, {description: this.state.textarea})}>Update
                                            </button>

                                        </Col>
                                        <Col size={'sm-1'}>
                                            <button className='inProgress' onClick={() => this.handleGoalComplete(this.state.id, {complete: !this.state.goal.complete})}>
                                                {!this.state.goal.complete ? 'In Progress' : 'Completed'}
                                            </button>

                                        </Col>
                                        <Col size='sm-5'></Col>
                                    </Row>
                                </Col>
                            </Row>
                                <br/>
                            <Row>
                                <Col size='sm-6'>
                                    <Row>
                                        <Col size="sm-12">
                                            <div className='itemsSection'>
                                            <h2>Items</h2>
                                            <Card className={`card-stuff`}>
                                                <CardBody className={'lastmin'}>
                                                    {this.state.goal.items.length > 0 ? (
                                                        <div className='newItems'>
                                                            {this.state.goal.items.map((item) => (
                                                                <Card key={item._id}>
                                                                    <CardBody>
                                                                        <h4 style={{'textDecoration': item.complete ? 'line-through' : ''}}>{item.text}</h4>
                                                                        <button
                                                                            onClick={() => this.deleteItem(item._id, {id: this.state.id})}
                                                                            className={`btn btn-warning deleteBtn`}>Delete
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
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col size="sm-6">
                                    <div className="newItem">
                                    <h2>New Item</h2>
                                    <GoalInput value={this.state.actionInput}
                                               name='actionInput'
                                               placeholder='Enter Goal action'
                                               onChange={this.handleChange}
                                    />

                                    <NewGoalFormBtn onClick={this.itemFormSubmit}>Submit Item</NewGoalFormBtn>
                                    </div>
                                </Col>

                            </Row>
                            </div>
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