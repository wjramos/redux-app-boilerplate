const INITIAL_STATE = '';

export default function editionReducer(state = INITIAL_STATE, { type, edition }) {
  if (type.includes('EDITION_')) {
    if (type === 'EDITION_CLEAR') {
      return '';
    }

    if (type === 'EDITION_SET') {
      return edition;
    }
  }

  return state;
}

editionReducer.initialState = INITIAL_STATE;
