import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getLocation, setLocation, getPlaces } from '../actions';
import { Main } from '../views';

class MainContainer extends Component {
  static propTypes = {
    location: PropTypes.object,
    getLocation: PropTypes.func.isRequired,
    setLocation: PropTypes.func.isRequired,
    getPlaces: PropTypes.func.isRequired,
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
  return {
    getLocation: bindActionCreators(getLocation, dispatch),
    setLocation: bindActionCreators(setLocation, dispatch),
    getPlaces: bindActionCreators(getPlaces, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
