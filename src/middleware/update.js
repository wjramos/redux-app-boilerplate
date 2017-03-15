/**
 * Middleware to POST to and GET from server chat logs new messages
 **/

function actionWith(data, action) {
  return Object.assign({}, action, data);
}

export default store => next => action => {
  //@TODO Server PUT & GET
  if (action.middleware && action.middleware.includes('UPDATE_CHAT')) {
    const [type, successType, failureType] = action.data.types;
    next(actionWith({ type }, action));

    return postMessage(action).then(
      response => next(actionWith({
        type: successType,
        response,
      })),
      error => next(actionWith({
        type: failureType,
        error,
      })),
    );
  }

  return next(action);
}
