jest.unmock('./');

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Table from './';

describe('Table', () => {
  const props = {
    labels: ['b'],
    rows: [
      {a: 1},
      {a: 2},
      {a: 3},
    ],
  };

  const renderer = TestUtils.createRenderer();
  renderer.render(<Table {...props} />);
  const result = renderer.getRenderOutput();

  it('shows table', () => {
    expect(result.type).toBe('table');
  });
  it('has head and body', () => {
    expect(result.props.children.length).toEqual(2);
  });
  it('pulls label from object keys if not specified', () => {
    expect(result.props.children[0]).toEqual(2);
  });
});
