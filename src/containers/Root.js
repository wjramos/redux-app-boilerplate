import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import networkListener from 'redux-queue-offline-listener';

import routes from '../routes';
import DevTools from './DevTools';
import { Router } from 'react-router';

const NetworkListenerProvider = networkListener(Provider);

export default class Root extends PureComponent {
  static propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  }

  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
      {/* <NetworkListenerProvider store={store}> */}
        {/* <div> */}
        <Router history={history} routes={routes} />
          {/* <DevTools /> */}
        {/* </div> */}
      {/* </NetworkListenerProvider> */}
      </Provider>
    );
  }
}
