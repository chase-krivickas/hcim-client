import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../css/Login.css";
import { Component } from "react";
import { connect } from 'react-redux';
import { logoutUser } from '../actions/index';

class Logout extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.logoutUser(this.props.history);
  }

  render() {
    return (
      <div className="Login">
        <Form onSubmit={this.handleSubmit}>
          <Button variant="danger" block size="lg" type="submit">
            Logout
          </Button>
        </Form>
      </div>
    );
  }
}

export default connect(null, { logoutUser })(Logout);
