import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../css/Login.css";
import { Auth } from "aws-amplify";
import { Component } from "react";
import { connect } from 'react-redux';
import { loginUser } from '../actions/index';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      emptyFields: false,
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (!this.state.password || !this.state.username) {
      this.setState({ emptyFields: true});
    } else {
      const data = {
        password: this.state.password,
        username: this.state.username,
      };
      this.setState({ emptyFields: false });
      this.props.loginUser(data, this.props.history);
    }
  }

  // handleSubmit = (event) => {
  //   event.preventDefault();

  //   Auth.signIn(this.state.username, this.state.password)
  //         .then(user => {
  //           alert("logged in");
  //           console.log(user)

  //         })
  //         .catch(err => {
  //           alert(err.message);
  //           console.log(err);
  //         }); 
  // };

  updateUsername = (event) => {
    this.setState({ username: event.target.value });
  }

  updatePassword = (event) => {
    this.setState({ password: event.target.value });
  }



  render() {
    return (
      <div className="Login">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group size="lg" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              autoFocus
              type="username"
              value={this.state.username}
              onChange={this.updateUsername}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={this.state.password}
              onChange={this.updatePassword}
            />
          </Form.Group>
          <Button block size="lg" type="submit">
            Login
          </Button>
        </Form>
      </div>
    );
  }
}

export default connect(null, { loginUser })(Login);

// export default function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   function validateForm() {
//     return username.length > 0 && password.length > 0;
//   }

//   async function handleSubmit(event) {
//     event.preventDefault();
  
//     try {
//       await Auth.signIn(username, password);
//       alert("Logged in");
//     } catch (e) {
//       alert(e.message);
//     }
//   }

//   return (
//     <div className="Login">
//       <Form onSubmit={handleSubmit}>
//         <Form.Group size="lg" controlId="username">
//           <Form.Label>Username</Form.Label>
//           <Form.Control
//             autoFocus
//             type="username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         </Form.Group>
//         <Form.Group size="lg" controlId="password">
//           <Form.Label>Password</Form.Label>
//           <Form.Control
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </Form.Group>
//         <Button block size="lg" type="submit" disabled={!validateForm()}>
//           Login
//         </Button>
//       </Form>
//     </div>
//   );
// }