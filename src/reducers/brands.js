const INITIAL_STATE = [];

export default function brandsReducer(state = INITIAL_STATE, { type, response, error }) {
  if (type.includes('BRANDS_')) {
    const newState = state.slice();

    if (type === 'BRANDS_CLEAR') {
      return [];
    }

    if (type === 'BRANDS_REQUEST') {
      /*...*/
    }

    if (type === 'BRANDS_SUCCESS') {
      return response.aggregations.brands.buckets.map(bucket => bucket.key);
    }

    if (type === 'BRANDS_FAILURE') {
      /*...*/
    }
  }

  return state;
}

brandsReducer.initialState = INITIAL_STATE;
