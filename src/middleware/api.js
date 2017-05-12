import 'isomorphic-fetch';
import request from 'request-promise';

export default (/* store */) => next => async action => {
  const { middleware, types, options, uri, onComplete } = action;

  if (middleware === 'API') {
    const [requestType, successType, failureType] = types;
    next(Object.assign(
      {},
      action,
      { type: requestType }
    ));

    try {
      const response = await request(options || uri);

      if (onComplete) {
        onComplete({ response/*, statusCode*/});
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

    // if (err || (statusCode && (statusCode < 200 || statusCode > 299))) {
    //   return next({
    //     type: failureType,
    //     response,
    //   });
    // }
  }

  return next(action);
};
