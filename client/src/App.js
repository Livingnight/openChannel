import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import './App.css';

export default class App extends Component {
    goTo(route) {
        this.props.history.replace(`/${route}`)
    }

    login() {
        this.props.auth.login();
    }

    logout() {
        this.props.auth.logout();
    }

    render() {
        const { isAuthenticated } = this.props.auth;

        return (
            <div>
                <Navbar fluid>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="/">Landing Page</a>
                        </Navbar.Brand>
                        <Button
                            bsStyle="primary"
                            className="btn-margin"
                            onClick={this.goTo.bind(this, 'goal')}
                        >
                            Goals
                        </Button>
                        <Button
                            bsStyle="primary"
                            className="btn-margin"
                            onClick={this.goTo.bind(this, 'goalItem')}
                        >
                            Goal Items
                        </Button>
                        {
                            !isAuthenticated() && (
                                <div>
                                <h4> Welcome to our site! Log in and Go to home to see your goals.</h4>
                                <Button
                                    id="qsLoginBtn"
                                    bsStyle="primary"
                                    className="btn-margin"
                                    onClick={this.login.bind(this)}
                                >
                                    Log In
                                </Button>
                                </div>
                            )
                        }
                        {
                            isAuthenticated() && (
                                <div>
                                <Button
                                    id="qsLogoutBtn"
                                    bsStyle="primary"
                                    className="btn-margin"
                                    onClick={this.logout.bind(this)}
                                >
                                    Log Out
                                </Button>

                                    <br/>

                                    <h4>Welcome to openChannel!! </h4>

                                </div>
                            )
                        }
                    </Navbar.Header>
                </Navbar>
            </div>
        );
    }
}