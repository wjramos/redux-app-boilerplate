import React, { Component, PropTypes } from 'react';
// import Radium from 'radium';

import * as actions from '../../actions';
import * as reducers from '../../reducers/';

import { Input, Slider, Rating } from '../../components';
import style from './style';

const actionProps = Object.keys(actions).reduce((obj, action) => {
  obj[action] = PropTypes.func.isRequired;
  return obj;
}, {});

const stateProps = Object.keys(reducers).reduce((obj, state) => {
  const type = Array.isArray(reducers[state].initialState) ? 'array' : typeof reducers[state].initialState;

  obj[state] = PropTypes[type];

  return obj;
}, {});

// @Radium
export default class MainView extends Component {
  static propTypes = Object.assign({}, actionProps, stateProps);

  // static defaultProps = {}

  constructor(props) {
    super(props);
    this.state = props;
  }

  componentDidMount() {
    window.scroll(0, 0);

    // if (!this.state.location) {
    //   this.props.getLocation();
    // }
  }

  componentWillReceiveProps(props) {
    if (!Object.keys(this.props.tracks)) {
      this.props.getTracks();
    }
  }


  get radioSection() {
    if (this.state.tracks) {
      return (
        <section
          style={{ marginBottom: 50 }}
        >
          <h2 style={{ marginBottom: 10 }}>
          </h2>
          {this.tracks}
        </section>
      );
    }

    return null;
  }

  render() {
    console.log(this.props.getTracks())
    return (
      <main>
        TEST
        {/* {this.radioSection} */}
      </main>
    );
  }
}
