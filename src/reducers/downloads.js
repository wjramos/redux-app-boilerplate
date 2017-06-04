const INITIAL_STATE = {};

export default function downloadsReducer(state = INITIAL_STATE, { type, id, status, error }) {
  if (type.includes('DOWNLOAD_')) {
    const newState = Object.assign({}, state);

    if (type === 'DOWNLOAD_CLEAR') {
      if (id) {
        delete newState[id];
        return newState;
      }

      return {};
    }

    if (type === 'DOWNLOAD_REQUEST') {
      newState[id] = 0;
      return newState;
    }

    if (type === 'DOWNLOAD_PROGRESS' || type === 'DOWNLOAD_SUCCESS') {
      newState[id] = status;
      return newState;
    }

    if (type === 'DOWNLOAD_FAILURE') {
      newState[id] = -1;
      return newState;
    }
  }

  return state;
}

downloadsReducer.initialState = INITIAL_STATE;
