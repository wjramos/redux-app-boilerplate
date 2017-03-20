import React from 'react';
import FastClick from 'fastclick';
import { render } from 'react-dom';
import { hashHistory } from 'react-router';
import { StyleRoot, Style } from 'radium';
import { syncHistoryWithStore } from 'react-router-redux';

import style from './style'
import Root from './containers/Root';
import configureStore from './stores/configureStore';

function init() {
  FastClick.attach(document.body);
  /* Create a Redux store holding the state of app. */
  const reduxStore = configureStore();

  /* Create an enhanced history that syncs navigation events with the store. */
  const history = syncHistoryWithStore(hashHistory, reduxStore);

  /* Render Root component */
  render(
    (
      <StyleRoot>
        <Style rules={style} />
        <Root store={reduxStore} history={history} />
      </StyleRoot>
    ),
    document.getElementById('app'),
  );

  window.addEventListener('statusTap', () => window.scroll(0, 0));
}

/* Eliminating 300ms delay between a physical tap and the firing of event. */
if ('addEventListener' in document) {
  document.addEventListener('deviceready', () => init(), false);
  document.addEventListener('DOMContentLoaded', () => init(), false);
}
