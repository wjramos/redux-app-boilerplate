import React, { Component } from 'react';
import Radium from 'radium';

import style from './style';

@Radium
export default class Grid extends Component {
  render() {
    const { children } = this.props;
    if (children.length) {
      return (
        <ul style={style.grid}>
          {children.map((child, key) => (
            <li key={key} style={style.item}>
              {child}
            </li>
          ))}
        </ul>
      );
    }

    return null;
  }
}
