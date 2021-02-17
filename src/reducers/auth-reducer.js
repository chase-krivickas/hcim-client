import { ActionTypes } from '../actions';

const initialState = {
  authenticated: false,
  companyId: null,
  companyName: null,
  roleName: null,
  permissionsList: [],
  alertEmails: null,
  parts: [],
  currentPart: {},
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_USER:
      return { ...state, authenticated: true, companyName: action.payload.companyName,
        companyId: action.payload.companyId, roleName: action.payload.roleName, permissionsList: action.payload.permissionsList,
        alertEmails: action.payload.alertEmails };
    case ActionTypes.DEAUTH_USER:
      return { authenticated: false, companyId: null, companyName: null, roleName: null, permissionsList: [], alertEmails: null, parts: [], currentPart: {} };
    case ActionTypes.FETCH_PARTS:
      return { ...state, parts: action.payload };
    case ActionTypes.VIEW_PART:
      return { ...state, currentPart: action.payload };
    case ActionTypes.DO_NOTHING:
      return { ...state };
    case ActionTypes.AUTH_ERROR:
      return { authenticated: false };
    default:
      return state;
  }
};

export default AuthReducer;