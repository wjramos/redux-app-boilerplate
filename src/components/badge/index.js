import React from 'react';
import Ionicon from 'react-ionicons';

import style from './style';

export default ({ status }) => status ? (
  <span style={Object.assign({}, style.base, style.status[status])}>
    <Ionicon
      fontSize="inherit"
      icon={status === 'success' ? 'ion-ios-checkmark-empty' : ''}
      color="#fff"
    />
  </span>
) : null;
