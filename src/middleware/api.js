import 'isomorphic-fetch';
import request from 'request-promise';

const API_ROOT = 'https://raw.githubusercontent.com/francisd/exercise/master/';

const callApi = async function callApi(endpoint, body, headers = {}, method) {
  const uri = API_ROOT + endpoint;
  const options = {
    uri,
    body,
    headers,
  };
  if (method === 'POST') {
    return await request.post(options);
  }

  if (method === 'PUT') {
    return await request.put(options);
  }

  return await request.get({ uri, headers })
};

function actionWith(data, action) {
  return Object.assign({}, action, data);
}

export default store => next => action => {
  if (action.middleware && action.middleware.includes('CALL_API')) {
    const { types, endpoint, body, headers, method } = action.data;
    const [requestType, successType, failureType] = types;

    next(actionWith({ type: requestType }, action));

    return callApi(endpoint, body, headers, method).then(
        response => {
          if (response.statusCode < 200 || response.statusCode > 299) {
            next(actionWith({
              response,
              type: failureType,
            }));
          } else {
            next(actionWith({
              response,
              type: successType,
            }));
          }
        },
        error => next(actionWith({
          type: failureType,
          error: error.message || 'Something bad happened',
        })),
    );
  } else {
    return next(action);
  }
};
