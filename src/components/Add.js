import { Component } from "react";
import React from "react";
import { connect } from 'react-redux';
import { createPart } from '../actions/index';
import { Container, Dropdown, DropdownButton } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import LoaderButton from "./LoaderButton";
import Button from "react-bootstrap/Button";
import partsList from "./partsList";
import "../css/Add.css";

const mapStateToProps = (reduxState) => ({
    isAuthenticated: reduxState.auth.authenticated,
    companyId: reduxState.auth.companyId,
    companyName: reduxState.auth.companyName,
    roleName: reduxState.auth.roleName,
    permissionsList: reduxState.auth.permissionsList,
    alertEmails: reduxState.auth.alertEmails,
    parts: reduxState.auth.parts,
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
            field: 'Part',
        };
    }

    handleSubmit = (event) => {
      event.preventDefault();
      this.setState({ isLoading: true });

      var stop = false;
      for (var i = 0; i < this.props.parts.length; i++) {
        if (this.props.parts[i].partId === this.state.partId) {
          stop = true;
        }
      }
      if (stop) {
        alert("Cannot add part. This part is already being tracked.")
        this.setState({ isLoading: false });
      } else {
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

    updateField= (event) => {
      const p = event.split("-")
      this.setState({
        field: event,
        partId: p[1].trim(),
        partName: p[0].trim(),
      });
    }

    populateDropdown() {
      return partsList.map((part) => {
        return (<Dropdown.Item key={part.partId} eventKey={`${part.partName} - ${part.partId}`}>{part.partName} - {part.partId}</Dropdown.Item>);
      });
    }

    render() {
        return(
          <div>
              <div id="header">
                  <h3>Add a new consumable part to be tracked.</h3>
              </div>

              

              <div className="Add"> 
              <Form>
                <Form.Group size="lg">
                  <Form.Label>Select Part</Form.Label>
                  <DropdownButton
                        autoFocus
                        variant="outline-secondary"
                        title={this.state.field}
                        id="input-group-dropdown-1"
                        onSelect={this.updateField}
                      >
                        {this.populateDropdown()}
                      </DropdownButton>
                      <Form.Text className="text-muted">
                        Choose part from dropdown or refer to Hypertherm catalog for part name and id.
                      </Form.Text>
                </Form.Group>

                <Form.Group>
                  <a target="_blank" rel="noreferrer" href="https://www.hypertherm.com/en-US/support/system-support/maintenance-and-use/consumable-care-and-optimization/selecting-the-right-consumables/">Hypertherm Catalog</a>
                </Form.Group>

                <Form.Group size="lg">
                  <Form.Label>Part Name</Form.Label>
                  <Form.Control
                    
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
                      When inventory reaches this minimum count threshold for this part, email alerts will be sent. 
                  </Form.Text>
                </Form.Group>
                <LoaderButton variant="danger" block size="lg" type="submit" isLoading={this.state.isLoading} onClick={this.handleSubmit}>
                  Submit
                </LoaderButton>
                <Button
                  onClick={this.toDashboard}
                  block size="lg"
                  variant="secondary"
                >
                  Cancel
                </Button>
              </Form>
              </div>
            <Container>
              <h2> </h2>
            </Container>
            
          </div>
        )
    }
}

export default connect(mapStateToProps, { createPart })(Add);