import React, { Component } from 'react';
import { SpinLoader } from 'react-css-loaders';
import Radium from 'radium';

import { LazyTrigger, Card, Placeholder, ProgressBar, Sticky, Badge } from '../../components';
import { propTypes } from '../../util';
import style from './style';

@Radium
export default class IssuesView extends Component {
  static propTypes = propTypes;

  constructor(props) {
    super(props);
    this.state = {
      issues: props.issues,
      noLoad: props.noLoad,
    };
  }

  componentWillReceiveProps(props) {
    if (props.issues !== this.state.issues) {
      this.setState({ issues: props.issues });
    }

    if (props.noLoad !== this.state.noLoad) {
      this.setState({ noLoad: props.noLoad });
    }
  }

  get trigger() {
    if (this.props.brand && !this.state.noLoad) {
      return (
        <LazyTrigger
          onScreenEnter={() => this.props.getIssues(this.props)}
          threshold={80}
        />
      );
    }

    return null;
  }

  get issues() {
    if (this.state.issues.length) {
      return (
        <ul style={style.list}>
          {this.state.issues.map((issue, key) => (
            <li key={key} style={style.item}>
              <Badge status={this.props.downloads[issue.$.id] === 100 ? 'success' : null} />
              <Card onClick={() => {}}>
                <Placeholder src={issue.asset_thumbnail.asset_path_signed} />
                <h3>
                  {issue.$name || issue.issue_coverDisplayDate}
                </h3>
                <Sticky>
                  <ProgressBar percent={this.props.downloads[issue.$.id] > 0 && this.props.downloads[issue.$.id] < 100} />
                </Sticky>
              </Card>
            </li>
          ))}
        </ul>
      );
    }

    return (
      <SpinLoader color="#0197cb" size={6} />
    );
  }

  render() {
    return (
      <main>
        {this.issues}
        {this.trigger}
      </main>
    );
  }
}
