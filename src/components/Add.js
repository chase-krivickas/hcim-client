import { Component } from "react";
import React from "react";
import { connect } from 'react-redux';
import { createPart } from '../actions/index';
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import LoaderButton from "./LoaderButton";
import Button from "react-bootstrap/Button";

const mapStateToProps = (reduxState) => ({
    isAuthenticated: reduxState.auth.authenticated,
    companyId: reduxState.auth.companyId,
    companyName: reduxState.auth.companyName,
    roleName: reduxState.auth.roleName,
    permissionsList: reduxState.auth.permissionsList,
    alertEmails: reduxState.auth.alertEmails
});

class Add extends Component{
    constructor(props) {
        super(props);
    
        this.state = {
            partId: '',
            partName: '',
            currCount: 0,
            minCount: 1,
            isLoading: false,
        };
    }

    handleSubmit = (event) => {
      event.preventDefault();
      this.setState({ isLoading: true });
      if (this.state.partId !== '' && this.state.partName !== '' ) {
        const data = {
          companyId: this.props.companyId,
          companyName: this.props.companyName,
          partId: this.state.partId,
          partName: this.state.partName,
          currCount: this.state.currCount,
          minCount: this.state.minCount,
          alertEmails: this.props.alertEmails,
        };
        this.props.createPart(data, this.props.history);
      } else {
        alert("Make sure all fields are filled in.");
        this.setState({ isLoading: false });
      }
    }

    toDashboard = (event) => {
      this.props.history.push('/dashboard');
    }

    updatePartName = (event) => {
        this.setState({ partName: event.target.value });
    }

    updatePartId = (event) => {
        this.setState({ partId: event.target.value });
    }

    updateCurrCount = (event) => {
        this.setState({ currCount: event.target.value });
    }

    updateMinCount = (event) => {
        this.setState({ minCount: event.target.value });
    }

    render() {
        return(
          <div>
              <Container>
                  <h3>Add a new consumable part to be tracked.</h3>
              </Container>
              <Form>
                <Form.Group size="lg">
                  <Form.Label>Part Name</Form.Label>
                  <Form.Control
                    autoFocus
                    type="username"
                    value={this.state.partName}
                    onChange={this.updatePartName}
                  />
                </Form.Group>
                <Form.Group size="lg">
                  <Form.Label>Part Id</Form.Label>
                  <Form.Control
                    type="username"
                    value={this.state.partId}
                    onChange={this.updatePartId}
                  />
                  <Form.Text className="text-muted">
                      Refer to Hypertherm Part Number Documentation
                  </Form.Text>
                </Form.Group>
                <Form.Group size="lg">
                  <Form.Label>Current Count</Form.Label>
                  <Form.Control
                    type="username"
                    value={this.state.currCount}
                    onChange={this.updateCurrCount}
                  />
                  <Form.Text className="text-muted">
                      Enter your current inventory level for this part.
                  </Form.Text>
                </Form.Group>
                <Form.Group size="lg">
                  <Form.Label>Minimum Count</Form.Label>
                  <Form.Control
                    type="username"
                    value={this.state.minCount}
                    onChange={this.updateMinCount}
                  />
                  <Form.Text className="text-muted">
                      When inventory reaches the minimum count threshold, email alerts will be sent. 
                  </Form.Text>
                </Form.Group>
                <LoaderButton block size="lg" type="submit" isLoading={this.state.isLoading} onClick={this.handleSubmit}>
                  Submit
                </LoaderButton>
            </Form>
            <Container>
              <h2> </h2>
            </Container>
            <Button
              onClick={this.toDashboard}
            >
              Back to Dashboard
            </Button>
          </div>
        )
    }
}

export default connect(mapStateToProps, { createPart })(Add);