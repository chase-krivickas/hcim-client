import { Component } from "react";
import React from "react";
import "../css/PartSmallView.css";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { viewPart } from '../actions/index';

const mapStateToProps = (reduxState) => ({
    parts: reduxState.auth.parts,
    currentPart: reduxState.auth.currentPart,
  });

class PartSmallView extends Component{
  constructor(props) {
      super(props);
  
      this.state = {
        parts: [],
      };
  }

  goToPart = (event) => {
      console.log(this.props.part);
      this.props.viewPart(this.props.part, this.props.history);
  }

  render() {
      return(
        <tr className={parseInt(this.props.part.currCount) <= parseInt(this.props.part.minCount) ? 'below' : ''} onClick={this.goToPart}>
            <td>{this.props.part.partId}</td>
            <td>{this.props.part.partName}</td>
            <td>{this.props.part.currCount}</td>
            <td>{this.props.part.minCount}</td>
            <td>{this.props.part.companyName}</td>
        </tr>
      )
  }
}

export default withRouter(connect(mapStateToProps, { viewPart })(PartSmallView));