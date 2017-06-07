import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import * as actions from './actions';
import * as reducers from './reducers/';

export function getDeviceWidth() {
  return parseInt(document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth, 10);
}

export function getGoogleFontsUrl(fonts) {
  return fonts.reduce((str, font, i) => {
    let path = str;

    if (i > 0) {
      path += '|';
    }

    path += font.name.replace(' ', '+');

    if (font.weights) {
      path += `:${font.weights.join(',')}`;
    }

    return path;
  }, 'https://fonts.googleapis.com/css?family=');
}

export function loadStylesheet(href) {
  const link = document.createElement('link');
  link.href = href;
  link.rel = 'stylesheet';
  document.body.appendChild(link);
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
