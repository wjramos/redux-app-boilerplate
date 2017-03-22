import React from 'react';

export const Cell = ({ children }) => (
  <td>
    {children}
  </td>
);

export const Row = ({ row = {} }) => (
  <tr>
    {Object.keys(row).map((cell, i) => (
      <Cell key={i}>
        {row[cell]}
      </Cell>
    ))}
  </tr>
);

export const Body = ({ rows = [] }) => (
  <tbody>
    {rows.map((row, i) => (
      <Row key={i} row={row} />
    ))}
  </tbody>
);

export const Head = ({ labels }) => (
  <thead>
    <Row row={labels} />
  </thead>
);

// @TODO Support object {a:[]} or array [[]], Omit head if multidimensional array instead of object
export default ({ rows = [], rows: [row], labels = [] }) => (
  <table>
    <Head labels={labels || (!labels && row ? Object.keys(row) : [])} />
    <Body rows={rows} />
  </table>
);
