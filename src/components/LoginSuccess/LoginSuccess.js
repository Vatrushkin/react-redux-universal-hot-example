import React, {Component, PropTypes} from 'react';
import {RaisedButton} from 'material-ui';

export default
class LoginSuccess extends Component {
  static propTypes = {
    username: PropTypes.string,
    handleCheckAuth: PropTypes.func.isRequired,
    handleLogout: PropTypes.func.isRequired
  }

  handleCheckAuth = (event) => {
    event.preventDefault();

    this.props.handleCheckAuth();
  }

  handleLogout = (event) => {
    event.preventDefault();

    this.props.handleLogout();
  }

  render() {
    const username = this.props.username;
    return (
      <div className="container">
        <h1>Login Success</h1>
        <RaisedButton label="Check auth"
                      onClick={this.handleCheckAuth}
                      primary/>
        { username ?
          <p>{username}</p>
          : null
        }
        <br />
        <br />
        <RaisedButton label="Logout"
                      onClick={this.handleLogout} />

      </div>
    );
  }
}
