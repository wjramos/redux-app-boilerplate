import { combineReducers } from 'redux';
import { reducer as offlineQueue } from 'redux-queue-offline';
import { routerReducer as routing } from 'react-router-redux';

import * as reducers from './reducers/';

export default combineReducers(
  Object.assign(
    {},
    reducers,
    { routing, offlineQueue }
  )
);
