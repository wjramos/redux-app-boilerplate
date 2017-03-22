import React from 'react';
import button from './style';

export default ({ children, state = 'default', size = 'medium', onClick, style }) => (
  <button type="button" disabled={state === 'disabled'} style={Object.assign({}, button.base, button[size], button[state], style)} onClick={onClick}>
    {children}
  </button>
);
