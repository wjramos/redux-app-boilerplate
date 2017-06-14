import React, { Component } from 'react';
import { SpinLoader } from 'react-css-loaders';
import { hashHistory } from 'react-router';

import { LazyTrigger, Card, Placeholder, ProgressBar, Sticky, Badge, Select, Grid, Toggle, IssueCover, TableOfContents } from '../components';
import { propTypes } from '../util';

export default class IssueView extends Component {
  static propTypes = propTypes;

  get issue() {
    return (
      <section style={{ width: '50%', margin: 'auto' }}>
        <Card onClick={() => hashHistory.push(`/pdf/${this.props.issue.$.id}`)}>
          <Placeholder src={this.props.issue.asset_thumbnail.asset_path_signed} />
        </Card>
      </section>
    );
    // return (
    //   <IssueCover {...this.props} />
    // );
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
          {this.props.issue.$name || this.props.issue.issue_coverDisplayDate}
        </h1>
        {this.issue}
        {this.toc}
      </main>
    );
  }
}
