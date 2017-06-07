function actionWith(action, result, type) {
  const out = Object.assign(
      {},
      action,
      { result },
      { type },
  );
  return out;
}

async function wait(action, next) {
  const exceptionCallback = action.data.types[1].name;
  return new Promise(resolve => {
    try {
      action.cordovaPlugin(
        ...action.data.input,
        firstResult => {
          const out = actionWith(action, firstResult, action.data.types[2].name);
          action.data.types[2].resolvable !== false ? resolve(out) : next(out); // eslint-disable-line no-unused-expressions
        },
        secondResult => {
          const out = actionWith(action, secondResult, action.data.types[3].name);
          action.data.types[3].resolvable !== false ? resolve(out) : next(out); // eslint-disable-line no-unused-expressions
        },
        thirdResult => {
          const out = actionWith(action, thirdResult, action.data.types[4].name);
          action.data.types[4].resolvable !== false ? resolve(out) : next(out); // eslint-disable-line no-unused-expressions
        },
        fourthResult => {
          const out = actionWith(action, fourthResult, action.data.types[5].name);
          action.data.types[5].resolvable !== false ? resolve(out) : next(out); // eslint-disable-line no-unused-expressions
        },
        fifthResult => {
          const out = actionWith(action, fifthResult, action.data.types[6].name);
          action.data.types[6].resolvable !== false ? resolve(out) : next(out); // eslint-disable-line no-unused-expressions
        }
      );
    } catch (result) {
      const out = Object.assign(
        {},
        action,
        { type: exceptionCallback },
        { middleware: ['CORDOVA_PLUGIN'] },
        { result },
      );
      resolve(out);
    }
  });
};

export default (/* store */) => next => action => {   // eslint-disable-line
  if (action.middleware === 'CORDOVA_PLUGIN') {
    const actionCallback = action.data.types[0].name;
    const out = Object.assign(
      {},
      action,
      { type: actionCallback },
    );
    next(out);

    return wait(action, next).then(result => next(result));
  } else {
    return next(action);
  }
};
