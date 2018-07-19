import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import './Nav.css';
<<<<<<< HEAD
import logo from "../../images/openChannel_logo.png";
=======
// import './App.css';
>>>>>>> 543a840106943816009e8b51066a2662d92b763f


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
<<<<<<< HEAD
                        <Button
                            bsStyle="link"
                            className="btn-margin"
                            onClick={this.goTo.bind(this, 'goalItems')}
                        >
                            Goal Items
                        </Button>
=======
>>>>>>> 543a840106943816009e8b51066a2662d92b763f
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
                        </div>
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
        );
    }
}