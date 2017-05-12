import { dispatch } from 'react-redux';
import { getPlaces } from './';

const API_KEY = 'AIzaSyAh4C89mQWly4_IIVPMHWdFwTMQeEsErg8';
const GEOCODE = `https://maps.googleapis.com/maps/api/geocode/json?key=${API_KEY}`;

const CACHE_TTL = 30 * 60 * 1000; // 30 min
const cache = new Map();

export default function (address, facets) {
  const cached = cache.get(address);

  if (cached && Date.now() < cached.expires) {
    return {
      type: 'LOCATION_GEOCODE_CACHED',
      response: cached.response,
    };
  }

  return dispatch => dispatch({
    middleware: 'API',
    types: [
      'LOCATION_GEOCODE_REQUEST',
      'LOCATION_GEOCODE_SUCCESS',
      'LOCATION_GEOCODE_FAILURE',
    ],
    options: {
      uri: `${GEOCODE}&address=${address}`,
      json: true,
    },
    onComplete: ({ response }) => {
      const [point] = response.results || [];
      const { lat: latitude, lng: longitude } = point && point.geometry ? point.geometry.location : { lat: 0, lng: 0 };
      
      cache.set(address, { response, expires: Date.now() + CACHE_TTL });
      // location: `${latitude},${longitude}`, //: STRING, --> The desired location in "lat,long" format (default: "47.604204,-122.334583")
      const settings = Object.assign({}, { location: `${latitude},${longitude}` }, facets);
      console.log(settings);
      return dispatch(getPlaces(settings));
    },
  });
}
