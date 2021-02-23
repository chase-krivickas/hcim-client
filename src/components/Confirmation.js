import React from "react";
import Form from "react-bootstrap/Form";
import LoaderButton from "./LoaderButton";
import "../css/Confirmation.css";
import { Component } from "react";
import { connect } from 'react-redux';
import { confirmUser, resendConfirmationCode } from '../actions/index';

class Confirmation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmationCode: '',
      username: '',
      email: '',
      emptyFields: false,
      isLoading: false,
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ isLoading: true });
    if (!this.state.confirmationCode || !this.state.username || !this.state.email) {
      this.setState({ emptyFields: true});
      alert("Make sure all fields are filled in.");
      this.setState({ isLoading: false });
    } else {
      const data = {
        confirmationCode: this.state.confirmationCode,
        username: this.state.username,
        email: this.state.email,
      };
      this.setState({ emptyFields: false });
      this.props.confirmUser(data, this.props.history);
    }
  }

  resendCode = (event) => {
    if (!this.state.username || !this.state.email) {
      this.setState({ emptyFields: true});
      alert("Make sure username and email fields are filled in.");
      this.setState({ isLoading: false });
    } else {
      const data = {
        username: this.state.username,
        email: this.state.email,
      };
      this.setState({ emptyFields: false });
      this.props.resendConfirmationCode(data, this.props.history);
    }
  }

  updateConfirmationCode = (event) => {
    this.setState({ confirmationCode: event.target.value });
  }

  updateUsername = (event) => {
    this.setState({ username: event.target.value });
  }

  updateEmail = (event) => {
    this.setState({ email: event.target.value });
  }

  render() {
    return (
      <div className="Confirmation">
      <Form onSubmit={this.handleSubmit}>
        <h1 id="heading">Confirm Account</h1>
        <Form.Group controlId="username" size="lg">
          <Form.Label>Username</Form.Label>
          <Form.Control
            autoFocus
            type="tel"
            onChange={this.updateUsername}
            value={this.state.username}
          />
        </Form.Group>
        <Form.Group controlId="email" size="lg">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="tel"
            onChange={this.updateEmail}
            value={this.state.email}
          />
        </Form.Group>
        <Form.Group controlId="confirmationCode" size="lg">
          <Form.Label>Confirmation Code</Form.Label>
          <Form.Control
            type="tel"
            onChange={this.updateConfirmationCode}
            value={this.state.confirmationCode}
          />
          <Form.Text muted>Please check your email for the confirmation code.</Form.Text>
        </Form.Group>
        <LoaderButton
          block
          size="lg"
          type="submit"
          variant="danger"
          isLoading={this.state.isLoading}
        >
          Verify
        </LoaderButton>
        <LoaderButton
              block
              size="lg"
              variant="secondary"
              isLoading={this.state.isLoading}
              onClick={this.resendCode}
            >
              Resend Code
            </LoaderButton>
      </Form>
      </div>
    );
  }
}

export default connect(null, { confirmUser, resendConfirmationCode })(Confirmation);
