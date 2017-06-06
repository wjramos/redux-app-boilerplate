const INITIAL_STATE = [];

export default function displayReducer(state = INITIAL_STATE, { type, params }) {
  if (type.includes('DISPLAY_')) {
    const newState = state.slice();

    if (type === 'DISPLAY_CLEAR') {
      return [];
    }

    if (type === 'DISPLAY_SET') {
      const { brand, issues, qa, preview } = params;
      if (brand && qa !== undefined) {
        const issueEnv = qa ? 'qa' : 'prod';
        if (issues[brand] && issues[brand][issueEnv]) {
          return issues[brand][issueEnv].filter(
            issue => preview ? true : Date.now >= Date.parse(issue.issue_digitalOnSaleDate)
          ).sort(
            (issueA, issueB) => Date.parse(issueA.issue_date) < Date.parse(issueB.issue_date)
          );
        }
      }

      return newState;
    }
  }

  return state;
}

displayReducer.initialState = INITIAL_STATE;
