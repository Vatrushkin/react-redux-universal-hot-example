import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { isLoaded as isAuthLoaded, loadAuthCookie } from 'actions/auth';
import { routeActions } from 'react-router-redux';
import config from '../../config';
import { asyncConnect } from 'redux-async-connect';

// for material ui
import injectTabEventPlugin from 'react-tap-event-plugin';
injectTabEventPlugin();

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];

    if (!isAuthLoaded(getState())) {
      promises.push(dispatch(loadAuthCookie()));
    }

    return Promise.all(promises);
  }
}])
@connect(
  state => ({
    user: state.auth.user,
    pathname: state.routing.location.pathname
  }),
  {pushState: routeActions.push})
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    pathname: PropTypes.string,
    pushState: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      this.props.pushState('/loginSuccess');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState('/');
    }
  }

  render() {
    const styles = require('./App.scss');

    return (
      <div>
        <Helmet {...config.app.head}/>

        <div className={styles.appContent}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
