import React from 'react';
import select from './style';

export const Option = ({ children, value, style }) => (
  <option
    value={value}
  >
    {children}
  </option>
);

export default ({
  options = [],
  onChange,
  required,
  autoFocus,
  disabled,
  multiple,
  value,
  style,
}) => (
  <select
    value={value}
    onChange={onChange}
    required={required}
    disabled={disabled}
    multiple={multiple}
    autoFocus={autoFocus}
    style={Object.assign({}, select, style)}
  >
    {options.map((val, key) => (
      <Option
        key={key}
        value={val}
      >
        {val}
      </Option>
    ))}
  </select>
);
