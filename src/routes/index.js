import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Chat from '../containers/Chat';

export default (
  <Route path="/" component={Chat}>
    <IndexRoute component={Chat} />
  </Route>
);
