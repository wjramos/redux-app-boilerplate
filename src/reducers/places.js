export default function placesReducer(state = [], { type, response, error }) {
  if (type.includes('PLACES_')) {
    const newState = state.slice();

    if (type === 'PLACES_REQUEST') {
      return state;
    }

    if (type === 'PLACES_SUCCESS') {
      return response;
    }

    if (type === 'PLACES_FAILURE') {
      console.error(error);
      return state;
    }

    if (type === 'PLACES_SET') {
      return response;
    }
  }

  return state;
}
