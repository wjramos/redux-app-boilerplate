import React, { Component } from 'react';
import { connect } from 'react-redux';

import { propTypes, mapDispatchToProps, mapStateToProps, getDeviceWidth } from '../util';
import { Issues } from '../views';

const deviceWidth = getDeviceWidth();

let LIMIT = 6;
if (deviceWidth > 1023) {
  LIMIT = 8;
} else if (deviceWidth > 767) {
  LIMIT = 9;
}

class IssuesContainer extends Component {
  static propTypes = propTypes;

  constructor(props) {
    super(props);
    this.state = {
      noLoad: false,
    };
  }

  componentWillMount() {
    const issueEnv = this.props.qa ? 'qa' : 'prod';
    if (!this.props.brands[issueEnv] || !this.props.brands[issueEnv].length) {
      this.props.getBrands(this.props);
    }
  }

  componentDidMount() {
    window.scroll(0, 0);
  }

  componentWillReceiveProps(props) {
    const {
      issue, issues, brand, brands, edition, editions, qa, preview, display,
      getBrands, setBrand, getEditions, setEdition, clearEdition,
      clearIssue, getIssues, clearIssues, setDisplay, clearDisplay,
    } = props;
    const issueEnv = qa ? 'qa' : 'prod';

    // Stop loading new content if fewer than expected results returned - usually means end of content
    if (brand
      && issues[brand]
      && issues[brand][issueEnv]
      && this.props.issues[brand]
      && this.props.issues[brand][issueEnv]
      && (
        (!issues[brand][issueEnv].length && !this.props.issues[brand][issueEnv].length)
        || issues[brand][issueEnv].length < this.props.issues[brand][issueEnv].length + LIMIT
      )
    ) {
      this.setState({ noLoad: true });
    }

    // If no available brands, fetch
    if (!brands[issueEnv]) {
      getBrands(props);
    }

    // If no set brand, but brands available, set to first brand
    if (!brand && brands[issueEnv] && brands[issueEnv].length) {
      setBrand(brands[issueEnv][0]);
    }

    // If editions have not been fetched for current brand,
    // attempt to gather available editions
    if (brand && (!editions[brand] || !editions[brand][issueEnv])) {
      getEditions(props);
    }

    // If editions available for current brand and no edition set,
    // set to first available edition
    if (!edition && brand && editions[brand] && editions[brand][issueEnv] && editions[brand][issueEnv].length) {
      setEdition(editions[brand][issueEnv][0]);
    }

    // On brand change, clear current edition
    if (edition && (brand !== this.props.brand || qa !== this.props.qa)) {
      clearEdition();
    }

    // Editions have already been fetched,
    // something has changed from the previous state
    // Allow progressive loading to continue, fetch fresh issues
    if (brand
      && editions[brand]
      && editions[brand][issueEnv]
      && (!issues[brand] || !issues[brand][issueEnv])
    ) {
      const offset = issues[brand] && issues[brand][issueEnv] ? issues[brand][issueEnv].length : 0;
      this.setState({ noLoad: false });
      getIssues(
        Object.assign(
          {},
          props,
          {
            limit: LIMIT,
            offset,
          }
        )
      );
    }

    // Set issues to display if none available
    if (!display.length
      && issues[brand]
      && issues[brand][issueEnv]
      && issues[brand][issueEnv].length
      && editions[brand]
      && editions[brand][issueEnv]
    ) {
      setDisplay(props);
    }

    // Refresh issues display if settings have changed or there are new issues available
    if (
      display.length
      && (
        brand !== this.props.brand
        || edition !== this.props.edition
        || preview !== this.props.preview
        || qa !== this.props.qa
        || issues[brand][issueEnv].length !== this.props.issues[brand][issueEnv].length
      )
    ) {
      clearDisplay();
    }

    // Clear issue if set
    if (issue) {
      // clearIssue();
    }
  }

  getIssues() {
    const { brand, qa, issues, getIssues } = this.props;

    if (brand && !this.state.noLoad) {
      const issueEnv = qa ? 'qa' : 'prod';
      const offset = issues[brand] && issues[brand][issueEnv] ? issues[brand][issueEnv].length : 0;
      getIssues(
        Object.assign(
          {},
          this.props,
          {
            limit: LIMIT,
            offset,
          }
        )
      );
    }
  }

  render() {
    return (
      <Issues
        {...this.props}
        getIssues={::this.getIssues}
        noLoad={this.state.noLoad}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IssuesContainer);
