const INITIAL_STATE = [];

export default function displayReducer(state = INITIAL_STATE, { type, params }) {
  if (type.includes('DISPLAY_')) {
    const issueEnv = qa ? 'qa' : 'prod';
    const newState = state.slice();

    if (type === 'DISPLAY_CLEAR') {
      return [];
    }

    if (type === 'DISPLAY_SET') {
      const { issues, edition, preview } = params;
      if (issues) {
        if (edition || preview === false) {
          return issues.filter(
            issue => (preview ? true : Date.now() >= Date.parse(issue.issue_digitalOnSaleDate))
            && (edition && edition !== 'all' ? issue.issue_edition === edition : true)
          ).sort(
            (issueA, issueB) => Date.parse(issueA.issue_date) < Date.parse(issueB.issue_date)
          );
        }

        return issues;
      }

      return newState;
    }
  }

  return state;
}

displayReducer.initialState = INITIAL_STATE;
