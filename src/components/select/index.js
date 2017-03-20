import React from 'react';

export const Option = ({ children, value, selected }) => (
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
}) => (
  <select
    onChange={onChange}
    required={required}
    disabled={disabled}
    multiple={multiple}
    autoFocus={autoFocus}
  >
    {options.map(({ description, code, id }, i) => (
      <Option key={i} value={id} selected={selected}>
        {code} - {description}
      </Option>
    ))}
  </select>
);
