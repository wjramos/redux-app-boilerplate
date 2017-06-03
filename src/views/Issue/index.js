import React, { Component } from 'react';
import { SpinLoader } from 'react-css-loaders';

import { LazyTrigger, Card, Placeholder, ProgressBar, Sticky, Badge, Select, Grid, Toggle, IssueCover } from '../../components';
import { propTypes } from '../../util';

export default class IssueView extends Component {
  static propTypes = propTypes;

  get issue() {

  }

  render() {
    return (
      <main>
        {this.issue}
        test
      </main>
    );
  }
}
