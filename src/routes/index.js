import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Issues from '../containers/Issues';
// import { Issues } from '../containers';

export default (
  <Route path="/" component={Issues}>
    <IndexRoute component={Issues} />
  </Route>
);
