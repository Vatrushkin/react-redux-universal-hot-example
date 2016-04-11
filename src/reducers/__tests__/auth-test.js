import {expect} from 'chai';

import {LOGIN_SUCCESS} from 'actions/auth';
import auth from 'reducers/auth';

describe('Auth reducer', () => {
  it('should create user on login success', () => {
    const state = {};
    const action = {
      type: LOGIN_SUCCESS,
      result: {
        userId: '123',
        id: 'token'
      }
    };
    const newState = auth(state, action);
    expect(newState).to.deep.equal({
      loggingIn: false,
      user: {
        id: '123',
        accessToken: 'token'
      }
    });
  });
});
