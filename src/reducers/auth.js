import cookie from 'react-cookie';

import {LOAD,
  LOAD_SUCCESS,
  LOAD_FAIL,
  LOAD_AUTH_COOKIE,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL} from '../actions/auth';

const initialState = {
  loaded: false
};

function getUserFromAction(action) {
  const user = {};
  if (!action) return user;

  user.id = action.result.userId;
  user.accessToken = action.result.id;
  if (action.result.username) user.username = action.result.username;

  return user;
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        user: getUserFromAction(action)
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case LOGIN:
      return {
        ...state,
        loggingIn: true
      };
    case LOGIN_SUCCESS:
      const user = getUserFromAction(action);
      cookie.save('loginResult', user);
      return {
        ...state,
        loggingIn: false,
        user
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        user: null,
        loginError: action.error
      };
    case LOAD_AUTH_COOKIE:
      const loginResult = cookie.load('loginResult');
      return {
        ...state,
        loading: false,
        loaded: true,
        user: loginResult
      };
    case LOGOUT:
      return {
        ...state,
        loggingOut: true
      };
    case LOGOUT_SUCCESS:
      cookie.remove('loginResult');
      return {
        ...state,
        loggingOut: false,
        user: null
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        logoutError: action.error
      };
    default:
      return state;
  }
}

