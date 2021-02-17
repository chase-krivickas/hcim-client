import { Auth } from "aws-amplify";
import axios from 'axios'; 

export const ROOT_URL = 'https://caqh36ldh2.execute-api.us-east-2.amazonaws.com/dev';

// keys for actiontypes
export const ActionTypes = {
    AUTH_USER: 'AUTH_USER',
    DEAUTH_USER: 'DEAUTH_USER',
    AUTH_ERROR: 'AUTH_ERROR',
    FETCH_PARTS: 'FETCH_PARTS',
    DO_NOTHING: 'DO_NOTHING',
    CLEAR_PARTS: 'CLEAR_PARTS',
};

export function authError(error) {
  return {
    type: ActionTypes.AUTH_ERROR,
    message: error.message,
  };
}

export function signUpUser({ password, username, email, roleName, companyName }, history) {
  return function(dispatch) {
    Auth.signUp(username, password, email)
      .then(response => {
        // success, create company entry in database
        console.log(response);
        const data = {
          companyId: username,
          companyName: companyName,
          alertEmails: [email],
          roleName: roleName
        }
        axios.post(`${ROOT_URL}/companies/create`, data)
          .then((resp) => {
            // success
            console.log(resp);
          })
          .catch((error) => {
            // error
            console.log(error);
          });
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
        // success logging in
        //  get the user document
        axios.get(`${ROOT_URL}/companies/${username}`)
          .then((resp) => {
            // success getting user doc
            console.log(resp);
            dispatch({ type: ActionTypes.AUTH_USER, payload: resp.data });
            localStorage.setItem('authtoken', response.signInUserSession.accessToken.jwtToken);
            localStorage.setItem('companyId', resp.data.companyId);
            localStorage.setItem('companyName', resp.data.companyName);
            localStorage.setItem('roleName', resp.data.roleName);
            localStorage.setItem('permissionsList', resp.data.permissionsList);
            localStorage.setItem('alertEmails', resp.data.alertEmails);
            history.push('/dashboard');
          })
          .catch((error) => {
            // error getting user doc
            console.log(error);
            dispatch(authError(error));
            alert(error.message);
            history.go(0);
          });
      }).catch(err => {
        // error logging in
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
    localStorage.setItem('companyId', '');
    localStorage.setItem('companyName', '');
    localStorage.setItem('roleName', '');
    localStorage.setItem('permissionsList', '');
    localStorage.setItem('alertEmails', '');
    dispatch({ type: ActionTypes.DEAUTH_USER });
    history.push('/');
  }
}
  
export function updateCompany( { companyName, roleName, addEmail, removeEmail, addPermission, removePermission }, history ) {
  return function(dispatch) {
    const username = localStorage.getItem('companyId');
    const data = {
      companyName: companyName,
      roleName: roleName,
      addEmail: addEmail,
      removeEmail: removeEmail,
      addPermission: addPermission,
      removePermission: removePermission, 
    };
    axios.put(`${ROOT_URL}/companies/update/${username}`, data)
      .then((response) => {
        // success updating
        console.log(response);
        axios.get(`${ROOT_URL}/companies/${username}`)
          .then((resp) => {
            // success getting user doc
            console.log(resp);
            dispatch({ type: ActionTypes.AUTH_USER, payload: resp.data });
            localStorage.setItem('companyId', resp.data.companyId);
            localStorage.setItem('companyName', resp.data.companyName);
            localStorage.setItem('roleName', resp.data.roleName);
            localStorage.setItem('permissionsList', resp.data.permissionsList);
            localStorage.setItem('alertEmails', resp.data.alertEmails);
            history.go(0);
          })
          .catch((error) => {
            // error getting user doc
            console.log(error);
            alert(error.message);
          });
      })
      .catch((err) => {
        // error updating
        console.log(err);
        alert(err);
      });
  }
}

export function createPart( { companyId, partId, partName, currCount, minCount, alertEmails }, history) {
  return function (dispatch) {
    const data = {
      companyId: companyId,
      partId: partId,
      partName: partName,
      currCount: currCount,
      minCount: minCount,
      alertEmails: alertEmails,
    }
    axios.post(`${ROOT_URL}/inv/create`, data)
      .then((response) => {
        // success
        console.log(response);
        dispatch({ type: ActionTypes.DO_NOTHING});
        history.push('/dashboard');
      })
      .catch((error) => {
        // error
        alert(error);
        history.go(0);
        console.log(error);
      });
  }
}
 

export function fetchParts( { permissionsList } ) {
  return function (dispatch) {
    let axiosArray = [];
    var i;
    for (i = 0; i < permissionsList.length; i++) {
      let newPromise = axios.get(`${ROOT_URL}/inv/${permissionsList[i]}`);
      axiosArray.push(newPromise);
    }

    axios.all(axiosArray)
      .then(axios.spread((...responses) => {
        console.log('here');
        let response_array = []
        responses.forEach((res) => {
          res.data.forEach((r) => {
            response_array.push(r);
          });
        });
        dispatch({ type: ActionTypes.FETCH_PARTS, payload: response_array });
        console.log(response_array);
      }))
      .catch((error) => {
        alert(error);
        console.log(error);
      });
  }
}


