import { Component } from "react";
import React from "react";
import "../css/Settings.css";
import { connect } from 'react-redux';
import { Container, Col, Row, InputGroup, FormControl, Button } from "react-bootstrap";
import { updatePart } from '../actions/index';
import { CanvasJSChart } from 'canvasjs-react-charts';


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

  goToDash = (event) => {
    this.props.history.push('/dashboard');
  }

  render() {
      return(
        <div>
            {this.props.roleName==="Customer" ? (
                <Container>
                <Row>
                    <Button size='sm' onClick={this.goToDash}>b</Button>
                    <p>Return to dashboard.</p>
                </Row>
                <Row>
                    <h3>Part: {this.props.currentPart.partName}</h3>
                </Row>
                <Row>
                    <h5>Part Id: {this.props.currentPart.partId}</h5>
                </Row>

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

                <Row>
                    <Button>
                        Export to .csv
                    </Button>
                </Row>

                    <Row>
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
                        <Row>
                            <Button
                                onClick={this.updateEdit}
                                >
                                {this.state.buttonValue}
                            </Button>
                        </Row>
                    </Row>
            </Container>
            ):(
                <Container>
                <Row>
                    <Button size='sm' onClick={this.goToDash}>b</Button>
                    <p>Return to dashboard.</p>
                </Row>
                <Row>
                    <h3>Part: {this.props.currentPart.partName}</h3>
                </Row>
                <Row>
                    <h5>Part Id: {this.props.currentPart.partId}</h5>
                </Row>
                <Row>
                    <h5> Company Name: {this.props.currentPart.companyName}</h5>
                </Row>
                <Row>
                    <h5> Company Id: {this.props.currentPart.companyId}</h5>
                </Row>

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

                <Row>
                    <Col>
                    <Row>
                            <Button>
                                Export data to .csv
                            </Button>
                        </Row>
                    </Col>
                </Row>
            </Container>
            )}
            
        </div>
      )
  }
}

export default connect(mapStateToProps, { updatePart })(Part);