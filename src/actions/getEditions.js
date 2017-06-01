import { CAAS } from './constants';

export default ({ brand, qa }) => dispatch => dispatch({
  middleware: 'API',
  types: [
    'EDITIONS_REQUEST',
    'EDITIONS_SUCCESS',
    'EDITIONS_FAILURE',
  ],
  options: {
    method: 'POST',
    uri: CAAS.URI + (qa ? CAAS.TLD.QA : CAAS.TLD.PROD ),
    json: true,
    body: {

    },
    headers: {
      'x-api-key': (qa ? CAAS.TOKEN.QA : CAAS.TOKEN.PROD),
    },
  },
});
