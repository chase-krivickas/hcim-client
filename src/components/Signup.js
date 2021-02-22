import React from "react";
import Form from "react-bootstrap/Form";
import LoaderButton from "./LoaderButton";
import "../css/Signup.css";
import { Component } from "react";
import { connect } from 'react-redux';
import { signUpUser } from '../actions/index';

class Signup extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        companyName: '',
        roleName: '',
        emptyFields: false,
        isLoading: false,
      };
    }

    handleSubmit = (event) => {
      event.preventDefault();
      this.setState({ isLoading: true });
      if (!this.state.password || !this.state.username || !this.state.roleName || !this.state.companyName) {
        this.setState({ emptyFields: true});
        alert("Make sure all fields are filled in.");
        this.setState({ isLoading: false });
      } else if (this.state.password !== this.state.confirmPassword) {
        this.setState({ emptyFields: true});
        alert("Passwords do not match.");
        this.setState({ isLoading: false });
      } else {
        const data = {
          password: this.state.password,
          username: this.state.username,
          email: this.state.email,
          companyName: this.state.companyName,
          roleName: this.state.roleName,
        };
        this.setState({ emptyFields: false });
        this.props.signUpUser(data, this.props.history);
      }
    }

    updateUsername = (event) => {
      this.setState({ username: event.target.value });
    }

    updateEmail = (event) => {
      this.setState({ email: event.target.value });
    }

    updatePassword = (event) => {
      this.setState({ password: event.target.value });
    }

    updateConfirmPassword = (event) => {
      this.setState({ confirmPassword: event.target.value });
    }

    updateCompanyName = (event) => {
      this.setState({ companyName: event.target.value });
    }

    updateRoleName = (event) => {
      this.setState({ roleName: event.target.value });
      console.log(this.state.roleName);
    }

    render() {
      return (
        <div className="Signup">

          <Form onSubmit={this.handleSubmit}>
            <h1 id="heading">Create Account</h1>
            <Form.Group controlId="username" size="lg">
              <Form.Label>Username</Form.Label>
              <Form.Control
                autoFocus
                type="username"
                value={ this.state.username }
                onChange={this.updateUsername}
              />
            </Form.Group>
            <Form.Group controlId="email" size="lg">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={ this.state.email }
                onChange={this.updateEmail}
              />
            </Form.Group>
            <Form.Group controlId="password" size="lg">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={ this.state.password }
                onChange={this.updatePassword}
              />
            </Form.Group>
            <Form.Group controlId="confirmPassword" size="lg">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                onChange={ this.updateConfirmPassword }
                value={ this.state.confirmPassword }
              />
            </Form.Group>
            <Form.Group controlId="companyName" size="lg">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="username"
                onChange={ this.updateCompanyName }
                value={ this.state.companyName }
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect2">
              <Form.Label>Choose your company role</Form.Label>
              <Form.Control as="select" multiple>
                <option onClick={ this.updateRoleName}>Hypertherm</option>
                <option onClick={ this.updateRoleName}>Reseller</option>
                <option onClick={ this.updateRoleName}>Customer</option>
              </Form.Control>
            </Form.Group>
            <LoaderButton
              block
              size="lg"
              type="submit"
              variant="danger"
              isLoading={this.state.isLoading}
            >
              Register
            </LoaderButton>
          </Form>
        </div>
      );
    }
}

export default connect(null, { signUpUser })(Signup);