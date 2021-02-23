import React from "react";
import Form from "react-bootstrap/Form";
import { Row, Button } from "react-bootstrap"
import LoaderButton from "./LoaderButton";
import "../css/ChangePassword.css";
import { Component } from "react";
import { connect } from 'react-redux';
import { changePassword } from '../actions/index';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ChangePassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: '',
            emptyFields: false,
            isLoading: false,
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({ isLoading: true });
        if (!this.state.oldPassword || !this.state.newPassword || !this.state.confirmNewPassword) {
            this.setState({ emptyFields: true });
            alert("Make sure all fields are filled in.");
            this.setState({ isLoading: false });
        } else if (this.state.newPassword !== this.state.confirmNewPassword) {
            this.setState({ emptyFields: true});
            alert("Passwords do not match.");
            this.setState({ isLoading: false });
        } else {
            const data = {
                oldPassword: this.state.oldPassword,
                newPassword: this.state.newPassword,
            };
            this.setState({ emptyFields: false });
            this.props.changePassword(data, this.props.history);
        }
    }

    updateOldPassword = (event) => {
        this.setState({ oldPassword: event.target.value });
    }

    updateNewPassword = (event) => {
        this.setState({ newPassword: event.target.value });
    }
  
    updateConfirmNewPassword = (event) => {
        this.setState({ confirmNewPassword: event.target.value });
    }

    goBack = (event) => {
        this.props.history.push('/settings');
    }

    render() {
        return (
            <div>
                <div className="backButton"> 
                <Row>
                    <Button variant="danger" size='sm' onClick={this.goBack}><FontAwesomeIcon icon={faArrowLeft}/></Button>
                </Row>
                </div>
                <div className="lander">
                    <h1>Change Password</h1>
                </div>
                <div className="change">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="oldPassowrd" size="lg">
                        <Form.Label>Old Password</Form.Label>
                        <Form.Control
                            type="password"
                            onChange={this.updateOldPassword}
                            value={this.state.oldPassword}
                        />
                    </Form.Group>
                    <Form.Group controlId="newPassword" size="lg">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                            type="password"
                            onChange={this.updateNewPassword}
                            value={this.state.newPassword}
                        />
                    </Form.Group>
                    <Form.Group controlId="confirmNewPassword" size="lg">
                        <Form.Label>Confirm New Password</Form.Label>
                        <Form.Control
                            type="password"
                            onChange={this.updateConfirmNewPassword}
                            value={this.state.confirmNewPassword}
                        />
                    </Form.Group>
                    <LoaderButton
                        block
                        size="lg"
                        type="submit"
                        variant="danger"
                        isLoading={this.state.isLoading}
                    >
                        Change Password
                    </LoaderButton>
                </Form>
                </div>
            </div>
        );
    }
}

export default connect(null, { changePassword })(ChangePassword);
