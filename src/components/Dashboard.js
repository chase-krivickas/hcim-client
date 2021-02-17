import { Component } from "react";
import React from "react";
import "../css/Settings.css";
import { connect } from 'react-redux';
import Button from "react-bootstrap/Button";
import { fetchParts } from '../actions/index';


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

  render() {
      return(
        <div>
          <Button
            onClick={this.goToAdd}
          >
            Add Part for Tracking
          </Button>
          <p>
            {JSON.stringify(this.props.parts)}
          </p>
        </div>
      )
  }
}

export default connect(mapStateToProps, { fetchParts })(Dashboard);