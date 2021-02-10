import { Component } from "react";
import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import "../css/App.css";
import { connect } from 'react-redux';
import { logoutUser } from '../actions/index';

const mapStateToProps = (reduxState) => ({
    isAuthenticated: reduxState.auth.authenticated,
  });


class Navigation extends Component{
    constructor(props) {
        super(props);
    
        this.state = { };
      }
    
    handleLogout = (event) => {
        event.preventDefault();
        this.props.logoutUser(this.props.history);
      }

    render() {
        return(
          <div>
            <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
              <LinkContainer to="/">
                <Navbar.Brand className="font-weight-bold text-muted">
                  Hypertherm
                </Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                <Nav activeKey={window.location.pathname}>
                  {this.props.isAuthenticated ? (
                      <LinkContainer to="/signup">
                        <Nav.Link onClick={this.handleLogout}>Logout</Nav.Link>
                      </LinkContainer>
                    ) : (
                      <>
                        <LinkContainer to="/signup">
                          <Nav.Link>Signup</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/login">
                          <Nav.Link>Login</Nav.Link>
                        </LinkContainer>
                      </>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </div>
        )
    }
}

export default connect(mapStateToProps, { logoutUser })(Navigation);