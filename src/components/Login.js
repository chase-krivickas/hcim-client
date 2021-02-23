import React from "react";
import Form from "react-bootstrap/Form";
import LoaderButton from "./LoaderButton";
import "../css/Login.css";
import { Component } from "react";
import { connect } from 'react-redux';
import { loginUser } from '../actions/index';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      emptyFields: false,
      isLoading: false,
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ isLoading: true });
    if (!this.state.password || !this.state.username) {
      this.setState({ emptyFields: true});
      alert("Make sure all fields are filled in.");
      this.setState({ isLoading: false });
    } else {
      const data = {
        password: this.state.password,
        username: this.state.username,
      };
      this.setState({ emptyFields: false });
      this.props.loginUser(data, this.props.history);
    }
  }

  updateUsername = (event) => {
    this.setState({ username: event.target.value });
  }

  updatePassword = (event) => {
    this.setState({ password: event.target.value });
  }

  forgotPassword = (event) => {
    this.props.history.push('/forgotPassword');
  }

  render() {
    return (
      <div className="Login">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group size="lg" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              autoFocus
              type="username"
              value={this.state.username}
              onChange={this.updateUsername}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={this.state.password}
              onChange={this.updatePassword}
            />
          </Form.Group>
          <LoaderButton variant="danger" block size="lg" type="submit" isLoading={this.state.isLoading}>
            Login
          </LoaderButton>
        </Form>
        <div id="forgotPassword" onClick={this.forgotPassword}>Forgot Password</div>
      </div>
    );
  }
}

export default connect(null, { loginUser })(Login);
