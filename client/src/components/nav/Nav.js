import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import './Nav.css';
import logo from "../../images/openChannel_logo.png";

export default class Nav extends Component {
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
                {console.log(this.props)}
                <Navbar className= "Navbar" fluid>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="/"><img src={logo}/></a>
                        </Navbar.Brand>
                        <div className= "nav-buttons">
                        <Button
                            bsStyle="link"
                            className="btn-margin"
                            onClick={this.goTo.bind(this, 'goals')}
                        >
                            Goals
                        </Button>
                        <Button
                            bsStyle="link"
                            className="btn-margin"
                            onClick={this.goTo.bind(this, 'goalItems')}
                        >
                            Goal Items
                        </Button>
                        {
                            !isAuthenticated() && (
                                //<div>
                                // <h4> Welcome to our site! Log in and Go to home to see your goals.</h4>
                                <Button
                                    id="qsLoginBtn"
                                    bsStyle="link"
                                    className="btn-margin"
                                    onClick={this.login.bind(this)}
                                >
                                    Log In
                                </Button>
                                // </div>
                            )
                            
                        }
                        </div>
                        {
                            isAuthenticated() && (
                                /*<div>*/
                                <Button
                                    id="qsLogoutBtn"
                                    bsStyle="link"
                                    className="btn-margin"
                                    onClick={this.logout.bind(this)}
                                >
                                    Log Out
                                </Button>
                                // <h4>Welcome to our site! Click home to see your goals</h4>

                                // </div>
                            )
                        }
                    </Navbar.Header>
                </Navbar>
            </div>
        );
    }
}