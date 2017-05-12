import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions';
import { Main } from '../views';

class MainContainer extends Component {
  static propTypes = {
    getCoordinates: PropTypes.func.isRequired,
    getLocation: PropTypes.func.isRequired,
    setLocation: PropTypes.func.isRequired,
    getPlaces: PropTypes.func.isRequired,
    location: PropTypes.object,
  }

  render() {
    return (
      <Main {...this.props} />
    );
  }
}

function mapStateToProps({
  location,
  places,
}) {

  return {
    location,
    places,
  };
}

function mapDispatchToProps(dispatch) {
  return Object.keys(actions).reduce(
    (obj, action) => {
      obj[action] = bindActionCreators(actions[action], dispatch)
      return obj;
    }, {}
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
