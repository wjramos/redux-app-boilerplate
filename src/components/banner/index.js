import React from 'react';
import banner from './style';

export default ({ children, style }) => (
  <div style={Object.assign({}, banner, style)}>
    {children}
  </div>
);
