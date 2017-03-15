import { combineReducers } from 'redux';
import { reducer as offlineQueue } from 'redux-queue-offline';
import { routerReducer as routing } from 'react-router-redux';

import chat from './chat';

export default combineReducers({
  chat,
  routing,
  offlineQueue,
});
