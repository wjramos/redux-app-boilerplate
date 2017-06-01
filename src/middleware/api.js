import 'isomorphic-fetch';
import request from 'request-promise';

import { PROXY } from './constants';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

export default (/* store */) => next => async action => {
  if (action.middleware === 'API') {
    const { types, options, uri, onComplete, proxy = true } = action;
    const [requestType, successType, failureType] = types;

    next(Object.assign({}, action, { type: requestType }));

    try {
      let result;
      if (proxy) {
        result = await request({
          uri: PROXY.URI,
          method: 'POST',
          json: true,
          body: options || { uri },
          headers: {
            'x-api-key': PROXY.TOKEN,
          },
        });
      } else {
        result = await request(options || uri);
      }

      while (typeof result === 'string') {
        result = JSON.parse(result);
      }

      const { statusCode = 200, err, errorMessage, body } = result;
      const response = body && typeof body === 'string' ? JSON.parse(body) : body || result;

      if (response.errorMessage) {
        throw response.errorMessage;
      }

      next({
        type: successType,
        response,
      });

      if (onComplete) {
        onComplete({ response, statusCode });
      }

      return null;
    } catch (e) {
      return next({
        type: failureType,
        error: e.message || e,
      });
    }
  }

  return next(action);
};
