import React from 'react';

import { Badge } from '..';
import style from './style';

export default ({ children, active = true, index }) => (
  <h2 id={index} style={style}>
    <Badge active={active}>
      {index}
    </Badge>
    {children}
  </h2>
);
