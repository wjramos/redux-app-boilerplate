const INITIAL_STATE = {};

export default function issuesReducer(state = INITIAL_STATE, { type, brand, params, response, error }) {
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
      if (response) {
        const issues = response.entities;
        if (issues && issues.length) {
          newState[params.brand] = newState[params.brand]
          ? [...new Set(newState[params.brand].concat(issues))]
          : issues;

          return newState;
        }
      }
    }

    if (type === 'ISSUES_FAILURE') {
      /* ... */
    }
  }

  return state;
}

issuesReducer.initialState = INITIAL_STATE;
