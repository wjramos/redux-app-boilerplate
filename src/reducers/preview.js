const INITIAL_STATE = true;

export default function brandReducer(state = INITIAL_STATE, { type, preview }) {
  if (type.includes('PREVIEW_')) {
    if (type === 'PREVIEW_SET') {
      return preview;
    }
  }

  return state;
}

brandReducer.initialState = INITIAL_STATE;
