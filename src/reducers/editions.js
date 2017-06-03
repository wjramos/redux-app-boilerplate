const INITIAL_STATE = {};

export default function brandsReducer(state = INITIAL_STATE, { type, brand, params, response, error }) {
  if (type.includes('EDITIONS_')) {
    const newState = Object.assign({}, state);

    if (type === 'EDITIONS_CLEAR') {
      if (brand) {
        delete newState[brand];
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
        newState[params.brand] = editions;

        // Combine
        // newState[brand] = newState[brand]
        //   ? [...new Set(newState[brand].concat(editions))]
        //   : editions;

        return newState;
      }
    }

    if (type === 'EDITIONS_FAILURE') {
      /* ... */
    }
  }

  return state;
}

brandsReducer.initialState = INITIAL_STATE;
