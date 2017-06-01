import React, { Component } from 'react';
import { SpinLoader } from 'react-css-loaders';

import { LazyTrigger, Card, Placeholder, ProgressBar, Sticky, Badge, Select, Grid, Toggle, IssueCover } from '../../components';
import { propTypes } from '../../util';

export default class IssuesView extends Component {
  static propTypes = propTypes;

  onBrandSelect(event) {
    const { value = '' } = event.target;
    this.props.setBrand(value);
  }

  onEditionSelect(event) {
    const { value = '' } = event.target;
    this.props.setEdition(value);
  }

  onQaToggle() {
    this.props.setQa(!this.props.qa);
  }

  onPreviewToggle() {
    this.props.setPreview(!this.props.preview);
  }

  onScrollBottom() {
    this.props.getIssues(this.props)
  }

  get trigger() {
    if (this.props.brand && !this.props.noLoad) {
      return (
        <LazyTrigger
          onScreenEnter={::this.onScrollBottom}
          threshold={80}
        />
      );
    }

    return null;
  }

  get issues() {
    if (this.props.issues[this.props.brand] && this.props.issues[this.props.brand].length) {
      return (
        <Grid>
          {this.props.issues[this.props.brand].map((issue, key) => (
            <IssueCover
              key={key}
              issue={issue}
              percent={this.props.downloads[issue.$.id]}
            />
          ))}
        </Grid>
      );
    }

    return (
      <SpinLoader
        color="#0197cb"
        size={6}
      />
    );
  }

  get brandSelect() {
    if (this.props.brands.length) {
      return (
        <Select
          value={this.props.brand}
          options={this.props.brands}
          onChange={::this.onBrandSelect}
        />
      );
    }

    return null;
  }

  get editionSelect() {
    if (this.props.editions.length) {
      return (
        <Select
          value={this.props.edition}
          options={this.props.editions}
          onChange={::this.onEditionSelect}
        />
      );
    }

    return null;
  }

  get qaToggle() {
    return (
      <Toggle
        id={'qa'}
        active={this.props.qa}
        onChange={::this.onQaToggle}
      />
    );
  }

  get previewToggle() {
    return (
      <Toggle
        id={'preview'}
        active={this.props.preview}
        onChange={::this.onPreviewToggle}
      />
    );
  }

  get filters() {
    return (
      <section>
        {this.brandSelect}
        {this.editionSelect}
        {this.qaToggle}
        {this.previewToggle}
      </section>
    );
  }

  render() {
    return (
      <main>
        {this.filters}
        {this.issues}
        {this.trigger}
      </main>
    );
  }
}
