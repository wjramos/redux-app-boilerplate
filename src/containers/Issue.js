import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import { propTypes, mapDispatchToProps, mapStateToProps } from '../util';
import { Issue } from '../views';

class IssueContainer extends Component {
  static propTypes = propTypes;

  componentDidMount() {
    window.scroll(0, 0);
  }

  componentWillReceiveProps(props) {
    if (!this.props.issue || this.props.issue.$.id !== props.params.id) {
      hashHistory.push('/issues');
    }
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
