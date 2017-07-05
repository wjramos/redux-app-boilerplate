import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Swipe extends PureComponent {
  static propTypes = {
    minDistance: PropTypes.number,
    maxTouch: PropTypes.number,
    children: PropTypes.node,
    style: PropTypes.object,
    onSwipeUp: PropTypes.func,
    onSwipeDown: PropTypes.func,
    onSwipeLeft: PropTypes.func,
    onSwipeRight: PropTypes.func,
  }

  static defaultProps = {
    minDistance: 100,
    maxTouch: 500,
  }

  constructor(props) {
    super(props);
    this.state = {
      positionX: null,
      positionY: null,
    };
  }

  componentDidMount() {
    window.addEventListener('touchstart', ::this.onTouch, false);
    window.addEventListener('touchend', ::this.onRelease, false);
  }

  componentWillUnmount() {
    window.removeEventListener('touchstart', ::this.onTouch, false);
    window.removeEventListener('touchend', ::this.onRelease, false);
  }

  onTouch(event) {
    this.setState({ positionX: event.touches[0].clientX, positionY: event.touches[0].clientY });

    this.timer = setTimeout(() => {
      clearTimeout(this.timer);
      this.timer = null;
      this.setState({ positionX: null, positionY: null })
    }, this.props.maxTouch);
  }

  onRelease(event) {
    const { onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, minDistance } = this.props;
    const { positionX, positionY } = this.state;
    if (this.timer && positionX && positionY) {
      const diffX = positionX - event.changedTouches[0].clientX;
      const diffY = positionY - event.changedTouches[0].clientY;
      const distX = Math.abs(diffX);
      const distY = Math.abs(diffY);

      if (distX > distY && distX > minDistance) {
        if (onSwipeLeft && diffX > 0) {
          return onSwipeLeft();
        }

        if (onSwipeRight && diffX < 1) {
          return onSwipeRight();
        }
      }

      if (distY > distX && distY > minDistance) {
        if (onSwipeUp && diffY > 0) {
          return onSwipeUp();
        }

        if (onSwipeDown && diffY < 1) {
          return onSwipeDown();
        }
      }
    }
  }

  render() {
    return (
      <div style={this.props.style}>
        {this.props.children}
      </div>
    );
  }
}
