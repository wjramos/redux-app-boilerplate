const INITIAL_STATE = false;

export default function qaReducer(state = INITIAL_STATE, { type, qa }) {
  if (type.includes('QA_')) {
    if (type === 'QA_SET') {
      return qa;
    }
  }

  return state;
}

qaReducer.initialState = INITIAL_STATE;
