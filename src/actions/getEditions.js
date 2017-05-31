import { CAAS } from './constants';

export default ({ brand, prod }) => dispatch => dispatch({
  middleware: 'API',
  types: [
    'EDITIONS_REQUEST',
    'EDITIONS_SUCCESS',
    'EDITIONS_FAILURE',
  ],
  options: {
    method: 'POST',
    uri: CAAS.URI + (prod ? CAAS.TLD.PROD : CAAS.TLD.QA),
    json: true,
    body: {

    },
    headers: {
      'x-api-key': (prod ? CAAS.TOKEN.PROD : CAAS.TOKEN.QA),
    },
  },
});
