import React from "react";
import Home from "./Home";
import NotFound from "./NotFound";
import Login from "./Login";
import Logout from "./Logout";
import Navigation from "./Navbar";
import Dashboard from "./Dashboard";
import PrivateRoute from "./PrivateRoute";
import Part from "./Part";
import Settings from "./Settings";
import Add from "./Add"
import Signup from "./Signup";
import Confirmation from "./Confirmation";
import ForgotPassword from "./ForgotPassword";
import ChangePassword from "./ChangePassword";
import "../css/App.css";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App container py-3">
        <Navigation />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/confirmation" component={Confirmation} />
          <Route path="/forgotPassword" component={ForgotPassword} />
          <PrivateRoute path="/logout" component={Logout} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/settings" component={Settings} />
          <PrivateRoute path="/add" component={Add} />
          <PrivateRoute path="/part" component={Part} />
          <PrivateRoute path="/changePassword" component={ChangePassword} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
