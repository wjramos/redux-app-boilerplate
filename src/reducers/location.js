const NEW_YORK = {
  latitude: 40.7177419,
  longitude: -74.0160985,
};

const SEATTLE = {
  latitude: 47.4996176,
  longitude: -122.6059982,
};

export default function locationReducer(state = NEW_YORK, { type, location, response, error }) {
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

    if (type === 'LOCATION_GEOCODE_REQUEST') {
      return state;
    }

    if (type === 'LOCATION_GEOCODE_SUCCESS' || type === 'LOCATION_GEOCODE_CACHED') {
      const [firstResult] = response.results || [];
      const { address_components: [names], geometry: { location: { lat: latitude = 0, lng: longitude = 0 } = {} } = {} } = firstResult;
      const { short_name: name } = names;
      return { name, latitude, longitude };
    }

    if (type === 'LOCATION_GEOCODE_FAILURE') {
      console.error(error);
      return state;
    }
  }

  return state;
}
