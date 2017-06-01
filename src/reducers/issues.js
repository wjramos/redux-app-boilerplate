const INITIAL_STATE = [];

export default function issuesReducer(state = INITIAL_STATE, { type, response, error }) {
  if (type.includes('ISSUES_')) {
    const newState = state.slice();

    if (type === 'ISSUES_CLEAR') {
      return [];
    }

    if (type === 'ISSUES_REQUEST') {
      /* ... */
    }

    if (type === 'ISSUES_SUCCESS') {
      if (response.entities) {
        return [...new Set(newState.concat(response.entities))];
      }
    }

    if (type === 'ISSUES_FAILURE') {
      /* ... */
    }
  }

  return state;
}

issuesReducer.initialState = INITIAL_STATE;
