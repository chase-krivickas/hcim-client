import { Auth } from "aws-amplify";
import axios from 'axios'; 

export const ROOT_URL = 'https://caqh36ldh2.execute-api.us-east-2.amazonaws.com/dev';

// keys for actiontypes
export const ActionTypes = {
    AUTH_USER: 'AUTH_USER',
    REAUTH_USER: 'REAUTH_USER',
    DEAUTH_USER: 'DEAUTH_USER',
    AUTH_ERROR: 'AUTH_ERROR',
    FETCH_PARTS: 'FETCH_PARTS',
    DO_NOTHING: 'DO_NOTHING',
    CLEAR_PARTS: 'CLEAR_PARTS',
    VIEW_PART: 'VIEW_PART',
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
        // history.push('/signup');
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
        // history.push('/confirmation');
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
        // history.push('/confirmation');
      }).catch(err => {
        // error
        alert(err.message);
        dispatch(authError(err));
        history.go(0);
        // history.push('/confirmation');
      });
  }
}

export function forgotPassword({ username }, history) {
  return function(dispatch) {
    Auth.forgotPassword(username)
      .then(response => {
        // success
        console.log("code sent");
        console.log(response);
        // history.push('/login');
      }).catch(err => {
        // error
        alert(err.message);
        dispatch(authError(err));
        history.go(0);
        // history.push('/forgotPassword');
      });
  }
}

export function resetPassword({ username, code, password }, history) {
  return function(dispatch) {
    Auth.forgotPasswordSubmit(username, code, password)
      .then(response => {
        // success
        console.log("password reset");
        console.log(response);
        history.push('/login');
      }).catch(err => {
        // error
        alert(err.message);
        dispatch(authError(err));
        history.go(0);
        // history.push('/forgotPassword');
      });
  }
}

export function changePassword({ oldPassword, newPassword }, history) {
  return function(dispatch) {
    Auth.currentAuthenticatedUser()
      .then(user => {
        Auth.changePassword(user, oldPassword, newPassword)
        .then(response => {
          // success
          console.log("password changed");
          console.log(response);
          history.push('/settings');
        }).catch(err => {
          // error
          alert(err.message);
          dispatch(authError(err));
          history.go(0);
          // history.push('/settings');
        });
      }).catch(err => console.log(err));
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
            localStorage.setItem('permissionsList', JSON.stringify(resp.data.permissionsList));
            localStorage.setItem('alertEmails', JSON.stringify(resp.data.alertEmails));
            localStorage.setItem('parts', JSON.stringify([]));
            localStorage.setItem('currentPart', JSON.stringify({}));
            history.push('/dashboard');
          })
          .catch((error) => {
            // error getting user doc
            console.log('inner');
            console.log(error);
            dispatch(authError(error));
            alert(error.message);
            history.go(0);
            // history.push('/login');
          });
      }).catch(err => {
        // error logging in
        console.log("outer");
        if (err.code === "UserNotConfirmedException") {
          history.push('/confirmation');
        } else {
          dispatch(authError(err));
          alert(err.message);
          history.go(0);
          // history.push('/login');
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
    localStorage.setItem('parts', '');
    localStorage.setItem('currentPart', '');
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
            localStorage.setItem('permissionsList', JSON.stringify(resp.data.permissionsList));
            localStorage.setItem('alertEmails', JSON.stringify(resp.data.alertEmails));
            history.go(0);
            // history.push('/settings');
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

export function createPart( { companyId, partId, partName, companyName, currCount, minCount, alertEmails }, history) {
  return function (dispatch) {
    const data = {
      companyId: companyId,
      companyName: companyName,
      partId: partId,
      partName: partName,
      currCount: parseInt(currCount),
      minCount: parseInt(minCount),
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
        // history.push('/add');
        console.log(error);
      });
  }
}
 

export function fetchParts( { permissionsList, roleName } ) {
  return function (dispatch) {
    if (roleName === "Hypertherm") {
      // hypertherm 
      axios.get(`${ROOT_URL}/inv/gettable`)
        .then((response) => {
          // success
          console.log(response.data);
          dispatch({ type: ActionTypes.FETCH_PARTS, payload: response.data });
          localStorage.setItem('parts', JSON.stringify(response.data));
        })
        .catch((error) => {
          // error
          alert(error);
          console.log(error);
        });
    } else {
      // customer or reseller
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
          localStorage.setItem('parts', JSON.stringify(response_array));
        }))
        .catch((error) => {
          alert(error);
          console.log(error);
        });
      }
  }
}

export function viewPart(part, history) {
  return function (dispatch) {
    dispatch({ type: ActionTypes.VIEW_PART, payload: part });
    localStorage.setItem('currentPart', JSON.stringify(part));
    history.push('/part');
  }
}

export function updatePart( { currCount, minCount, companyId, partId }, history) {
  return function (dispatch) {
    const data = {
      currCount: parseInt(currCount),
      minCount: parseInt(minCount),
    }
    axios.put(`${ROOT_URL}/inv/update/${companyId}/${partId}`, data)
      .then((response) => {
        // success
        console.log(response);
        history.push('/dashboard');
      })
      .catch((error) => {
        // error
        alert(error);
        console.log(error);
      });
  }
}

export function deletePart( { companyId, partId }, history) {
  return function (dsipatch) {
    axios.delete(`${ROOT_URL}/inv/${companyId}/${partId}`)
      .then((response) => {
        // success
        console.log(response);
        history.push('/dashboard');
      })
      .catch((error) => {
        // error
        alert(error);
        console.log(error);
      });
  }
}

