import React, { Component } from 'react';
import { Nav, NavbarToggler, NavLink, Navbar, NavbarBrand, NavItem, Collapse, Button } from 'reactstrap';
import '../scss/application.scss';
import Home from './Home/Home.jsx'
import history from '../services/HistoryService'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      isOpen: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
    this.goTo('home');
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const recipeList = this.state.recipes;

    return (
      <div>
        <Navbar color="faded" light expand="xs">
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/home">Home</NavLink>
              </NavItem>
              {
                !isAuthenticated() && (
                  <NavItem>
                    <NavLink onClick={this.login.bind(this)}>
                      Log In
                    </NavLink>
                  </NavItem>
                )
              }
              {
                isAuthenticated() && (
                  <NavItem>
                    <NavLink onClick={this.logout.bind(this)}>
                      Log Out
                    </NavLink>
                  </NavItem>
                )
              }
            </Nav>
          </Collapse>
        </Navbar>
      </div >);
  }
}

module.exports = App;