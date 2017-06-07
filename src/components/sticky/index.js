import React, { Component } from 'react';

import { LazyTrigger } from '..';

const sticky = { position: 'fixed', left: 0, right: 0, top: 0, bottom: 'initial' };

export default class Sticky extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sticky: false,
    };
  }

  render() {
    return (
      <LazyTrigger
        style={Object.assign(
          {},
          this.props.style,
          (this.props.stuck || this.state.sticky)
            ? Object.assign(
              {},
              sticky,
              (this.props.bottom ? { bottom: 0, top: 'initial' } : null)
          ) : null
        )}
        onScreenEnter={() => this.setState({ sticky: false })}
        onScreenLeave={() => this.setState({ sticky: true })}
      >
        {this.props.children}
      </LazyTrigger>
    );
  }
}
