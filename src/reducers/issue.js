const INITIAL_STATE = {};

export default function issueReducer(state = INITIAL_STATE, { type, issue }) {
  if (type.includes('ISSUE_')) {
    if (type === 'ISSUE_CLEAR') {
      return {};
    }

    if (type === 'ISSUE_SET') {
      return issue;
    }
  }

  return state;
}

issueReducer.initialState = INITIAL_STATE;
