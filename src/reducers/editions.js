const INITIAL_STATE = {};

export default function editionsReducer(state = INITIAL_STATE, { type, params, response, error }) {
  if (type.includes('EDITIONS_')) {
    const issueEnv = params.qa ? 'qa' : 'prod';
    const newState = Object.assign({}, state);

    if (type === 'EDITIONS_CLEAR') {
      if (params.brand) {
        if (state[params.brand] && params.qa !== undefined) {
          delete newState[params.brand][issueEnv];
          return newState;
        }

        delete newState[params.brand];
        return newState;
      }

      return {};
    }

    if (type === 'EDITIONS_REQUEST') {
      /* ... */
    }

    if (type === 'EDITIONS_SUCCESS') {
      const issues = response.entities;
      if (issues && issues.length) {
        const editions = response.aggregations.editions.buckets.map(bucket => bucket.key);

        if (!newState[params.brand]) {
          newState[params.brand] = {};
        }

        newState[params.brand][issueEnv] = editions;

        return newState;
      }
    }

    if (type === 'EDITIONS_FAILURE') {
      /* ... */
    }
  }

  return state;
}

editionsReducer.initialState = INITIAL_STATE;
