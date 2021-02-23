import React from "react";
import Form from "react-bootstrap/Form";
import LoaderButton from "./LoaderButton";
import "../css/ForgotPassword.css";
import { Component } from "react";
import { connect } from 'react-redux';
import { forgotPassword, resetPassword } from '../actions/index';

class ForgotPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            confirmationCode: '',
            username: '',
            password: '',
            confirmPassword: '',
            emptyFields: false,
            isLoading: false,
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({ isLoading: true });
        if (!this.state.confirmationCode || !this.state.username || !this.state.password) {
            this.setState({ emptyFields: true });
            alert("Make sure all fields are filled in.");
            this.setState({ isLoading: false });
        } else if (this.state.password !== this.state.confirmPassword) {
            this.setState({ emptyFields: true});
            alert("Passwords do not match.");
            this.setState({ isLoading: false });
        } else {
            const data = {
                code: this.state.confirmationCode,
                username: this.state.username,
                password: this.state.password,
            };
            this.setState({ emptyFields: false });
            this.props.resetPassword(data, this.props.history);
        }
    }

    sendCode = (event) => {
        if (!this.state.username) {
            this.setState({ emptyFields: true });
            alert("Make sure username is filled in.");
            this.setState({ isLoading: false });
        } else {
            this.setState({ emptyFields: false });
            const data = {
                username: this.state.username
            }
            this.props.forgotPassword(data, this.props.history);
        }
    }

    updateConfirmationCode = (event) => {
        this.setState({ confirmationCode: event.target.value });
    }

    updateUsername = (event) => {
        this.setState({ username: event.target.value });
    }

    updatePassword = (event) => {
        this.setState({ password: event.target.value });
      }
  
    updateConfirmPassword = (event) => {
        this.setState({ confirmPassword: event.target.value });
    }

    render() {
        return (
            <div className="FPassword">
                <Form onSubmit={this.handleSubmit}>
                    <h1 id="heading">Forgot Password</h1>
                    <p id="subheading">Enter username, click 'Send Reset Code', and check email for code.</p>
                    <Form.Group controlId="username" size="lg">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="username"
                            onChange={this.updateUsername}
                            value={this.state.username}
                        />
                    </Form.Group>
                    <LoaderButton
                        block
                        size="lg"
                        variant="secondary"
                        isLoading={this.state.isLoading}
                        onClick={this.sendCode}
                    >
                        Send Reset Code
                    </LoaderButton>
                    <div id="spacer"></div>
                    <Form.Group controlId="confirmationCode" size="lg">
                        <Form.Label>Reset Code</Form.Label>
                        <Form.Control
                            type="tel"
                            onChange={this.updateConfirmationCode}
                            value={this.state.confirmationCode}
                        />
                    </Form.Group>
                    <Form.Group controlId="password" size="lg">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                            type="password"
                            onChange={this.updatePassword}
                            value={this.state.password}
                        />
                    </Form.Group>
                    <Form.Group controlId="confirmPassword" size="lg">
                        <Form.Label>Confirmation New Password</Form.Label>
                        <Form.Control
                            type="password"
                            onChange={this.updateConfirmPassword}
                            value={this.state.confirmPassword}
                        />
                    </Form.Group>
                    <LoaderButton
                        block
                        size="lg"
                        type="submit"
                        variant="danger"
                        isLoading={this.state.isLoading}
                    >
                        Reset Password
                    </LoaderButton>
                </Form>
            </div>
        );
    }
}

export default connect(null, { forgotPassword, resetPassword })(ForgotPassword);
