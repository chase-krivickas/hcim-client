import React from "react";
import "../css/Home.css";
import logo from "../media/Hypertherm-logo2.png";
import { Container, Row, Button } from "react-bootstrap";
import { connect } from 'react-redux';
import { Component } from "react";

const mapStateToProps = (reduxState) => ({
  isAuthenticated: reduxState.auth.authenticated,
});

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  goToSignUp = (event) => {
    this.props.history.push('/signup');
  }

  goToLogIn = (event) => {
    this.props.history.push('/login');
  }

  render() {
    return (
      <div className="Home">
        <div className="lander">
          <img id="main_logo" src={logo} alt="Hypertherm logo"/>
          <h1 id="sub" className="text-muted">Consumable Inventory Manager</h1>
        </div>

        { this.props.isAuthenticated ? (
          <>
          </>
        ):(
          <>
          <Container id="auth_cont">
            <Row className="justify-content-md-center">
              <Button onClick={this.goToLogIn} variant="danger" size="lg" id="button">Log In</Button>
            </Row>
            <Row className="justify-content-md-center">
              <p id="signup" onClick={this.goToSignUp}><u>Sign Up</u></p>
            </Row>
          </Container>
          </>
        )}
        
      </div>
    );
  }

}

export default connect(mapStateToProps, {  })(Home);