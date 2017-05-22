import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions';
import * as reducers from '../reducers/';
import { Main } from '../views';

const actionProps = Object.keys(actions).reduce((obj, action) => {
  obj[action] = PropTypes.func.isRequired;
  return obj;
}, {});

const stateProps = Object.keys(reducers).reduce((obj, state) => {
  const type = Array.isArray(reducers[state].initialState) ? 'array' : typeof reducers[state].initialState;

  obj[state] = PropTypes[type];

  return obj;
}, {});

class MainContainer extends Component {
  static propTypes = Object.assign({}, actionProps, stateProps);

  componentDidMount() {
    if (!Object.keys(this.props.tracks)) {
      this.props.getTracks();
    }
  }

  render() {
    return (
      <Main
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({ tracks }) => ({ tracks });

const mapDispatchToProps = dispatch => Object.keys(actions).reduce((obj, action) => {
  obj[action] = bindActionCreators(actions[action], dispatch)
  return obj;
}, {})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
