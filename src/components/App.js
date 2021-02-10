import React from "react";
import Home from "./Home";
import NotFound from "./NotFound";
import Login from "./Login";
import Navigation from "./Navbar";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import "../css/App.css";
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom';


// const Navigation = (props) => {
//   return(
//     <div>
//       <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
//         <LinkContainer to="/">
//           <Navbar.Brand className="font-weight-bold text-muted">
//             Hypertherm
//           </Navbar.Brand>
//         </LinkContainer>
//         <Navbar.Toggle />
//         <Navbar.Collapse className="justify-content-end">
//           <Nav activeKey={window.location.pathname}>
//             <LinkContainer to="/signup">
//               <Nav.Link>Signup</Nav.Link>
//             </LinkContainer>
//             <LinkContainer to="/login">
//               <Nav.Link>Login</Nav.Link>
//             </LinkContainer>
//           </Nav>
//         </Navbar.Collapse>
//       </Navbar>
//     </div>
//   );
// };

function App() {
  return (
    <Router>
      <div className="App container py-3">
        <Navigation />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;


    // <div className="App container py-3">
    //   <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
    //     <LinkContainer to="/">
    //       <Navbar.Brand className="font-weight-bold text-muted">
    //         Hypertherm
    //       </Navbar.Brand>
    //     </LinkContainer>
    //     <Navbar.Toggle />
    //     <Navbar.Collapse className="justify-content-end">
    //       <Nav activeKey={window.location.pathname}>
    //         <LinkContainer to="/signup">
    //           <Nav.Link>Signup</Nav.Link>
    //         </LinkContainer>
    //         <LinkContainer to="/login">
    //           <Nav.Link>Login</Nav.Link>
    //         </LinkContainer>
    //       </Nav>
    //     </Navbar.Collapse>
    //   </Navbar>
    //   <Routes />
    // </div>