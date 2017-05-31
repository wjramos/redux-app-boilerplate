const INITIAL_STATE = false;

export default function brandReducer(state = INITIAL_STATE, { type, qa }) {
  if (type.includes('QA_')) {
    if (type === 'QA_SET') {
      return qa;
    }
  }

  return state;
}

brandReducer.initialState = INITIAL_STATE;
