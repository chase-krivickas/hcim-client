import { Auth } from "aws-amplify";

// keys for actiontypes
export const ActionTypes = {
    AUTH_USER: 'AUTH_USER',
    DEAUTH_USER: 'DEAUTH_USER',
    AUTH_ERROR: 'AUTH_ERROR',
};

export function authError(error) {
  return {
    type: ActionTypes.AUTH_ERROR,
    message: error.message,
  };
}

export function signUpUser({ password, username, email }, history) {
  return function(dispatch) {
    Auth.signUp(username, password, email)
      .then(response => {
        // success
        console.log(response);
        history.push('/confirmation');
      }).catch(err => {
        // error
        alert(err.message);
        dispatch(authError(err));
        history.go(0);
      });
  }
}

export function confirmUser({ email, confirmationCode, username }, history) {
  return function(dispatch) {
    console.log(username);
    console.log(confirmationCode);
    Auth.confirmSignUp(username, confirmationCode)
      .then(response => {
        // success
        console.log(response);
        history.push('/login');
      }).catch(err => {
        // error
        alert(err.message);
        dispatch(authError(err));
        history.go(0);
      });
  }
}

export function resendConfirmationCode({ email, username }, history) {
  return function(dispatch) {
    Auth.resendSignUp(username)
      .then(response => {
        // success
        console.log(response);
        alert("Confirmation code was sent to " + email);
        history.go(0);
      }).catch(err => {
        // error
        alert(err.message);
        dispatch(authError(err));
        history.go(0);
      });
  }
}

export function loginUser({ password, username }, history) {
  return function(dispatch) {
    Auth.signIn(username, password)
      .then(response => {
        // success
        dispatch({ type: ActionTypes.AUTH_USER });
        localStorage.setItem('authtoken', response.signInUserSession.accessToken.jwtToken);
        history.push('/dashboard');
      }).catch(err => {
        // error
        if (err.code === "UserNotConfirmedException") {
          history.push('/confirmation');
        } else {
          dispatch(authError(err));
          alert(err.message);
          history.go(0);
        }
      });
  };
}

export function logoutUser( history ) {
  return function(dispatch) {
    localStorage.setItem('authtoken', '');
    dispatch({ type: ActionTypes.DEAUTH_USER });
    history.push('/');
  }
}
  
  

