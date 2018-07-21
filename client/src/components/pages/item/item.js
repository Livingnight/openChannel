import React, {Component} from 'react';

import {Container, Col, Row} from "../../Grid";
import {Card, CardBody, CardHeader} from "../../card";
import jwtDecode from "jwt-decode";
import styles from './item.css';
import API from "../../../utils/API";
import {ItemInput} from "../../form/item-input";
import {NewItemFormBtn} from "../../form/newItemFormBtn";
import Navi from "../../nav/Nav";

export default class Item extends Component {
    state = {
        goalInput: '',
        goals: [],
        items: [],
        email: '',
        user: '',
        userId: '',
        goalId: '',
        itemId: ''

    };

    componentDidMount() {
        const { isAuthenticated } = this.props.auth;
        if(this.props.auth.isAuthenticated()){
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
    loadItems = () => {
        API.getItems()
            .then(item => {
                this.setState({
                    items: item.data,
                    itemInput: ''
                })
            })

    };

    itemFormSubmit = event => {
        event.preventDefault();
        console.log('goal submit button was pressed');
        API.saveItem({
            title: this.state.itemInput
        })
            .then(response => {
                console.log(response);
                this.loadItems();
            })
    };
    getUser = token => {
        const userInfo = jwtDecode(token);
        console.log(userInfo);
        this.setState({
            email: userInfo.email
        })
    }

    login() {
        this.props.auth.login();
    }

    render() {
        const {isAuthenticated} = this.props.auth;
        return (
            <div>
                <Navi/>
                {
                    isAuthenticated() && (
                        <Container fluid>
                            <Row>
                                <Col size='sm-6'>
                                    <Row>
                                        <Col size="sm-12">
                                            <Card className={`card stuff`} style={styles.stuff}>
                                                <CardHeader>These are the active items</CardHeader>
                                                <CardBody>Titles of Item(click to see items)</CardBody>
                                            </Card>
                                        </Col>
                                        <Col size="sm-12">
                                            <Card className={'card'}>
                                                <CardHeader className={'cardHeader stuff2'}>These are the completed goals</CardHeader>
                                                <CardBody>Titles of Goals(click to see goal items)</CardBody>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col size="sm-6">
                                    <h1>New Item</h1>
                                    <ItemInput value={this.state.itemInput}
                                               name='itemInput'
                                               placeholder='Enter Item Title'
                                               onChange={this.handleChange}
                                    />

                                    <NewItemFormBtn onClick={this.itemFormSubmit}>Submit Goal</NewItemFormBtn>
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