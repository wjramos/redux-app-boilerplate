const INITIAL_STATE = {};

export default function tracksReducer(state = INITIAL_STATE, { type, response, error }) {

  if (type.includes('TRACKS_')) {
    const newState = Object.assign({}, state);

    if (type === 'TRACKS_REQUEST') {
      return state;
    }

    if (type === 'TRACKS_SUCCESS') {
      return response;
    }

    if (type === 'TRACKS_FAILURE') {
      console.error(error);
      return state;
    }
  }

  return state;
}

tracksReducer.initialState = INITIAL_STATE;
