// const API_KEY = 'AIzaSyAh4C89mQWly4_IIVPMHWdFwTMQeEsErg8';
// const PLACES_API = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${API_KEY}`;
const uri = 'https://bkr58xmmj2.execute-api.us-west-1.amazonaws.com/prod/places';

export default body => dispatch => dispatch({
  middleware: 'API',
  types: [
    'PLACES_REQUEST',
    'PLACES_SUCCESS',
    'PLACES_FAILURE',
  ],
  options: {
    uri,
    method: 'POST',
    body,
    json: true,
  },
});
