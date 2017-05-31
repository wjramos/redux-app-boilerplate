import React, { Component } from 'react';

import { LazyTrigger } from '..';

const sticky = { position: 'fixed', top: 0, left: 0, right: 0, bottom: 'initial' };

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
        style={Object.assign({}, this.props.style, this.state.sticky ? sticky : null)}
        onScreenEnter={() => this.setState({ sticky: false })}
        onScreenLeave={() => this.setState({ sticky: true })}
      >
        {this.props.children}
      </LazyTrigger>
    );
  }
}
