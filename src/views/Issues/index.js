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
    this.props.getIssues(this.props);
  }

  get trigger() {
    if (!this.props.noLoad) {
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

    if (!this.props.noLoad) {
      return (
        <SpinLoader
          color="#0197cb"
          size={6}
        />
      );
    }

    return null;
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
    if (this.props.editions[this.props.brand] && this.props.editions[this.props.brand].length) {
      return (
        <Select
          value={this.props.edition}
          options={this.props.editions[this.props.brand]}
          onChange={::this.onEditionSelect}
        />
      );
    }

    return null;
  }

  get qaToggle() {
    return (
      <div>
        <h3>QA Issues</h3>
        <Toggle
          id={'qa'}
          active={this.props.qa}
          onChange={::this.onQaToggle}
        />
      </div>
    );
  }

  get previewToggle() {
    return (
      <div>
        <h3>Preview Future Issues</h3>
        <Toggle
          id={'preview'}
          active={this.props.preview}
          onChange={::this.onPreviewToggle}
        />
      </div>
    );
  }

  get reset() {
    return (
      <button onClick={() => {
        this.props.clearIssues();
        this.props.clearEditions();
        this.props.clearBrands();
      }}>
        reset
      </button>
    );
  }

  get filters() {
    return (
      <section>
        {this.brandSelect}
        {this.editionSelect}
        {this.qaToggle}
        {this.previewToggle}
        {this.reset}
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
