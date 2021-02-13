/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Redirect } from 'react-router-dom';

const mapStateToProps = (reduxState) => ({
    isAuthenticated: reduxState.auth.authenticated,
});

// Router Wrapper
const PrivateRoute = ({ component: Child, ...props }) => {
// some stuff goes here
  return (
    <Route
      {...props}
      render={(routeProps) => (props.isAuthenticated ? (
        <Child {...routeProps} />
      ) : (
        <Redirect to="/login" />
      ))}
    />
  );
};

export default withRouter(connect(mapStateToProps, null)(PrivateRoute));