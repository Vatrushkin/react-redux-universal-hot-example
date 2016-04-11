export const LOAD = 'auth/LOAD';
export const LOAD_SUCCESS = 'auth/LOAD_SUCCESS';
export const LOAD_FAIL = 'auth/LOAD_FAIL';
export const LOAD_AUTH_COOKIE = 'auth/LOAD_AUTH_COOKIE';
export const LOGIN = 'auth/LOGIN';
export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
export const LOGIN_FAIL = 'auth/LOGIN_FAIL';
export const LOGOUT = 'auth/LOGOUT';
export const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS';
export const LOGOUT_FAIL = 'auth/LOGOUT_FAIL';

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client, ctx) => client.get('/Admins/checkAuth', {...ctx})
  };
}

export function login(username, password) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => client.post('/Admins/login', {
      data: {
        username: username,
        password: password
      }
    })
  };
}

export function loadAuthCookie() {
  return {
    type: LOAD_AUTH_COOKIE
  };
}

export function loadAuth() {
  return (dispatch) => {
    dispatch(loadAuthCookie());
  };
}

export function logout() {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: (client, ctx) => client.get('/Admins/logout', {...ctx})
  };
}
