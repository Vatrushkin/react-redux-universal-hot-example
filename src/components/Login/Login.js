import React, { Component, PropTypes} from 'react';

import {Paper, TextField, RaisedButton} from 'material-ui';

export default class Login extends Component {
  static propTypes = {
    login: PropTypes.func
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const username = this.refs.username.getValue();
    const password = this.refs.password.getValue();

    this.props.login(username, password);
  }

  render() {
    const styles = require('./Login.scss');
    return (
      <div className={styles.loginForm}>
        <h1>Home page</h1>
        <Paper className={styles.loginField} zDepth={2}>
          <TextField
            hintText="Username Field"
            floatingLabelText="Username"
            ref="username"
            fullWidth
          />
          <br/>
          <TextField
            hintText="Password Field"
            floatingLabelText="Password"
            ref="password"
            type="password"
            fullWidth
          />
          <br/>
          <RaisedButton style={{'marginTop': '1em'}}
                        label="Login"
                        onClick={this.handleSubmit}
                        primary
                        fullWidth />
        </Paper>
      </div>
    );
  }
}
