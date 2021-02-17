import { Component } from "react";
import React from "react";
import "../css/Settings.css";
import { connect } from 'react-redux';
import Button from "react-bootstrap/Button";
import { fetchParts } from '../actions/index';
import PartSmallView from './PartSmallView';
import { Table, InputGroup, DropdownButton, Dropdown, FormControl } from "react-bootstrap";


const mapStateToProps = (reduxState) => ({
    isAuthenticated: reduxState.auth.authenticated,
    companyId: reduxState.auth.companyId,
    companyName: reduxState.auth.companyName,
    roleName: reduxState.auth.roleName,
    permissionsList: reduxState.auth.permissionsList,
    alertEmails: reduxState.auth.alertEmails,
    parts: reduxState.auth.parts,
});

class Dashboard extends Component{
  constructor(props) {
      super(props);
  
      this.state = {
        parts: [],
        field: 'Field',
      };
  }

  componentDidMount() {
    var count = 0;
    while (count < 10) {
      if (this.props.permissionsList === []) {
        setTimeout(() => {  console.log("Waiting..."); }, 100);
        count = count + 1;
      } else {
        count = 10;
      }
    }
    const temp  = localStorage.getItem('permissionsList');
    const data = {
      permissionsList: temp.split(","),
    }
    this.props.fetchParts(data);
  }

  goToAdd = (event) => {
    this.props.history.push('/add');
  }

  showParts() {
    return this.props.parts.map((part) => {
      return (<PartSmallView key={part.companyId+part.partId} part={part} hist={this.props.hist} />);
    });
  }

  render() {
      return(
        <div>
          <Button
            onClick={this.goToAdd}
          >
            Add Part for Tracking
          </Button>

          <InputGroup className="mb-3">
            <DropdownButton
              as={InputGroup.Prepend}
              variant="outline-secondary"
              title={this.state.field}
              id="input-group-dropdown-1"
            >
              <Dropdown.Item href="#">Part Id</Dropdown.Item>
              <Dropdown.Item href="#">Part Name</Dropdown.Item>
              <Dropdown.Item href="#">Company Name</Dropdown.Item>
            </DropdownButton>
            <FormControl aria-describedby="basic-addon1" placeholder="Search" />
            <InputGroup.Append>
             <Button variant="outline-secondary">Search</Button>
            </InputGroup.Append>
          </InputGroup>

          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Part Number</th>
                <th>Part Name</th>
                <th>Current Count</th>
                <th>Minimum Count</th>
                <th>Company</th>
              </tr>
            </thead>
            <tbody>
              {this.showParts()}
            </tbody>
          </Table>
        </div>
      )
  }
}

export default connect(mapStateToProps, { fetchParts })(Dashboard);