import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Main from '../containers/Main';
// import { Main } from '../containers';

export default (
  <Route path="/" component={Main}>
    <IndexRoute component={Main} />
  </Route>
);
