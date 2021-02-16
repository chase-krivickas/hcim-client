import { Component } from "react";
import React from "react";
import "../css/Settings.css";
import { connect } from 'react-redux';
import { Container, Col, Row, InputGroup, FormControl, ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { updateCompany } from '../actions/index';

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
          space: '_______',
          companyName: '',
          addEmail: '',
          removeEmail: '',
          addPermission: '',
          removePermission: '',
          isLoading: false,
          // alertEmails: this.props.alertEmails.split(','),
          alertEmails: this.props.alertEmails,
          // permissionsList: this.props.permissionsList.split(','),
          permissionsList: this.props.permissionsList,
          roleName: this.props.roleName,
        };
      }

    updateEdit = (event) => {
      this.setState({ edit: !this.state.edit });
    }

    updateCompanyName = (event) => {
      this.setState({ companyName: event.target.value });
    }

    updateAddEmail = (event) => {
      this.setState({ addEmail: event.target.value });
    }

    updateRemoveEmail = (event) => {
      this.setState({ removeEmail: event.target.value });
    }

    updateAddPermission = (event) => {
      this.setState({ addPermission: event.target.value });
    }

    updateRemovePermission = (event) => {
      this.setState({ removePermission: event.target.value });
    }

    updateRoleName = (event) => {
      this.setState({ roleName: event.target.value });
    }

    submitChange = (event) => {
      const data = {
        companyName: (this.state.companyName==='' ? null : this.state.companyName),
        roleName: (this.state.roleName===this.props.roleName ? null : this.state.roleName),
        addEmail: (this.state.addEmail==='' ? null : this.state.addEmail),
        removeEmail: (this.state.removeEmail==='' ? null : this.state.removeEmail),
        addPermission: (this.state.addPermission==='' ? null : this.state.addPermission),
        removePermission: (this.state.removePermission==='' ? null : this.state.removePermission)
      };
      if (data.companyName!==null || data.roleName!==null || data.addEmail!==null || data.removeEmail!==null || data.addPermission!==null || data.removePermission!==null) {
        console.log(data);
        this.props.updateCompany(data, this.props.history);
      };
    }

    render() {
        return(
          <div>
            <div className="lander">
              <h1>Account Settings</h1>
            </div>
          {!this.state.edit ? (
            <div>
              <button
                onClick={this.updateEdit}>
                Edit
              </button>
            </div>
          ) : (
            <div>
            <Container>
              <Row>
                <h1>{this.state.space}</h1>
              </Row>
              <Row>
                <h5>Current Company Name: {this.props.companyName}</h5>
              </Row>
              <Row>
                <h4> </h4>
              </Row>
            </Container>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="New name of company"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                onChange={this.updateCompanyName}
              />
              <InputGroup.Append>
                <Button variant="outline-secondary"
                onClick={this.submitChange}
                value={'companyName'}
                >
                  Change</Button>
              </InputGroup.Append>
            </InputGroup>

            <Container>
              <Row>
                <h1>{this.state.space}</h1>
              </Row>
              <Row>
                <h4>Current Role: {this.props.roleName}</h4>
              </Row>
              <Row>
                <h4> </h4>
              </Row>
              <Row>
                <Col>
                  <Button active={false} variant="Light" disabled={false}>Select different role:</Button>
                </Col>
                <Col>
                  <ToggleButtonGroup aria-label="Basic example" type="radio" name="options">
                    <ToggleButton variant="outline-secondary" value="Hypertherm" onClick={this.updateRoleName}>Hypertherm</ToggleButton>
                    <ToggleButton variant="outline-secondary" value="Reseller" onClick={this.updateRoleName}>Reseller</ToggleButton>
                    <ToggleButton variant="outline-secondary" value="Customer" onClick={this.updateRoleName}>Customer</ToggleButton>
                  </ToggleButtonGroup>
                </Col>
                <Col>
                  <Button
                    value="roleName"
                    onClick={this.submitChange}
                  >
                    Change
                  </Button>
                </Col>
              </Row>
            </Container>
            

            <Container>
              <Row>
                <h1>{this.state.space}</h1>
              </Row>
              <Row>
                <h5>List of emails that will be alerted when inventory is low:</h5>
              </Row>
              <Row>
                <p> </p>
              </Row>
              <Row>
                {/* <p>{this.state.alertEmails.split(',').map((x) => `${x}`).join(', ')}</p> */}
                <p>{this.props.alertEmails}</p>
              </Row>
              <Row>
                <p> </p>
              </Row>
            </Container>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="enter email to add (example@example.com)"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                onChange={this.updateAddEmail}
              />
              <InputGroup.Append>
                <Button variant="outline-secondary"
                onClick={this.submitChange}
                value={'addEmail'}
                >
                  Add</Button>
              </InputGroup.Append>
            </InputGroup>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="enter email to remove (example@example.com)"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                onChange={this.updateRemoveEmail}
              />
              <InputGroup.Append>
                <Button variant="outline-secondary"
                onClick={this.submitChange}
                value={'removeEmail'}
                >
                  Remove</Button>
              </InputGroup.Append>
            </InputGroup>

            <Container>
              <Row>
                <h1>{this.state.space}</h1>
              </Row>
              <Row>
                <h5>List of company ids that you have permission to see:</h5>
              </Row>
              <Row>
                <p> </p>
              </Row>
              <Row>
                {/* <p>{this.state.permissionsList.split(',').map((x) => `${x}`).join(', ')}</p> */}
                <p>{this.props.permissionsList}</p>
              </Row>
              <Row>
                <p> </p>
              </Row>
            </Container>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="company id to add"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                onChange={this.updateAddPermission}
              />
              <InputGroup.Append>
                <Button variant="outline-secondary"
                onClick={this.submitChange}
                value={'addPermission'}
                >
                  Add</Button>
              </InputGroup.Append>
            </InputGroup>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="company id to remove"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                onChange={this.updateRemovePermission}
              />
              <InputGroup.Append>
                <Button variant="outline-secondary"
                onClick={this.submitChange}
                value={'removePermission'}
                >
                  Remove</Button>
              </InputGroup.Append>
            </InputGroup>
            

            {/* <Container>
              <Row>
                <h1>{this.state.space}</h1>
              </Row>
              <Row>
                <h4>Current Company Name: {this.props.companyName}</h4>
              </Row>
              <Row>
                <h4> </h4>
              </Row>
            </Container>
            <Form>
            <Form.Group size="lg" as={Row} onSubmit={this.submitChange("companyName")}>
              <Form.Label column sm="3">Company Name</Form.Label>
              <Col>
                <Form.Control
                  type="username"
                  placeholder={this.props.companyName}
                  onChange={ this.updateCompanyName }
                  value={ this.state.companyName }
                />
              </Col>
              <Col>
                <LoaderButton
                  block
                  size="md"
                  type="submit"
                  variant="success"
                  isLoading={this.state.isLoading}
                  >
                    Change
                </LoaderButton>
              </Col>
            </Form.Group>
            
            <Container>
              <Row>
                <h1>{this.state.space}</h1>
              </Row>
              <Row>
                <h4>Current Role: {this.props.roleName}</h4>
              </Row>
              <Row>
                <h4> </h4>
              </Row>
            </Container>

            <Form.Group as={Row}>
              <Form.Label column sm="3">Select your company role</Form.Label>
              <Col>
                <Form.Control as="select" multiple>
                  <option onClick={ this.updateRoleName}>Hypertherm</option>
                  <option onClick={ this.updateRoleName}>Reseller</option>
                  <option onClick={ this.updateRoleName}>Customer</option>
                </Form.Control>
              </Col>
              <Col>
                <LoaderButton
                  block
                  size="md"
                  type="submit"
                  variant="success"
                  isLoading={this.state.isLoading}
                  >
                    Change
                </LoaderButton>
              </Col>
            </Form.Group>

            <Container>
              <Row>
                <h1>{this.state.space}</h1>
              </Row>
              <Row>
                <h4>List of emails that will be alerted when inventory is low:</h4>
              </Row>
              <Row>
                <p> </p>
              </Row>
              <Row>
                <p>Emails: {this.state.alertEmails.map((x) => `${x}`).join(', ')}</p>
              </Row>
              <Row>
                <p> </p>
              </Row>
            </Container>

            <Form.Group size="lg" as={Row}>
              <Form.Label column sm="3">Add alert email:</Form.Label>
              <Col>
                <Form.Control
                  type="username"
                  placeholder="example@example.com"
                  onChange={ this.updateAddEmail }
                  value={ this.state.addEmail }
                />
              </Col>
              <Col>
                <LoaderButton
                  block
                  size="md"
                  type="submit"
                  variant="success"
                  isLoading={this.state.isLoading}
                  >
                    Add
                </LoaderButton>
              </Col>
            </Form.Group>

            <Form.Group size="lg" as={Row}>
              <Form.Label column sm="3">Remove email from alert list:</Form.Label>
              <Col>
                <Form.Control
                  type="username"
                  placeholder="example@example.com"
                  onChange={ this.updateRemoveEmail }
                  value={ this.state.removeEmail }
                />
              </Col>
              <Col>
                <LoaderButton
                  block
                  size="md"
                  type="submit"
                  variant="success"
                  isLoading={this.state.isLoading}
                  >
                    Remove
                </LoaderButton>
              </Col>
            </Form.Group>

            <Container>
              <Row>
                <h1>{this.state.space}</h1>
              </Row>
              <Row>
                <h4>List of company ids which you have permission to view:</h4>
              </Row>
              <Row>
                <p> </p>
              </Row>
              <Row>
                <p>Company Ids: {this.state.permissionsList.map((x) => `${x}`).join(', ')}</p>
              </Row>
              <Row>
                <p> </p>
              </Row>
            </Container>

            <Form.Group size="lg" as={Row}>
              <Form.Label column sm="3">Add company by id:</Form.Label>
              <Col>
                <Form.Control
                  type="username"
                  placeholder="example@example.com"
                  onChange={ this.updateAddPermission }
                  value={ this.state.addPermission }
                />
              </Col>
              <Col>
                <LoaderButton
                  block
                  size="md"
                  type="submit"
                  variant="success"
                  isLoading={this.state.isLoading}
                  >
                    Add
                </LoaderButton>
              </Col>
            </Form.Group>

            <Form.Group size="lg" as={Row}>
              <Form.Label column sm="3">Remove company from permissions:</Form.Label>
              <Col>
                <Form.Control
                  type="username"
                  placeholder="example@example.com"
                  onChange={ this.updateRemovePermission }
                  value={ this.state.removePermission }
                />
              </Col>
              <Col>
                <LoaderButton
                  block
                  size="md"
                  type="submit"
                  variant="success"
                  isLoading={this.state.isLoading}
                  >
                    Remove
                </LoaderButton>
              </Col>
            </Form.Group>

            <Container>
              <Row>
                <h1> </h1>
              </Row>
              <Button
                onClick={this.updateEdit}
                size="md"
                >
                  Back
              </Button>
              <Row>
                <h4> </h4>
              </Row>
            </Container> */}
          {/* </div></Form> */}
          </div>
          )}
          </div>
        )
    }
}

export default connect(mapStateToProps, { updateCompany })(Settings);