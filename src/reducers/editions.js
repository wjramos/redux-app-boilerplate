const INITIAL_STATE = {};

export default function editionsReducer(state = INITIAL_STATE, { type, params, response, error }) {
  if (type.includes('EDITIONS_')) {
    const newState = Object.assign({}, state);

    if (type === 'EDITIONS_CLEAR') {
      if (params.brand) {
        const issueEnv = params.qa ? 'qa' : 'prod';
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
        const issueEnv = params.qa ? 'qa' : 'prod';
        const editions = response.aggregations.editions.buckets.map(bucket => bucket.key);

        if (!newState[params.brand]) {
          newState[params.brand] = { prod: [], qa: [] };
        }

        newState[params.brand][issueEnv] = newState[params.brand][issueEnv]
        ? [...new Set(newState[params.brand][issueEnv].concat(editions))]
        : issues;

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
