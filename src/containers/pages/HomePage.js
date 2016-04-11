import React, { Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {Login} from 'components';

import {connect} from 'react-redux';
import {login} from 'actions/auth';

@connect(
  state => ({user: state.auth.user}),
  {login}
)
export default class HomePage extends Component {
  static propTypes = {
    login: PropTypes.func
  }

  handleLogin = (username, password) => {
    this.props.login(username, password);
  }

  render() {
    return (
      <div>
        <Helmet title="Home"/>
        <Login login={this.handleLogin}/>
      </div>
    );
  }
}
