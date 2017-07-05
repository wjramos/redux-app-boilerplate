import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class App extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    return (
      <main>
        {this.props.children}
      </main>
    );
  }
}
