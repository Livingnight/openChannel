import history from '../history/history';
import auth0 from 'auth0-js';
import axios from 'axios';

import jwtDecode from 'jwt-decode';

export default class Auth {
    auth0 = new auth0.WebAuth({
        domain: "openchannel.auth0.com",
        clientID: "tdleustS12Wv6ox689zVkwioM4tsXn4Z",
        redirectUri: "http://localhost:3000/callback",
        audience: "https://openchannel.auth0.com/userinfo",
        responseType: "token id_token",
        scope: "openid email profile"
    });

    constructor() {
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
    }

    login() {
        this.auth0.authorize();
    }
    sendUserInfo = user => {
        axios({
            url: '/add',
            method: "POST",
            data: user
        }).then( response => {
            console.log(`Data: ${JSON.stringify(response)}`);

        })
            .catch( err => {
                console.log(`Error: ${err}`);
            })
    };

    handleAuthentication() {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.auth0.client.userInfo(authResult.accessToken, (err, user) => {
                    if( err) console.log(err);
                    // console.log(user);
                    this.sendUserInfo(user);
                });
                // const userInfo =  jwtDecode(authResult.idToken);
                // console.log(userInfo);
                this.setSession(authResult);
                history.replace('/home');
            } else if (err) {
                history.replace('/home');
                console.log(err);
                alert(`Error: ${err.error}. Check the console for further details.`);
            }
        });
    }

    setSession(authResult) {
        // Set the time that the access token will expire at
        let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
        // navigate to the home route
        history.replace('/home');
    }

    logout() {
        // Clear access token and ID token from local storage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        // navigate to the home route
        history.replace('/home');
    }

    isAuthenticated() {
        // Check whether the current time is past the
        // access token's expiry time
        let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }
}