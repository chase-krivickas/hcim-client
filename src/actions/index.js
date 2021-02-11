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

export function loginUser({ password, username }, history) {
  return function(dispatch) {
    Auth.signIn(username, password)
      .then(response => {
        // success
        dispatch({ type: ActionTypes.AUTH_USER });
        console.log(response.signInUserSession.accessToken.jwtToken);
        localStorage.setItem('authtoken', response.signInUserSession.accessToken.jwtToken);
        history.push('/dashboard');
      }).catch(err => {
        // error
        alert(err.message);
        dispatch(authError(err));
        history.go(0);
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
  
  

