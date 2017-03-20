import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Order from '../containers/Order';

export default (
  <Route path="/" component={Order}>
    <IndexRoute component={Order} />
  </Route>
);
