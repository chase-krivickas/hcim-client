import { Component } from "react";
import React from "react";
import "../css/Part.css";
import { connect } from 'react-redux';
import { Container, Col, Row, InputGroup, FormControl, Button } from "react-bootstrap";
import { updatePart, deletePart } from '../actions/index';
import { CanvasJSChart } from 'canvasjs-react-charts';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const mapStateToProps = (reduxState) => ({
    isAuthenticated: reduxState.auth.authenticated,
    companyId: reduxState.auth.companyId,
    companyName: reduxState.auth.companyName,
    roleName: reduxState.auth.roleName,
    permissionsList: reduxState.auth.permissionsList,
    alertEmails: reduxState.auth.alertEmails,
    parts: reduxState.auth.parts,
    currentPart: reduxState.auth.currentPart,
});

class Part extends Component{
  constructor(props) {
      super(props);

      var data = []
      for (var i = 0; i < this.props.currentPart.history.length; i ++) {
        const date = new Date(this.props.currentPart.history[i].day)
        const point = {
            x: date,
            y: this.props.currentPart.history[i].count,
        };
        data.push(point);
      }
  
      this.state = {
        parts: [],
        currentPart: this.props.currentPart,
        edit: false,
        buttonValue: 'Edit',
        minCount: '',
        currCount: '',
        data: data, 
        delete: '', 
      };
  }

  updateEdit = (event) => {
    this.setState({ edit: !this.state.edit});
    if (this.state.edit) {
        // save the data
        var data = {
            companyId: this.props.currentPart.companyId,
            partId: this.props.currentPart.partId,
            currCount: null,
            minCount: null,
        }
        if (this.state.currCount !== '' && this.state.currCount !== this.props.currentPart.currCount) {
            data.currCount = this.state.currCount
        }
        if (this.state.minCount !== '' && this.state.minCount !== this.props.currentPart.minCount) {
            data.minCount = this.state.minCount
        }
        if (data.currCount !== null || data.minCount !== null) {
            this.props.updatePart(data, this.props.history);
        }
        this.setState({ buttonValue: 'Edit'});
    } else {
        // enable editing
        this.setState({ buttonValue: 'Save'});
    }
  }

  updateCurrCount = (event) => {
    this.setState({ currCount: event.target.value });
  }

  updateMinCount = (event) => {
    this.setState({ minCount: event.target.value });
  }

  updateDelete = (event) => {
    this.setState({ delete: event.target.value });
  }

  goToDash = (event) => {
    this.props.history.push('/dashboard');
  }

  deleteEntry = (event) => {
      if (this.state.delete === "delete" || this.state.delete === "Delete") {
          console.log("delete");
          const data = {
              companyId: this.props.companyId,
              partId: this.props.currentPart.partId,
          }
          this.props.deletePart(data, this.props.history);
      }
  }

  render() {
      return(
        <div>
            {this.props.roleName==="Customer" ? (
                <Container>
                <Row>
                    <Button variant="danger" size='sm' onClick={this.goToDash}><FontAwesomeIcon icon={faArrowLeft}/></Button>
                </Row>
                <div id="spacer2"></div>
                <Row>
                    <h3>{this.props.currentPart.partName} - ({this.props.currentPart.partId})</h3>
                </Row>

                <div id="spacer2"></div>

                <Container> 
                <Row>
                    <Col>
                    <Row className="justify-content-md-center"> 
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Current Count</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            disabled={!this.state.edit}
                            placeholder={this.props.currentPart.currCount}
                            onChange={this.updateCurrCount}
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                    </Row>
                    </Col>
                    
                    <Col>
                    <Row className="justify-content-md-center">
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Minimum Count</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            disabled={!this.state.edit}
                            placeholder={this.props.currentPart.minCount}
                            onChange={this.updateMinCount}
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                    </Row>
                    </Col>

                    <Col xs lg="2">
                        <Row className="justify-content-md-center">
                            <Button
                                onClick={this.updateEdit}
                                variant="danger"
                                >
                                {this.state.buttonValue}
                            </Button>
                        </Row>
                    </Col>
                </Row>
                </Container>

                <div id="spacer2"></div>

                <Row>
                    <CanvasJSChart options={
                        {
                            title:{
                              text: (String(this.props.currentPart.partName) + " Inventory"),
                              fontFamily: "tahoma",
                          },
                          axisX:{
                              title: "",
                              gridThickness: 1
                          },
                          axisY: {
                              title: "Inventory Count"
                          },
                          data: [
                          {        
                              type: "area",
                              fillOpacity: .1, 
                              dataPoints: this.state.data,
                          }
                          ]
                      }
                    }/>
                </Row>

                <div id="spacer2"></div>

                <Row className="justify-content-md-end">
                    <Button variant="danger">
                        Export data to .csv
                    </Button>
                </Row>

                <div id="spacer"></div>
                    

                <Container> 
                    <Row>
                        <h5>To delete data, type "delete" and click the delete button.</h5>
                    </Row>
                    <Row>
                        <p>Warning: If you delete this data, it will be lost.</p>
                    </Row>
                    <Row>
                        <InputGroup className="mb-3">
                          <FormControl
                            placeholder=""
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            onChange={this.updateDelete}
                          />
                          <InputGroup.Append>
                            <Button variant="outline-secondary"
                            onClick={this.deleteEntry}
                            value={'Delete'}
                            >
                              Delete</Button>
                          </InputGroup.Append>
                        </InputGroup>
                    </Row>
                </Container>

                <div id="bottom_spacer"></div>

            </Container>
            ):(
                <Container>
                <Row>
                    <Button variant="danger" size='sm' onClick={this.goToDash}><FontAwesomeIcon icon={faArrowLeft}/></Button>
                </Row>
                <div id="spacer2"></div>
                <Row>
                    <h3>{this.props.currentPart.partName} - ({this.props.currentPart.partId})</h3>
                </Row>
                <Row>
                    <h5 className="company_info">Company: {this.props.currentPart.companyName}</h5>
                </Row>
                <Row>
                    <h5 className="company_info">Company Id: {this.props.currentPart.companyId}</h5>
                </Row>

                <div id="spacer2"></div>

                <Row>
                    <CanvasJSChart options={
                        {
                            title:{
                              text: (String(this.props.currentPart.companyName) + ": " + String(this.props.currentPart.partName) + " Inventory"),
                              fontFamily: "tahoma",
                          },
                          axisX:{
                              title: "",
                              gridThickness: 1
                          },
                          axisY: {
                              title: "Inventory Count"
                          },
                          data: [
                          {        
                              type: "area",
                              fillOpacity: .1, 
                              dataPoints: this.state.data,
                          }
                          ]
                      }
                    }/>
                </Row>

                <div id="spacer2"></div>

                <Row className="justify-content-md-end">
                    <Button variant="danger">
                        Export data to .csv
                    </Button>
                </Row>

                <div id="bottom_spacer"></div>
            </Container>
            )}
            
        </div>
      )
  }
}

export default connect(mapStateToProps, { updatePart, deletePart })(Part);