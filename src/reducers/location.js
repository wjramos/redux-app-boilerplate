const NEW_YORK = {
  latitude: 40.7177419,
  longitude: -74.0160985,
};

const SEATTLE = {
  latitude: 47.4996176,
  longitude: -122.6059982,
};

export default function locationReducer(state = NEW_YORK, { type, location, error }) {
  if (type.includes('LOCATION_')) {
    const newState = Object.assign({}, state);

    if (type === 'LOCATION_REQUEST') {
      return state;
    }

    if (type === 'LOCATION_SUCCESS') {
      return location;
    }

    if (type === 'LOCATION_FAILURE') {
      console.error(error);
      return state;
    }

    if (type === 'LOCATION_SET') {
      return location;
    }

  }

  return state;
}
