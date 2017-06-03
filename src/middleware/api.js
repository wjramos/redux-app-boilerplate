import 'isomorphic-fetch';
import request from 'request-promise';

import { PROXY } from './constants';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

export default (/* store */) => next => async action => {
  if (action.middleware === 'API') {
    const { types, options, uri, params, onComplete, proxy = true } = action;
    const [requestType, successType, failureType] = types;

    next(Object.assign({}, action, { type: requestType }));

    try {
      let response;
      if (proxy) {
        response = await request({
          uri: PROXY.URI,
          method: 'POST',
          json: true,
          body: options || { uri },
          headers: {
            'x-api-key': PROXY.TOKEN,
          },
        });
      } else {
        response = await request(options || uri);
      }

      while (typeof response === 'string') {
        response = JSON.parse(response);
      }

      if (!response) {
        throw new Error('No results');
      }

      next({
        type: successType,
        response,
        params,
      });

      if (onComplete) {
        onComplete({ response, statusCode });
      }

      return null;
    } catch (e) {
      return next({
        type: failureType,
        error: e.message || e,
        params,
      });
    }
  }

  return next(action);
};
