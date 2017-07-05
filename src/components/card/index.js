/**
  * Article summary web component
  */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { hashHistory } from 'react-router';
import Radium from 'radium';

import style from './style';

@Radium
export default class Card extends PureComponent {
  static propTypes = {
    children: PropTypes.any,
    onClick: PropTypes.func,
    href: PropTypes.string,
    style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    direction: PropTypes.string,
  }

  static defaultProps = {
    style: [],
    direction: 'column',
  }

  onMouseEnter() {
    this.setState({ hover: true });
  }

  onMouseLeave() {
    this.setState({ hover: false });
  }

  render() {
    const { href, children, onClick, direction, style: styleProps } = this.props;
    const link = href ? () => hashHistory.push(href) : null;
    const lift = (href || onClick) && this.state.hover ? style.lift : {};
    return (
      <div
        onMouseEnter={::this.onMouseEnter}
        onMouseLeave={::this.onMouseLeave}
        onClick={link || onClick}
        style={[
          style.card,
          { flexDirection: direction },
          styleProps,
          lift,
        ]}
      >
        {children}
      </div>
    );
  }
}
