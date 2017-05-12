export default function geocodeReducer(state = {}, { type, response, error }) {
  if (type.includes('GEOCODE_')) {
    const newState = Object.assign({}, state);

    if (type === 'GEOCODE_REQUEST') {
      return state;
    }

    if (type === 'GEOCODE_SUCCESS') {
      return response;
    }

    if (type === 'GEOCODE_FAILURE') {
      console.error(error);
      return state;
    }
  }

  return state;
}
