const INITIAL_STATE = {};

export default function brandsReducer(state = INITIAL_STATE, { type, params, response, error }) {
  if (type.includes('BRANDS_')) {
    const newState = Object.assign({}, state);
    const issueEnv = params.qa ? 'qa' : 'prod';

    if (type === 'BRANDS_CLEAR') {
      if (params.qa !== undefined) {
        delete newState[issueEnv];
        return newState;
      }

      return {};
    }

    if (type === 'BRANDS_REQUEST') {
      /*...*/
    }

    if (type === 'BRANDS_SUCCESS') {
      newState[issueEnv] = response.aggregations.brands.buckets.map(bucket => bucket.key);
      return newState;
    }

    if (type === 'BRANDS_FAILURE') {
      /*...*/
    }
  }

  return state;
}

brandsReducer.initialState = INITIAL_STATE;
