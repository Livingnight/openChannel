import history from '../history/history';
import auth0 from 'auth0-js';


export default class Auth{

    getEnv() {
        return process.env.NODE_ENV === "production" ? "https://murmuring-tor-51179.herokuapp.com/callback" : "http://localhost:3000/callback";
    }

    auth0 = new auth0.WebAuth({
        domain: "openchannel.auth0.com",
        clientID: "tdleustS12Wv6ox689zVkwioM4tsXn4Z",
        redirectUri: this.getEnv(),
        audience: "https://openchannel.auth0.com/userinfo",
        responseType: "token id_token",
        scope: "openid email"
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

    handleAuthentication() {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
                history.replace('/');
            } else if (err) {
                history.replace('/');
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
        localStorage.setItem('user_email', authResult.idTokenPayload.email);
        // navigate to the home route
        history.replace('/');
    }

    logout() {
        // Clear access token and ID token from local storage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        localStorage.removeItem('user_email');
        // navigate to the home route
        history.replace('/');
    }

    isAuthenticated() {
        // Check whether the current time is past the
        // access token's expiry time
        let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }
    getUser() {

    }
}