import React from 'react';
import style from './style';

export default ({ children, active }) => (
  <span style={Object.assign({}, style.base, (active ? style.active : style.inactive))}>
    {children}
  </span>
);
