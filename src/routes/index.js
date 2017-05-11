import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Main from '../containers/Main';

export default (
  <Route path="/" component={Main}>
    <IndexRoute component={Main} />
  </Route>
);
