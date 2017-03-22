import React from 'react';
import input from './style';

export default ({ placeholder, onClick, onChange, style }) => (
  <input onChange={onChange} placeholder={placeholder} onClick={onClick} style={Object.assign({}, input, style)} />  
);
