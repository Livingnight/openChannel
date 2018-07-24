import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import logo from '../../Images/openChannel_logo.png'
import './Nav.css';


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

            <div>

                {isAuthenticated() ?
                    <div>
                        <Navbar fluid>
                            <Navbar.Header>
                                <Navbar.Brand>
                                    <a href="/"><img className='logo' src={logo} /></a>
                                </Navbar.Brand>
                                <Button
                                    bsStyle="primary"
                                    className="btn-margin"
                                    onClick={this.goTo.bind(this, 'goals')}
                                >
                                    Goals
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
                                        <Button
                                            id="qsLogoutBtn"
                                            bsStyle="primary"
                                            className="btn-margin"
                                            onClick={this.logout.bind(this)}
                                        >
                                            Log Out
                                        </Button>
                                    )
                                }
                            </Navbar.Header>
                        </Navbar>
                    </div>
                :
                    null
                }

            </div>


        );
    }
}