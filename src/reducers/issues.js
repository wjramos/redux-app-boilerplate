const INITIAL_STATE = {};

export default function issuesReducer(state = INITIAL_STATE, { type, response, brand, error }) {
  if (type.includes('ISSUES_')) {
    const newState = Object.assign({}, state);

    if (type === 'ISSUES_CLEAR') {
      if (brand) {
        delete newState[brand];
        return newState;
      }

      return {};
    }

    if (type === 'ISSUES_REQUEST') {
      /* ... */
    }

    if (type === 'ISSUES_SUCCESS') {
      if (response.entities && response.entities.length) {
        const { brand } = response.entities[0];
        newState[brand] = newState[brand]
          ? [...new Set(newState[brand].concat(response.entities))]
          : response.entities;
        return newState;
      }
    }

    if (type === 'ISSUES_FAILURE') {
      /* ... */
    }
  }

  return state;
}

issuesReducer.initialState = INITIAL_STATE;
