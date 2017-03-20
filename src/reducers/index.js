import { combineReducers } from 'redux';
import { reducer as offlineQueue } from 'redux-queue-offline';
import { routerReducer as routing } from 'react-router-redux';

import inventory from './inventory';
import items from './items';
import selected from './selected';
import category from './category';

export default combineReducers({
  inventory,
  items,
  selected,
  category,
  routing,
  offlineQueue,
});
