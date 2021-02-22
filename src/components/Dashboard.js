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
        parts: null,
        field: 'Field',
        search: '',
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

  updateSearch = (event) => {
    this.setState({search: event.target.value});
  }

  updateField= (event) => {
    this.setState({field: event});
  }

  goToAdd = (event) => {
    this.props.history.push('/add');
  }

  showParts() {
    var partsList = this.props.parts;
    if (this.state.parts!== null) {
      partsList = this.state.parts;
    } 
    return partsList.map((part) => {
      return (<PartSmallView key={part.companyId+part.partId} part={part} hist={this.props.hist} />);
    });
  }

  search = (event) => {
    if (this.state.field === "Field") {
      alert("Please choose search field");
    } 
    else if ( this.state.search !== '' || this.state.field === "Low Count") {
      var searchParts = [];
      for (var i = 0; i < this.props.parts.length; i++) {
        if (this.state.field === "Part Id" && this.props.parts[i].partId === this.state.search) {
          searchParts.push(this.props.parts[i]);
        }
        if (this.state.field === "Part Name" && this.props.parts[i].partName === this.state.search) {
          searchParts.push(this.props.parts[i]);
        }
        if (this.state.field === "Company Name" && this.props.parts[i].companyName === this.state.search) {
          searchParts.push(this.props.parts[i]);
        }
        if (this.state.field === "Company Id" && this.props.parts[i].companyId === this.state.search) {
          searchParts.push(this.props.parts[i]);
        }
        if (this.state.field === "Low Count" && this.props.parts[i].currCount  < this.props.parts[i].minCount) {
          searchParts.push(this.props.parts[i]);
        }
        this.setState({parts: searchParts})
      }
    }
  }

  clearSearch = (event) => {
    this.setState({parts: this.props.parts});
  }

  render() {
      return(
        <div>
          { this.props.roleName==="Customer" ? (
            <>
            <Button
              onClick={this.goToAdd}
            >
              Add Part for Tracking
            </Button>
          </>
          ):(
            <>
            </>
          )}

          { this.props.roleName==="Customer" ? (
            <>
            <InputGroup className="mb-3">
            <DropdownButton
              as={InputGroup.Prepend}
              variant="outline-secondary"
              title={this.state.field}
              id="input-group-dropdown-1"
              onSelect={this.updateField}
            >
              <Dropdown.Item href="#" eventKey="Part Id">Part Id</Dropdown.Item>
              <Dropdown.Item href="#" eventKey="Part Name">Part Name</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#" eventKey="Low Count">Low Count</Dropdown.Item>
            </DropdownButton>
            <FormControl aria-describedby="basic-addon1" placeholder="Search" onChange={this.updateSearch}/>
            <InputGroup.Append>
             <Button 
              variant="outline-secondary"
              onClick={this.search}
              >
                Search
              </Button>
            </InputGroup.Append>
          </InputGroup>
            </>
          ):(
            <>
            <InputGroup className="mb-3">
            <DropdownButton
              as={InputGroup.Prepend}
              variant="outline-secondary"
              title={this.state.field}
              id="input-group-dropdown-1"
              onSelect={this.updateField}
            >
              <Dropdown.Item href="#" eventKey="Part Id">Part Id</Dropdown.Item>
              <Dropdown.Item href="#" eventKey="Part Name">Part Name</Dropdown.Item>
              <Dropdown.Item href="#" eventKey="Company Name">Company Name</Dropdown.Item>
              <Dropdown.Item href="#" eventKey="Company Id">Company Id</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#" eventKey="Low Count">Low Count</Dropdown.Item>
            </DropdownButton>
            <FormControl aria-describedby="basic-addon1" placeholder="Search" onChange={this.updateSearch}/>
            <InputGroup.Append>
             <Button 
              variant="outline-secondary"
              onClick={this.search}
              >
                Search
              </Button>
            </InputGroup.Append>
          </InputGroup>
            </>
          )}
          

          <Button onClick={this.clearSearch}>
            Clear Search
          </Button>

          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Part Number</th>
                <th>Part Name</th>
                <th>Current Count</th>
                <th>Minimum Count</th>
                <th>Company Name</th>
                <th>Company Id</th>
              </tr>
            </thead>
            <tbody value={this.state.parts}>
              {this.showParts()}
            </tbody>
          </Table>
        </div>
      )
  }
}

export default connect(mapStateToProps, { fetchParts })(Dashboard);