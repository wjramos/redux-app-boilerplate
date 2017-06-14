import React, { Component } from 'react';
import { SpinLoader } from 'react-css-loaders';
import { hashHistory } from 'react-router';

import { LazyTrigger, Card, Placeholder, Accordion, ProgressBar, Sticky, Badge, Select, Grid, Toggle, IssueCover } from '../components';
import { propTypes } from '../util';

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

  onIssueSelect(issue) {
    this.props.setIssue(issue);
    hashHistory.push(`/issue/${issue.$.id}`);
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
    const { display, downloads, noLoad } = this.props;
    if (display.length) {
      return (
        <Grid>
          {display.map((issue, key) => (
            <IssueCover
              key={key}
              issue={issue}
              percent={downloads[issue.$.id]}
              onClick={() => this.onIssueSelect(issue)}
            />
          ))}
        </Grid>
      );
    }

    if (!noLoad) {
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
    const { brand, brands, qa } = this.props;
    const issueEnv = qa ? 'qa' : 'prod';

    if (brands[issueEnv] && brands[issueEnv].length) {
      return (
        <div>
          <h3>
            Brand
          </h3>
          <Select
            value={brand}
            options={brands[issueEnv]}
            onChange={::this.onBrandSelect}
          />
        </div>
      );
    }

    return null;
  }

  get editionSelect() {
    const { edition, editions, brand, qa } = this.props;
    const issueEnv = qa ? 'qa' : 'prod';

    if (editions[brand] && editions[brand][issueEnv] && editions[brand][issueEnv].length) {
      return (
        <div>
          <h3>
            Edition
          </h3>
          <Select
            value={edition}
            options={['all', ...editions[brand][issueEnv]]}
            onChange={::this.onEditionSelect}
          />
        </div>
      );
    }

    return null;
  }

  get qaToggle() {
    return (
      <div>
        <h3>
          QA Issues
        </h3>
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
        <h3>
          Show Unreleased
        </h3>
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
        this.props.clearBrands(this.props);
        this.props.clearIssues(this.props);
        this.props.clearEditions(this.props);
        this.props.clearDisplay(this.props);
      }}>
        reset
      </button>
    );
  }

  get filters() {
    return (
      <Accordion
        heading="Filter"
      >
        {this.reset}
        <section style={{ display: 'flex', flexFlow: 'row nowrap', justifyContent: 'space-around', textAlign: 'center', marginBottom: 20 }}>
          {this.qaToggle}
          {this.previewToggle}
        </section>
        <section style={{ display: 'flex', flexFlow: 'row nowrap', justifyContent: 'space-around', textAlign: 'center', marginBottom: 20 }}>
          {this.brandSelect}
          {this.editionSelect}
        </section>
      </Accordion>
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
