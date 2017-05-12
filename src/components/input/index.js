import React from 'react';
import input from './style';

export default ({ placeholder, onClick, onChange, value = '', style }) => (
  <input
    placeholder={placeholder}
    onClick={onClick}
    onChange={onChange}
    value={value}
    style={Object.assign({}, input, style)}
  />
);
