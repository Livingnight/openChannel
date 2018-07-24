import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import './Nav.css';
// import './App.css';
import logo from "../../Images/openChannel_logo.png";


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

                {isAuthenticated() ?
                    <div>
                        {console.log(this.props)}
                        <Navbar fluid>
                            {/*<Navbar.Brand>*/}
                            <Navbar.Header>
                                <Navbar.Brand>
                                    <a href="/"><img className='logo' src={logo}/></a>
                                </Navbar.Brand>
                                <Button
                                    bsStyle="link"
                                    className="btn-margin"
                                    onClick={this.goTo.bind(this, 'goals')}
                                >
                                    Goals
                                </Button>
                                {
                                    !isAuthenticated() && (
                                        <Button
                                            id="qsLoginBtn"
                                            bsStyle="link"
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
                                            bsStyle="link"
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