export default function placesReducer(state = [], { type, places, error }) {
  if (type.includes('PLACES_')) {
    const newState = Object.assign({}, state);

    if (type === 'PLACES_REQUEST') {
      return state;
    }

    if (type === 'PLACES_SUCCESS') {
      return places;
    }

    if (type === 'PLACES_FAILURE') {
      console.error(error);
      return state;
    }

    if (type === 'PLACES_SET') {
      return places;
    }

  }

  return state;
}
