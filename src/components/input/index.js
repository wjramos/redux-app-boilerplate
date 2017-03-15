import React from 'react';

export default ({ type, placeholder, onChange }) => (
  <input
    placeholder={placeholder}
    onChange={onChange}
    type={type}
  />
);
