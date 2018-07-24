import React from 'react';
import {Route, Router} from 'react-router-dom'
import Goal from './components/pages/goal/goal';
import Home from './components/pages/landing/home'
import Callback from './components/callback/Callback';
import Auth from './Auth/Auth';
import history from './history/history';

import Navi from './components/Nav/Nav';
import GoalItem from './components/pages/goal-item/GoalItem';

import './components/pages/landing/home.css';


const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
        auth.handleAuthentication()
    }
}

export const makeMainRoutes = () => {

    return (
        <div>
        <Router history={history} component={Navi}>
            <div>
                <Route path="/" render={(props) => <Navi auth={auth} {...props} />} />
                <Route exact path='/' render={(props) => <Home history={history} auth={auth} {...props} />} />
                <Route path="/goals" render={(props) => <Goal history={history} auth={auth} {...props} />} />
                <Route path="/goalItem" render={(props) => <GoalItem history={history} auth={auth} {...props}/>} />
                <Route path="/callback" render={(props) => {
                    handleAuthentication(props);
                    return <Callback {...props} />
                }}/>
            </div>
        </Router>
        </div>
    );
};
