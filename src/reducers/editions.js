const INITIAL_STATE = [];

export default function brandsReducer(state = INITIAL_STATE, { type, response, error }) {
  if (type.includes('EDITIONS_')) {
    const newState = state.slice();

    if (type === 'EDITIONS_CLEAR') {
      return [];
    }

    if (type === 'EDITIONS_REQUEST') {
      /*...*/
    }

    if (type === 'EDITIONS_SUCCESS') {
      return response.aggregations.editions.buckets.map(bucket => bucket.key);
    }

    if (type === 'EDITIONS_FAILURE') {
      /*...*/
    }
  }

  return state;
}

brandsReducer.initialState = INITIAL_STATE;
