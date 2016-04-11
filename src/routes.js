import React from 'react';
import {IndexRoute, Route} from 'react-router';
import { isLoaded as isAuthLoaded, loadAuthCookie } from 'actions/auth';
import {
    App,
    HomePage,
    LoginSuccessPage,
    NotFoundPage,
  } from 'containers';

export default (store) => {
  const checkAuthLoaded = callback => {
    if (!isAuthLoaded(store.getState())) {
      const promises = [];
      promises.push(store.dispatch(loadAuthCookie()));
      Promise.all(promises).then(callback);
    } else {
      callback();
    }
  };

  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      if (!user) {
        // oops, not logged in, so can't be here!
        replace('/');
      }
      cb();
    }

    checkAuthLoaded(checkAuth);
  };

  const requireNoLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      if (user) {
        // oops, not logged in, so can't be here!
        replace('/loginSuccess');
      }
      cb();
    }
    checkAuthLoaded(checkAuth);
  };

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={HomePage} onEnter={requireNoLogin}/>

      { /* Routes requiring login */ }
      <Route onEnter={requireLogin}>
        <Route path="loginSuccess" component={LoginSuccessPage}/>
      </Route>

      { /* Catch all route */ }
      <Route path="*" component={NotFoundPage} status={404} />
    </Route>
  );
};
