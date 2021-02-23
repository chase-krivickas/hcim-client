import { Component } from "react";
import React from "react";
import "../css/Dashboard.css";
import { connect } from 'react-redux';
import Button from "react-bootstrap/Button";
import { fetchParts } from '../actions/index';
import PartSmallView from './PartSmallView';
import { Table, InputGroup, DropdownButton, Dropdown, FormControl, Col, Row } from "react-bootstrap";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CsvDownload from 'react-json-to-csv'

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
        export: 'Export All Data'
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
    const temp  = JSON.parse(localStorage.getItem('permissionsList'));
    const data = {
      permissionsList: temp,
      roleName: this.props.roleName,
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

  refresh = (event) => {
    const temp  = JSON.parse(localStorage.getItem('permissionsList'));
    const data = {
      permissionsList: temp,
    }
    this.props.fetchParts(data);
  }

  search = (event) => {
    var searchParts = [];
    if (this.state.field === "Field") {
       // alert("Please choose search field");
      for (var j = 0; j < this.props.parts.length; j++) {
        if (Object.values(this.props.parts[j]).indexOf(this.state.search) > -1) {
          searchParts.push(this.props.parts[j]);
        }
        this.setState({parts: searchParts})
        this.setState({export: "Export Search Results"})
      }
    } 
    else if ( this.state.search !== '' || this.state.field === "Low Count") {
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
        this.setState({export: "Export Search Results"})
      }
    }
  }

  clearSearch = (event) => {
    this.setState({parts: this.props.parts});
    this.setState({export: "Export All Data"})
  }

  downloadPartsCSV = (event) => {
    var partsList = this.props.parts;
    if (this.state.parts!== null) {
      partsList = this.state.parts;
    } 

    var data = [];
    for (var i=0; i < partsList.length; i++) {
      data.push(["part id", partsList[i].partId]);
      data.push(["part name", partsList[i].partName]);
      data.push(["company id", partsList[i].companyId]);
      data.push(["company name", partsList[i].companyName]);
      data.push(["", ""]);
      data.push(["count", "day"]);
      for (var j=0; j<partsList[i].history.length; j++) {
        const temp = new Date(partsList[i].history[j].day);
        data.push([partsList[i].history[j].count, temp]);
      }
      data.push(["", ""]);
      data.push(["", ""]);
    }
    return(data);
  }

  render() {
      return(
        <div>
          { this.props.roleName==="Customer" ? (
            <div className="wrapper">
            <Row>
              <Col>
                <h3 id="brand">Consumable Inventory Manager</h3>
              </Col>
              <Col xs lg="1">
                <Row className="justify-content-md-end"> 
                  <Button onClick={this.refresh} variant="danger">
                    <FontAwesomeIcon icon={faSync}/>
                  </Button>
                </Row>
              </Col>
            </Row>
            
          </div>
          ):(
            <div className="wrapper">
            <Row>
              <Col>
              <h3 id="brand">Consumable Inventory Manager</h3>
              </Col>
              <Col xs lg="1">
                <Row className="justify-content-md-end"> 
                  <Button onClick={this.refresh} variant="danger">
                    <FontAwesomeIcon icon={faSync}/>
                  </Button>
                </Row>
              </Col>
            </Row>
            
          </div>
          )}


          
          { this.props.roleName==="Customer" ? (
            <>
            <InputGroup size="lg" className="mb-3">
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
              variant="danger"
              onClick={this.search}
              >
                Search
              </Button>
            </InputGroup.Append>
            <InputGroup.Append>
             <Button 
              variant="outline-secondary"
              onClick={this.clearSearch}
              >
                Clear Search
              </Button>
            </InputGroup.Append>
          </InputGroup>
            </>
          ):(
            <>
            <InputGroup className="mb-3" size="lg">
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
              variant="danger"
              onClick={this.search}
              >
                Search
              </Button>
            </InputGroup.Append>
            <InputGroup.Append>
             <Button 
              variant="outline-secondary"
              onClick={this.clearSearch}
              >
                Clear Search
              </Button>
            </InputGroup.Append>
            
          </InputGroup>
            </>
          )}
          
          {/* <Row className="justify-content-md-end">
              <Button variant="danger">{this.state.export}</Button>
            </Row> */}
          <div className="export">
          <Row>
            <Col>
                { this.props.roleName==="Customer" ? (
                  <>
                    <Row>
                      <Button
                        onClick={this.goToAdd}
                        variant="danger"
                      >
                        Add Part for Tracking
                      </Button>
                    </Row>
                  </>
                ):(
                  <>
                                  
                  </>
                )}
            </Col>
            <Col>
              <Row className="justify-content-md-end">
                <CsvDownload className="exportButton" data={this.downloadPartsCSV()} filename="all.csv">
                  {this.state.export}
                </CsvDownload>
              </Row>
            </Col>
          </Row>
          </div>

          {/* <div className="export">
            <Row className="justify-content-md-end">
              <CsvDownload className="exportButton" data={this.downloadPartsCSV()} filename="all.csv">
                {this.state.export}
              </CsvDownload>
            </Row>
          </div> */}

          <div className="smallSpace"></div>

          

          <Table striped bordered hover size="md">

            <thead>
              <tr>
                <th>Part Name</th>
                <th>Part Number</th>
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