import auth0 from 'auth0-js';
import history from './HistoryService'
import axios from 'axios';

class AuthService {
    constructor(axios) {
        this.auth0 = new auth0.WebAuth({
            domain: 'bennawazcodedemos.eu.auth0.com',
            clientID: 'B5bvppKVgfaM8cj3eukBOhoShRq0eBBE',
            redirectUri: 'http://localhost:3000/callback',
            audience: 'react-node-recipes-auth-api',
            responseType: 'token id_token',
            scope: 'openid profile email'
        });
        this.axios = axios;
        this.userProfile = undefined;
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
        this.getUserProfile = this.getUserProfile.bind(this);
    }

    handleAuthentication() {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
                history.replace('/home');
            } else if (err) {
                history.replace('/home');
                console.log(err);
            }
        });
    }

    getUserProfile() {
        if (!this.isAuthenticated()) {
            return null; //cannot get user profile if not authenticated
        } else {
            return JSON.parse(localStorage.getItem('user_profile'));
        }
    }

    updateUserProfile(user_profile) {
        this.axios.post('/api/users', user_profile).then((updatedUserProfile) => {
            //use the favourite recipes
            this.userProfile = updatedUserProfile;
            console.log('User profile updated on backend API: ' + JSON.stringify(updatedUserProfile));
            localStorage.setItem('user_profile', JSON.stringify(updatedUserProfile));
        }).catch((error) => {
            //log error
            console.log(error);
        });
    }

    setSession(authResult) {
        // Set the time that the access token will expire at
        let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
        localStorage.setItem('user_profile', JSON.stringify(authResult.idTokenPayload));
        //set the axios service to use this auth header
        ;
        this.axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
        //send the user profile to the backend and store/update it in the db
        this.updateUserProfile(JSON.stringify(authResult.idTokenPayload));
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

    login() {
        this.auth0.authorize();
    }
}

module.exports = AuthService;