import React, { Component } from 'react';
import { SpinLoader } from 'react-css-loaders';

import { LazyTrigger, Card, Placeholder, ProgressBar, Sticky, Badge, Select, Grid, Toggle, IssueCover } from '../../components';
import { propTypes } from '../../util';

export default class IssueView extends Component {
  static propTypes = propTypes;

  get issue() {
    return (
      <IssueCover {...this.props} />
    );
  }

  get toc() {
    return (
      <TableOfContents {...this.props} />
    );
  }

  render() {
    return (
      <main>
        <h1>
          {this.props.issue.$.id}
        </h1>
        <Placeholder src={this.props.issue.asset_thumbnail.asset_path_signed} width={.5} />
        {/* {this.issue} */}
        {/* {this.toc} */}
      </main>
    );
  }
}
