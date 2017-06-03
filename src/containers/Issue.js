import React, { Component } from 'react';
import { connect } from 'react-redux';

import { propTypes, mapDispatchToProps, mapStateToProps } from '../util';
import { Issue } from '../views';

const DEVICE_WIDTH = parseInt(document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth, 10);
const CACHE_DURATION = 60 * 60 * 1000; // ms
let LIMIT = 6;
if (DEVICE_WIDTH > 1023) {
  LIMIT = 8;
} else if (DEVICE_WIDTH > 767) {
  LIMIT = 9;
}

class IssueContainer extends Component {
  static propTypes = propTypes;

  componentDidMount() {
    window.scroll(0, 0);
  }

  componentWillReceiveProps(props) {

  }

  render() {
    return (
      <Issue {...this.props} />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IssueContainer);
