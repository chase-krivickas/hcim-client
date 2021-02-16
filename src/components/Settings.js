import { Component } from "react";
import React from "react";
import "../css/Settings.css";
import { connect } from 'react-redux';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import LoaderButton from "./LoaderButton";

const mapStateToProps = (reduxState) => ({
    isAuthenticated: reduxState.auth.authenticated,
    companyId: reduxState.auth.companyId,
    companyName: reduxState.auth.companyName,
    roleName: reduxState.auth.roleName,
    permissionsList: reduxState.auth.permissionsList,
    alertEmails: reduxState.auth.alertEmails
  });

class Settings extends Component{
    constructor(props) {
        super(props);
    
        this.state = {
          edit: true,
          companyName: this.props.companyName,
          companyId: this.props.companyId,
          addEmail: '',
          removeEmail: '',
          addPermission: '',
          removePermission: '',
        };
      }

    updateEdit = (event) => {
      this.setState({ edit: !this.state.edit });
    }

    render() {
        return(
          <div>
            <div className="lander">
              <h1>Settings</h1>
            </div>
          {this.state.edit ? (
            <div>
            <Form>
            <Form.Group controlId="companyName" size="lg">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                readOnly
                onChange={ this.updateCompanyName }
                value={ this.props.companyName }
              />
            </Form.Group>
            <Form.Group controlId="roleName" size="lg">
              <Form.Label>Company Role</Form.Label>
              <Form.Control
                readOnly
                onChange={ this.updateCompanyName }
                value={ this.props.roleName }
              />
            </Form.Group>
            <Form.Group controlId="alertEmails" className="overflow-auto" size="lg">
              <Form.Label>Alert Emails: the emails that will be alerted when inventory is low.</Form.Label>
              <Form.Control
                readOnly
                onChange={ this.updateCompanyName }
                value={ this.props.alertEmails }
              />
            </Form.Group>
            <Form.Group controlId="permissionsList" className="overflow-auto" size="lg">
              <Form.Label>View Permissions: The list of company ids you have permission to view their records.</Form.Label>
              <Form.Control
                readOnly
                onChange={ this.updateCompanyName }
                value={ this.props.permissionsList }
              />
            </Form.Group>
            <Button
              block
              size="lg"
              type="submit"
              variant="success"
              onClick={ this.updateEdit}
            >
              Edit
            </Button>
            </Form>
            </div>
          ) : (
            <div>
            <Form onSubmit={this.handleSubmit}>
            <Form.Group size="lg">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="username"
                onChange={ this.updateCompanyName }
                value={ this.state.companyName }
              />
            </Form.Group>
            <Form.Group  size="lg">
              <Form.Label>Company Role</Form.Label>
              <Form.Control
                type="username"
                onChange={ this.updateCompanyName }
                value={ this.state.roleName }
              />
            </Form.Group>
            <Form.Group  size="lg">
              <Form.Label>Alert Emails</Form.Label>
              <Form.Control
                type="username"
                onChange={ this.updateCompanyName }
                value={ this.state.alertEmails }
              />
            </Form.Group>
            {/* <Form.Group controlId="exampleForm.ControlSelect2">
              <Form.Label>Choose your company role</Form.Label>
              <Form.Control as="select" multiple>
                <option onClick={ this.updateRoleName}>Hypertherm</option>
                <option onClick={ this.updateRoleName}>Reseller</option>
                <option onClick={ this.updateRoleName}>Customer</option>
              </Form.Control>
            </Form.Group> */}
            <LoaderButton
              block
              size="lg"
              type="submit"
              variant="success"
              isLoading={this.state.isLoading}
            >
              Register
            </LoaderButton>
          </Form>
          </div>
          )}
          </div>
        )
    }
}

export default connect(mapStateToProps, { })(Settings);