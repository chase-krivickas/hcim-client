import { ActionTypes } from '../actions';

const initialState = {
  authenticated: false,
  companyId: null,
  companyName: null,
  role: null,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_USER:
      return { authenticated: true, author: action.payload };
    case ActionTypes.DEAUTH_USER:
      return { authenticated: false, author: null };
    case ActionTypes.AUTH_ERROR:
      return { authenticated: false, author: null };
    default:
      return state;
  }
};

export default AuthReducer;