import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import './Nav.css';
import logo from "../../images/openChannel_logo.png";
// import './App.css';



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
                    {/* <Navbar.Header> */}
                        <Navbar.Brand>
                            <a href="/"><img className="logo" src={logo}/></a>
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
                                <Button
                                    id="qsLoginBtn"
                                    // bsStyle="link"
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
                        </div>
                    {/* </Navbar.Header> */}
                </Navbar>
            </div>
        );
    }
}