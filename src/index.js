import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import config from './config';
import thunk from 'redux-thunk';
import { ActionTypes } from './actions/index';

import reducers from './reducers';

import App from './components/App';

// this creates the store with the reducers, and does some other stuff to initialize devtools
// boilerplate to copy, don't have to know
const store = createStore(reducers, {}, compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
));

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  },
  Storage: {
    region: config.s3.REGION,
    bucket: config.s3.BUCKET,
    identityPoolId: config.cognito.IDENTITY_POOL_ID
  },
  API: {
    endpoints: [
      {
        name: "inventory",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      },
    ]
  }
});

const token = localStorage.getItem('authtoken');

if (token) {
  const resp = {
    companyId: localStorage.getItem('companyId'),
    companyName: localStorage.getItem('companyName'),
    roleName: localStorage.getItem('roleName'),
    permissionsList: localStorage.getItem('permissionsList'),
    alertEmails: localStorage.getItem('alertEmails'),
    parts: JSON.parse(localStorage.getItem('parts')) || [],
    currentPart: JSON.parse(localStorage.getItem('currentPart')) || {},
  };
  store.dispatch({ type: ActionTypes.REAUTH_USER, payload: resp });
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'));
