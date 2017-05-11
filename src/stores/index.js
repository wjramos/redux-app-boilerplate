import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import persistState from 'redux-localstorage';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';
import * as reducers from '../reducers/';
import { api } from '../middleware';
import { DevTools } from '../containers';

export default function configureStore(history, initialState = {}) {
  const enhancer = compose(
    applyMiddleware(
      thunk,
      routerMiddleware(history),
      api,
      createLogger(),
    ),
    persistState([
      'offlineQueue',
    ].concat(Object.keys(reducers))),
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
