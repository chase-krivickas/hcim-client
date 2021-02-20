import { Component } from "react";
import React from "react";
import "../css/Settings.css";
import { connect } from 'react-redux';
import { Container, Row, InputGroup, FormControl } from "react-bootstrap";
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

            {this.props.roleName!=="Customer" ? (
              <>
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
          </>
            ):(
              <>
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
              </>
            )}
            </div>
            



          // <div>
          //   <div className="lander">
          //     <h1>Account Settings</h1>
          //   </div>
          // {!this.state.edit ? (
          //   <div>
          //     <button
          //       onClick={this.updateEdit}>
          //       Edit
          //     </button>
          //   </div>
          // ) : (
          //   <div>
          //   <Container>
          //     <Row>
          //       <h1>{this.state.space}</h1>
          //     </Row>
          //     <Row>
          //       <h5>Current Company Name: {this.props.companyName}</h5>
          //     </Row>
          //     <Row>
          //       <h4> </h4>
          //     </Row>
          //   </Container>
          //   <InputGroup className="mb-3">
          //     <FormControl
          //       placeholder="New name of company"
          //       aria-label="Recipient's username"
          //       aria-describedby="basic-addon2"
          //       onChange={this.updateCompanyName}
          //     />
          //     <InputGroup.Append>
          //       <Button variant="outline-secondary"
          //       onClick={this.submitChange}
          //       value={'companyName'}
          //       >
          //         Change</Button>
          //     </InputGroup.Append>
          //   </InputGroup>

          //   <Container>
          //     <Row>
          //       <h1>{this.state.space}</h1>
          //     </Row>
          //     <Row>
          //       <h4>Current Role: {this.props.roleName}</h4>
          //     </Row>
          //     <Row>
          //       <h4> </h4>
          //     </Row>
          //     <Row>
          //       <Col>
          //         <Button active={false} variant="Light" disabled={false}>Select different role:</Button>
          //       </Col>
          //       <Col>
          //         <ToggleButtonGroup aria-label="Basic example" type="radio" name="options">
          //           <ToggleButton variant="outline-secondary" value="Hypertherm" onClick={this.updateRoleName}>Hypertherm</ToggleButton>
          //           <ToggleButton variant="outline-secondary" value="Reseller" onClick={this.updateRoleName}>Reseller</ToggleButton>
          //           <ToggleButton variant="outline-secondary" value="Customer" onClick={this.updateRoleName}>Customer</ToggleButton>
          //         </ToggleButtonGroup>
          //       </Col>
          //       <Col>
          //         <Button
          //           value="roleName"
          //           onClick={this.submitChange}
          //         >
          //           Change
          //         </Button>
          //       </Col>
          //     </Row>
          //   </Container>
            

          //   <Container>
          //     <Row>
          //       <h1>{this.state.space}</h1>
          //     </Row>
          //     <Row>
          //       <h5>List of emails that will be alerted when inventory is low:</h5>
          //     </Row>
          //     <Row>
          //       <p> </p>
          //     </Row>
          //     <Row>
          //       {/* <p>{this.state.alertEmails.split(',').map((x) => `${x}`).join(', ')}</p> */}
          //       <p>{this.props.alertEmails}</p>
          //     </Row>
          //     <Row>
          //       <p> </p>
          //     </Row>
          //   </Container>
          //   <InputGroup className="mb-3">
          //     <FormControl
          //       placeholder="enter email to add (example@example.com)"
          //       aria-label="Recipient's username"
          //       aria-describedby="basic-addon2"
          //       onChange={this.updateAddEmail}
          //     />
          //     <InputGroup.Append>
          //       <Button variant="outline-secondary"
          //       onClick={this.submitChange}
          //       value={'addEmail'}
          //       >
          //         Add</Button>
          //     </InputGroup.Append>
          //   </InputGroup>
          //   <InputGroup className="mb-3">
          //     <FormControl
          //       placeholder="enter email to remove (example@example.com)"
          //       aria-label="Recipient's username"
          //       aria-describedby="basic-addon2"
          //       onChange={this.updateRemoveEmail}
          //     />
          //     <InputGroup.Append>
          //       <Button variant="outline-secondary"
          //       onClick={this.submitChange}
          //       value={'removeEmail'}
          //       >
          //         Remove</Button>
          //     </InputGroup.Append>
          //   </InputGroup>

          //   <Container>
          //     <Row>
          //       <h1>{this.state.space}</h1>
          //     </Row>
          //     <Row>
          //       <h5>List of company ids that you have permission to see:</h5>
          //     </Row>
          //     <Row>
          //       <p> </p>
          //     </Row>
          //     <Row>
          //       {/* <p>{this.state.permissionsList.split(',').map((x) => `${x}`).join(', ')}</p> */}
          //       <p>{this.props.permissionsList}</p>
          //     </Row>
          //     <Row>
          //       <p> </p>
          //     </Row>
          //   </Container>
          //   <InputGroup className="mb-3">
          //     <FormControl
          //       placeholder="company id to add"
          //       aria-label="Recipient's username"
          //       aria-describedby="basic-addon2"
          //       onChange={this.updateAddPermission}
          //     />
          //     <InputGroup.Append>
          //       <Button variant="outline-secondary"
          //       onClick={this.submitChange}
          //       value={'addPermission'}
          //       >
          //         Add</Button>
          //     </InputGroup.Append>
          //   </InputGroup>
          //   <InputGroup className="mb-3">
          //     <FormControl
          //       placeholder="company id to remove"
          //       aria-label="Recipient's username"
          //       aria-describedby="basic-addon2"
          //       onChange={this.updateRemovePermission}
          //     />
          //     <InputGroup.Append>
          //       <Button variant="outline-secondary"
          //       onClick={this.submitChange}
          //       value={'removePermission'}
          //       >
          //         Remove</Button>
          //     </InputGroup.Append>
          //   </InputGroup>
          // </div>
          // )}
          // </div>
        )
    }
}

export default connect(mapStateToProps, { updateCompany })(Settings);