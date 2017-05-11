import 'isomorphic-fetch';
import request from 'request-promise';

export default (/* store */) => next => async action => {
  const { middleware, types, options, uri, onComplete } = action
  if (middleware === 'CALL_API') {
    const [requestType, successType, failureType] = types;
    next(Object.assign({}, action, { type: requestType }));

    try {
      const result = await request(options || uri);
      const { statusCode, err, body } = result;
      const response = result ? JSON.parse(body || result) : null;

      if (onComplete) {
        onComplete({ response, statusCode });
      }

      if (err || (statusCode && (statusCode < 200 || statusCode > 299))) {
        return next({
          type: failureType,
          response,
        });
      }

      return next({
        type: successType,
        response,
      });
    } catch (e) {
      return next({
        type: failureType,
        error: e.message || 'Something bad happened',
      });
    }
  }

  return next(action);
};
