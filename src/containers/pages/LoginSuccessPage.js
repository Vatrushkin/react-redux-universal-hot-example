import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {load, logout} from 'actions/auth';

import Helmet from 'react-helmet';

import {LoginSuccess} from 'components';

@connect(
    state => ({user: state.auth.user}),
    {load, logout}
)
export default
class LoginSuccessPage extends Component {
  static propTypes = {
    user: PropTypes.object,
    load: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
  }

  handleCheckAuth = () => {
    this.props.load();
  }

  handleLogout = () => {
    this.props.logout();
  }

  render() {
    const username = this.props.user ? this.props.user.username : null;
    return (
      <div>
        <Helmet title="Login Success"/>
        <LoginSuccess username={username}
                      handleCheckAuth={this.handleCheckAuth}
                      handleLogout={this.handleLogout} />
      </div>
    );
  }
}
