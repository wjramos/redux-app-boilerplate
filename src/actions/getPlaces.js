const uri = 'https://bkr58xmmj2.execute-api.us-west-1.amazonaws.com/prod/places';

export default function getLocation(body) {
  return dispatch => dispatch({
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
    },
  });
}
