export default () => dispatch => dispatch({
  middleware: 'GEOLOCATE',
  types: [
    'LOCATION_REQUEST',
    'LOCATION_SUCCESS',
    'LOCATION_FAILURE',
  ],
});
