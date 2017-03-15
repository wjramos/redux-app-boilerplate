import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import persistState from 'redux-localstorage';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';
import updateChat from '../middleware/update';
import DevTools from '../containers/DevTools';

export default function configureStore(history, initialState = {}) {
  const enhancer = compose(
    applyMiddleware(
      thunk,
      routerMiddleware(history),
      updateChat,
      createLogger(),
    ),
    persistState([
      'offlineQueue',
      'chat',
      'user',
    ]),
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
      store.replaceReducer(require('../reducers').default)
      /* eslint-enable global-require */
    );
  }

  return store;
}
