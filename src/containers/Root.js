import networkListener from 'redux-queue-offline-listener';
import React, { PropTypes, Component } from 'react';
import { Provider } from 'react-redux';

import routes from '../routes';
import DevTools from './DevTools';
import { Router } from 'react-router';

const NetworkListenerProvider = networkListener(Provider);
export default class Root extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  }

  render() {
    const { store, history } = this.props;
    return (
      <NetworkListenerProvider store={store}>
        <div>
          <Router history={history} routes={routes} />
          <DevTools />
        </div>
      </NetworkListenerProvider>
    );
  }
}
