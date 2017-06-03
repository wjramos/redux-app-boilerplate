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
    if (!this.props.brands.length) {
      this.props.getBrands(this.props);
    }
  }

  componentDidMount() {
    window.scroll(0, 0);
  }

  componentWillReceiveProps(props) {
    const { issues, brand, brands, edition, editions, qa, preview } = props;

    if (issues.length !== this.props.issues.length) {
      this.setState({ issues });
    }

    if (brands.length !== this.props.brands.length) {
      this.setState({ brands });
    }

    if (brand && !this.props.brand) {
      this.setState({ brand });
    }

    if (edition !== this.props.edition) {
      this.setState({ edition });
    }

    if (qa !== this.props.qa) {
      this.setState({ qa });
    }

    console.log(issues[brand], this.props.issues[brand])

    if (issues[brand] && this.props.issues[brand] && (
      (!issues[brand].length && !this.props.issues[brand].length)
      || issues[brand].length <= this.props.issues[brand].length + LIMIT
    )) {
      console.log('noload')
      // Stop loading new content if fewer than expected results returned - usually means end of content
      this.setState({ noLoad: true });
    }

    if (!brands.length) {
      props.getBrands(props);
    }

    if (brands && brands.length && !brand && !this.props.brand) {
      props.setBrand(brands[0]);
    }

    if (brand && !editions[brand]) {
      props.getEditions(props);
    }

    // Editions have already been fetched, something has changed from the previous state
    if (editions[brand] && (
      brand !== this.props.brand
      || edition !== this.props.edition
      || preview !== this.props.preview
      || qa !== this.props.qa
    )) {
      this.setState({ noLoad: false });
      props.clearIssues(brand);
      props.getIssues(props);
    }
  }

  getIssues() {
    if (this.props.brand && !this.state.noLoad) {
      this.props.getIssues(
        Object.assign(
          {},
          this.props,
          {
            limit: LIMIT,
            offset: this.props.issues[this.props.brand] ? this.props.issues[this.props.brand].length : 0,
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
