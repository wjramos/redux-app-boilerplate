import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import persistState from 'redux-localstorage';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';
import * as reducers from '../reducers/';
// import * as middleware from '../middleware';
import { api, geolocate } from '../middleware';
import { DevTools } from '../containers';

const states = Object.keys(reducers).concat('offlineQueue');

export default function configureStore(history, initialState = {}) {
  // const middlewares = [
  //   thunk,
  //   createLogger(),
  //   routerMiddleware(history),
  // ].concat(Object.keys(middleware).map(mid => middleware[mid]));

  const enhancer = compose(
    // applyMiddleware(...middlewares),
    applyMiddleware(thunk, routerMiddleware(history), api, geolocate, createLogger()),
    persistState(states),
    // Required! Enable Redux DevTools with the monitors you chose
    DevTools.instrument(),
  );

  const store = createStore(
    rootReducer,
    initialState,
    enhancer,
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () =>
      /* eslint-disable global-require */
      store.replaceReducer(require('../reducers').default),
      /* eslint-enable global-require */
    );
  }

  return store;
}
