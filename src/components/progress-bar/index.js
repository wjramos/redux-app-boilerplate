import React from 'react';

export default ({ percent = 0, style }) => (
  <span style={Object.assign(
    {},
    {
      backgroundColor: '#999',
      zIndex: 1,
    }
  )}>
    <span style={{
      display: 'block',
      width: `${percent}%`,
      height: '.5vh',
      backgroundColor: '#37cf79',
    }} />
  </span>
);
