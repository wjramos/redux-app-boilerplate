import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '../containers/App';
import Issue from '../containers/Issue';
import Issues from '../containers/Issues';
// import { App, Issue, Issues } from '../containers';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Issues} />
    <Route path="/issues" component={Issues} />
    <Route path="/issue/:id" component={Issue} />
  </Route>
);
