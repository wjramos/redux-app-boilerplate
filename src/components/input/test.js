jest.unmock('./');

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Input from './';

describe('Input', () => {
  const props = {
    type: 'text',
    placeholder: 'text',
    onChange: () => {},
  };

  const input = TestUtils.renderIntoDocument(
    <Input {...props} />
  );

  const component = TestUtils.scryRenderedComponentsWithType(input, Input);


  it('renders', () => {
    expect(component.length).toEqual(1);
  });
});
