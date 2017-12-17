import React from 'react';
import ReactDOM from 'react-dom';
import App from 'App';
import HistoryService from 'HistoryService';
import AuthService from 'AuthService';
import axios from 'axios';
import renderer from 'react-test-renderer';
const axiosInstance = axios;
const authInstance = new AuthService(axiosInstance);
import { makeMainRoutes } from 'Routes';

describe('Routes', () => {
    it('renders correctly', () => {
        const routes = makeMainRoutes();
        const tree = renderer
          .create(routes)
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
});