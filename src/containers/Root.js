import networkListener from 'redux-queue-offline-listener';
import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';

import routes from '../routes';
import DevTools from './DevTools';
import { Router } from 'react-router';

const NetworkListenerProvider = networkListener(Provider);

const Root = props => (
  <NetworkListenerProvider store={props.store}>
    <div>
      <Router history={props.history} routes={routes} />
      {/* <DevTools /> */}
    </div>
  </NetworkListenerProvider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default Root;
