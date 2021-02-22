import { Component } from "react";
import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import "../css/Navbar.css";
import { connect } from 'react-redux';
import logo from "../media/hypertherm_logo.png";

const mapStateToProps = (reduxState) => ({
    isAuthenticated: reduxState.auth.authenticated,
  });

class Navigation extends Component{
    constructor(props) {
        super(props);
    
        this.state = { };
      }

    render() {
        return(
          <div>
            <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
              <LinkContainer to="/">
                <Navbar.Brand className="font-weight-bold text-muted">
                  
                  <img id="sub_logo" src={logo} alt="Hypertherm logo"/>
                </Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                <Nav activeKey={window.location.pathname}>
                  {this.props.isAuthenticated ? (
                    <>
                      <LinkContainer to="/dashboard">
                        <Nav.Link>Dashboard</Nav.Link>
                      </LinkContainer>
                      <LinkContainer to="/settings">
                        <Nav.Link>Settings</Nav.Link>
                      </LinkContainer>
                      <LinkContainer to="/logout">
                        <Nav.Link>Logout</Nav.Link>
                      </LinkContainer>
                    </>
                    ) : (
                      <>
                        <LinkContainer to="/signup">
                          <Nav.Link>Sign Up</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/login">
                          <Nav.Link>Log In</Nav.Link>
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

export default connect(mapStateToProps, { })(Navigation);