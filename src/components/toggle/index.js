import React from 'react';

const ACTIVE = '#64bd63';
const INACTIVE = '#e9e9e9';

const checkbox = {
  position: 'absolute',
  marginLeft: -9999,
  visibility: 'hidden',
};

const toggle = {
  display: 'inline-block',
  backgroundColor: INACTIVE,
  borderRadius: 20,
  height: 30,
  width: 55,
  margin: 10,
};

const toggleActive = {
  backgroundColor: ACTIVE,
};

const trigger = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 'initial',
  cursor: 'pointer',
  outline: 'none',
  userSelect: 'none',
  boxShadow: '0 1px 3px rgba(0,0,0,.4)',
  borderRadius: '100%',
  height: 30,
  width: 30,
  backgroundColor: '#fff',
};

const triggerActive = {
  right: 0,
  left: 'initial',
};

export default ({ id = 'toggle', active, onChange }) => (
  <label htmlFor={id} style={Object.assign({}, toggle, active ? toggleActive : null)}>
    <input onChange={onChange} id={id} style={checkbox} type="checkbox" />
    <span style={Object.assign({}, trigger, active ? triggerActive : null)} />
  </label>
);
