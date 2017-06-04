import React, { Component } from 'react';
import { connect } from 'react-redux';

import { propTypes, mapDispatchToProps, mapStateToProps } from '../util';
import { Issues } from '../views';

const DEVICE_WIDTH = parseInt(document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth, 10);
const CACHE_DURATION = 60 * 60 * 1000; // ms
let LIMIT = 6;
if (DEVICE_WIDTH > 1023) {
  LIMIT = 8;
} else if (DEVICE_WIDTH > 767) {
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
    const { issues, brand, brands, edition, editions, qa, preview } = props;
    const issueEnv = qa ? 'qa' : 'prod';
    // if (issues.length !== this.props.issues.length) {
    //   this.setState({ issues });
    // }
    //
    // if (brands.length !== this.props.brands.length) {
    //   this.setState({ brands });
    // }
    //
    // if (brand && !this.props.brand) {
    //   this.setState({ brand });
    // }
    //
    // if (edition !== this.props.edition) {
    //   this.setState({ edition });
    // }
    //
    // if (qa !== this.props.qa) {
    //   this.setState({ qa });
    // }

    // console.log(issues[brand], this.props.issues[brand])

    if (issues[brand] && this.props.issues[brand]
      && issues[brand][issueEnv] && this.props.issues[brand][issueEnv] && (
      (!issues[brand][issueEnv].length && !this.props.issues[brand][issueEnv].length)
      || issues[brand][issueEnv].length <= this.props.issues[brand][issueEnv].length + LIMIT
    )) {
      console.log('noload')
      // Stop loading new content if fewer than expected results returned - usually means end of content
      this.setState({ noLoad: true });
    }

    // If no available brands, fetch
    if (!brands[issueEnv] || !brands[issueEnv].length) {
      props.getBrands(props);
    }

    // If editions have not been fetched for current brand,
    // attempt to gather available editions
    if (brand && (!editions[brand] || !editions[brand][issueEnv])) {
      props.getEditions(props);
    }

    // If no set brand, but brands available, set to first brand
    if (!brand && !this.props.brand && brands && brands[issueEnv] && brands[issueEnv].length) {
      props.setBrand(brands[issueEnv][0]);
    }

    // If editions available for current brand and no edition set,
    // set to first available edition
    if (!edition && !this.props.edition && editions[brand] && editions[brand][issueEnv] && editions[brand][issueEnv].length) {
      props.setEdition(editions[brand][issueEnv][0]);
    }

    // On brand change, clear editions on new brand to refetch
    if (edition && brand !== this.props.brand) {
      props.clearEdition();
    }

    // Editions have already been fetched,
    // something has changed from the previous state
    // Allow progressive loading to continue, fetch fresh issues
    if (editions[brand]
      && editions[brand][issueEnv]
      && (brand !== this.props.brand
      || edition !== this.props.edition
      || preview !== this.props.preview
      || qa !== this.props.qa
    )) {
      const offset = issues[brand] && issues[brand][issueEnv] ? issues[brand][issueEnv].length : 0;
      this.setState({ noLoad: false });
      props.clearIssues(props);
      props.getIssues(
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
  }

  getIssues() {
    if (this.props.brand && !this.state.noLoad) {
      const issueEnv = this.props.qa ? 'qa' : 'prod';
      const offset = this.props.issues[this.props.brand] && this.props.issues[this.props.brand][issueEnv] ? this.props.issues[this.props.brand][issueEnv].length : 0;
      this.props.getIssues(
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
