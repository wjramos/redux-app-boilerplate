import React from 'react';

export const Item = ({ children, value, selected }) => (
  <li>
    {children}
  </li>
);

export default ({ items = [], linkText, onClick = () => {} }) => (
  <ul>
    {items.map(({ description: label, code: value }, i) => (
      <Item key={i}>
        {value}: {label}<span onClick={() => onClick(value)}>{linkText}</span>
      </Item>
    ))}
  </ul>
);
