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
      offset: props.issues.length,
    };
  }

  componentWillMount() {
    if (!this.props.brands.length) {
      this.props.getBrands(this.props);
    }

    if (this.props.brand && !this.props.issues.length) {
      this.props.getIssues(this.props);
    }
  }

  componentDidMount() {
    window.scroll(0, 0);
  }

  componentWillReceiveProps(props) {
    if (
      props.brand !== this.props.brand
      || props.edition !== this.props.edition
      || props.preview !== this.props.preview
    ) {
      this.setState({ offset: 0 });
      this.props.clearIssues();
      this.props.getIssues(props);
    }
  }

  getIssues() {
    this.props.getIssues(Object.assign({}, this.props, { limit: LIMIT, offset: this.state.offset }));

    // Stop loading new content if fewer than expected results returned - usually means end of content
    if (this.props.issues.length === this.state.offset) {
      this.setState({ offset: this.state.offset + LIMIT });
    } else {
      this.setState({ noLoad: true });
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
