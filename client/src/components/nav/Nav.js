import React, { Component } from 'react';
import { Navbar, Button, Nav, NavItem } from 'react-bootstrap';
import './Nav.css';

// import './App.css';


export default class Navi extends Component {
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

                <Navbar fluid>
                    <Navbar.Header>
                        <ul>
                        <Navbar.Brand>
                            <a href="/">openChannel</a>
                        </Navbar.Brand>
                        <Button
                            bsStyle="primary"
                            className="btn-margin"
                            onClick={this.goTo.bind(this, 'goals')}
                        >
                            Actions
                        </Button>
                        {
                            !isAuthenticated() && (
                                <Button
                                    id="qsLoginBtn"
                                    bsStyle="primary"
                                    className="btn-margin"
                                    onClick={this.login.bind(this)}
                                >
                                    Log In
                                </Button>
                            )
                        }
                        {
                            isAuthenticated() && (

                                <li><Button
                                    id="qsLogoutBtn"

                                    bsStyle="primary"
                                    className="btn-margin"
                                    onClick={this.goTo.bind(this, 'goals')}
                                >
                                    {/*<p>Logged in as {localStorage.getItem('user_email')}</p>*/}
                                    Log Out
                                </Button>
                                <p>Logged in as {localStorage.getItem('user_email')}</p></li>

                            )
                        }
                        </ul>
                    </Navbar.Header>
                </Navbar>

        );
    }
}