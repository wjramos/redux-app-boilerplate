import 'isomorphic-fetch';
import request from 'request-promise';

export default (/* store */) => next => async action => {
  const { middleware, types, options, uri/*, onComplete*/ } = action;

  if (middleware === 'API') {
    const [requestType, successType, failureType] = types;
    next(Object.assign(
      {},
      action,
      { type: requestType }
    ));

    let response;
    try {
      response = await request(options || uri);
    } catch (e) {
      return next({
        type: failureType,
        error: e.message || 'Something bad happened',
      });
    }

    // if (onComplete) {
    //   onComplete({ response, statusCode });
    // }

    // if (err || (statusCode && (statusCode < 200 || statusCode > 299))) {
    //   return next({
    //     type: failureType,
    //     response,
    //   });
    // }

    return next({
      type: successType,
      response,
    });
  }

  return next(action);
};
