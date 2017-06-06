import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import * as actions from './actions';
import * as reducers from './reducers/';

export function getDeviceWidth() {
  return parseInt(document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth, 10);
}

export function getProps(props) {
  return Object.keys(props).reduce((obj, state) => {
    const type = Array.isArray(reducers[state].initialState) ? 'array' : typeof reducers[state].initialState;
    let propType = type;

    if (type === 'function') {
      propType = 'func';
    }

    if (type === 'boolean') {
      propType = 'bool';
    }

    obj[state] = PropTypes[propType];

    return obj;
  }, {});
}

const actionProps = Object.keys(actions).reduce((obj, action) => {
  obj[action] = PropTypes.func.isRequired;
  return obj;
}, {});

const stateProps = getProps(reducers);

export const propTypes = Object.assign({}, actionProps, stateProps);

export function mapDispatchToProps(dispatch) {
  return Object.keys(actions).reduce((obj, action) => {
    obj[action] = bindActionCreators(actions[action], dispatch)
    return obj;
  }, {});
}

export function mapStateToProps({ downloads, issue, issues, brand, brands, edition, editions, preview, qa, display }) {
  return {
    downloads,
    issue,
    issues,
    brand,
    brands,
    edition,
    editions,
    preview,
    qa,
    display,
  };
}
