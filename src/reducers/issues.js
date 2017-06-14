const INITIAL_STATE = {};

export default function issuesReducer(state = INITIAL_STATE, { type, params, response, error }) {
  if (type.includes('ISSUES_')) {
    const issueEnv = params.qa ? 'qa' : 'prod';
    const newState = Object.assign({}, state);

    if (type === 'ISSUES_CLEAR') {
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

    if (type === 'ISSUES_REQUEST') {
      if (!newState[params.brand]) {
        newState[params.brand] = {};
      }
    }

    if (type === 'ISSUES_SUCCESS') {
      if (response) {
        const issues = response.entities;
        if (issues && issues.length) {

          if (!newState[params.brand]) {
            newState[params.brand] = {};
          }

          // Combine new issues to support progressive issue loading with offsets
          newState[params.brand][issueEnv] = newState[params.brand][issueEnv]
          ? [...new Set(newState[params.brand][issueEnv].concat(issues))]
          : issues;
        }
      }

      return newState;
    }

    if (type === 'ISSUES_FAILURE') {
      return newState;
    }
  }

  return state;
}

issuesReducer.initialState = INITIAL_STATE;
