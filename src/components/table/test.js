jest.unmock('./');

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Table, { Head, Body, Row, Cell } from './';

describe('Table', () => {
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
  });

  describe('Head', () => {
    const props = {
      labels: [
        'a',
        'b',
        'c',
      ],
    };

    const renderer = TestUtils.createRenderer();
    renderer.render(<Head {...props} />);
    const result = renderer.getRenderOutput();

    it('has correct number of labels', () => {
      expect(result.props.children.props.row.length).toEqual(props.labels.length);
    });
  });

  describe('Body', () => {
    const props = {
      rows: [
        {a: 1},
        {a: 2},
        {a: 3},
      ],
    };

    const renderer = TestUtils.createRenderer();
    renderer.render(<Body {...props} />);
    const result = renderer.getRenderOutput();

    it('has correct number of rows', () => {
      expect(result.props.children.length).toEqual(props.rows.length);
    });
  });

  describe('Row', () => {
    const props = {
      row: {
        a: 1,
        b: 2,
        c: 3
      },
    };

    const renderer = TestUtils.createRenderer();
    renderer.render(<Row {...props} />);
    const result = renderer.getRenderOutput();

    it('has correct number of cells', () => {
      expect(result.props.children.length).toEqual(Object.keys(props.row).length);
    });
  });

  describe('Cell', () => {
    const props = {
      children: (
        <a href="#">Cell text</a>
      ),
    };

    const renderer = TestUtils.createRenderer();
    renderer.render(<Cell {...props} />);
    const result = renderer.getRenderOutput();

    it('correctly outputs rendered children', () => {
      expect(result.props.children).toEqual(props.children);
    });
  });
});
