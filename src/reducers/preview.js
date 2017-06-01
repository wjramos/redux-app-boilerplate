const INITIAL_STATE = true;

export default function previewReducer(state = INITIAL_STATE, { type, preview }) {
  if (type.includes('PREVIEW_')) {
    if (type === 'PREVIEW_SET') {
      return preview;
    }
  }

  return state;
}

previewReducer.initialState = INITIAL_STATE;
