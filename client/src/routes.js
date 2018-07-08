import React from 'react';
import {Route, Router} from 'react-router-dom'
import App from './App';
import Home from './components/pages/landing/home';
import Callback from './components/callback/Callback';
import Auth from './Auth/Auth';
import history from './history/history';
import Nav from './components/Nav/Nav';
import GoalItem from './components/goal-item/GoalItem';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
        auth.handleAuthentication();
    }
}

export const makeMainRoutes = () => {
    return (
        <div>
        <Nav />

        <Router history={history} component={App}>
            <div>
                <Route path="/" render={(props) => <App auth={auth} {...props} />} />
                <Route path="/goal" render={(props) => <Home auth={auth} {...props} />} />
                <Route path="/goalItem" render={(props) => <GoalItem auth={auth} {...props}/>} />
                <Route path="/callback" render={(props) => {
                    handleAuthentication(props);
                    return <Callback {...props} />
                }}/>
            </div>
        </Router>
        </div>
    );
};
