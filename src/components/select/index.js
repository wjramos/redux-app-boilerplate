import React from 'react';
import select from './style';

export const Option = ({ children, value, selected, style }) => (
  <option
    selected={selected}
    value={value}
  >
    {children}
  </option>
);

export default ({
  options = [],
  selected,
  onChange,
  required,
  autoFocus,
  disabled,
  multiple,
  style,
}) => (
  <select
    onChange={onChange}
    required={required}
    disabled={disabled}
    multiple={multiple}
    autoFocus={autoFocus}
    style={Object.assign({}, select, style)}
  >
    {options.map(({ description, code, id }, i) => (
      <Option key={i} value={id} selected={selected}>
        {code} - {description}
      </Option>
    ))}
  </select>
);
