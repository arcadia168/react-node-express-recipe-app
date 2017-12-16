import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import '../scss/application.scss';
import Home from './Home/Home.jsx'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
    };
  }

  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  getUserProfile() {
    this.props.auth.getUserProfile();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const recipeList = this.state.recipes;

    return (
      <div>
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Auth0 - React</a>
            </Navbar.Brand>
            {
               !isAuthenticated() && (
                <Button
                  bsStyle="primary"
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
                  bsStyle="primary"
                  className="btn-margin"
                  onClick={this.logout.bind(this)}
                >
                  Log Out
                  </Button>
              )
            }
          </Navbar.Header>
        </Navbar>
      </div>);
  }
}

module.exports = App;