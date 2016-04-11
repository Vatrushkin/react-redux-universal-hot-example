import React from 'react';
import ReactDOM from 'react-dom';

import {renderIntoDocument} from 'react-addons-test-utils';
import {expect} from 'chai';

import {Login} from 'components';

describe('Login component', () => {
  const renderer = renderIntoDocument(
    <Login login={() => {}} />
  );
  const dom = ReactDOM.findDOMNode(renderer);

  it('should render correctly', () => {
    return expect(renderer).to.be.ok;
  });

  it('should render with a header', () => {
    const text = dom.getElementsByTagName('h1')[0].textContent;
    expect(text).to.be.a('string');
  });
});
