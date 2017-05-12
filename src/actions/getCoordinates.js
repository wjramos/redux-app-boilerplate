const API_KEY = 'AIzaSyDwcKtZ5xsmrQgckjzK_IarTzZeFAPeMYE';
const GEOCODE = `https://maps.googleapis.com/maps/api/geocode/json?key=${API_KEY}`;

export default address => dispatch => dispatch({
  middleware: 'API',
  types: [
    'GEOCODE_REQUEST',
    'GEOCODE_SUCCESS',
    'GEOCODE_FAILURE',
  ],
  uri: `${GEOCODE}&address=${address}`,
});
