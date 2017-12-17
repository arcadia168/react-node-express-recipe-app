import React from 'react';
import ReactDOM from 'react-dom';
import App from 'App';
import HistoryService from 'HistoryService';
import AuthService from 'AuthService';
import axios from 'axios';
const axiosInstance = axios;
const authInstance = new AuthService(axiosInstance);

describe('App', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App auth={authInstance}/>, div);
    });
});

module.exports = App;