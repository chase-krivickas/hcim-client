import { Component } from "react";
import React from "react";
import "../css/Settings.css";
import { connect } from 'react-redux';



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
  
      this.state = {
        parts: [],
      };
  }



  render() {
      return(
        <div>
            part
        </div>
      )
  }
}

export default connect(mapStateToProps, {  })(Part);