import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class LazyTrigger extends Component {
  static isInViewport(trigger, threshold) {
    if (trigger) {
      const { top, left, bottom, right } = trigger.getBoundingClientRect();
      const width = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
      const height = document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight;
      const maxWidth = width + threshold;
      const maxHeight = height + threshold;

      return (
        (top >= -threshold && top <= maxHeight || bottom >= -threshold && bottom <= maxHeight) &&
        (left >= -threshold && left <= maxWidth || right >= -threshold && right <= maxWidth)
      );
    }

    return false;
  }

  static propTypes = {
    threshold: PropTypes.number,
    children: PropTypes.any,
    onScreenEnter: PropTypes.func,
    onScreenLeave: PropTypes.func,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  }

  static defaultProps = {
    threshold: 0,
  }

  constructor(props) {
    super(props);
    this.state = {
      entered: false,
      left: false,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', ::this.toggle, false);
    window.addEventListener('resize', ::this.toggle, false);
  }

  componentWillReceiveProps() {
    if (!this.state.entered && !this.state.left) {
      this.triggerActive();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', ::this.toggle, false);
    window.removeEventListener('resize', ::this.toggle, false);
  }

  onScreenEnter() {
    if (this.trigger && LazyTrigger.isInViewport(this.trigger, this.props.threshold)) {
      this.setState({ entered: true, left: false });

      if (this.props.onScreenEnter) {
        this.props.onScreenEnter();
      }
    }
  }

  onScreenLeave() {
    if (this.trigger && !LazyTrigger.isInViewport(this.trigger, this.props.threshold)) {
      this.setState({ entered: false, left: true });

      if (this.props.onScreenLeave) {
        this.props.onScreenLeave();
      }
    }
  }

  triggerActive() {
    this.onScreenEnter();
    this.onScreenLeave();
  }

  toggle() {
    if (!this.state.entered) {
      this.onScreenEnter();
    }

    if (!this.state.left) {
      this.onScreenLeave();
    }
  }

  render() {
    return (
      <div
        ref={node => (this.trigger = node)}
        style={this.props.style}
      >
        {this.props.children}
      </div>
    );
  }
}
