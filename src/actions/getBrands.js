import { CAAS } from './constants';

export default ({ qa }) => dispatch => dispatch({
  middleware: 'API',
  types: [
    'BRANDS_REQUEST',
    'BRANDS_SUCCESS',
    'BRANDS_FAILURE',
  ],
  options: {
    method: 'POST',
    uri: CAAS.URI + (/*qa ? CAAS.TLD.QA : */CAAS.TLD.PROD ) + '/search',
    json: true,
    body: {
      type: 'issue',
      provider: (/*qa ? 'xip' : */'internal_typed_index'),
      size: 0,
      query: {
        aggs: {
          brands: {
            terms: {
              field: 'brand',
              size: 0,
            },
          },
        },
      },
    },
    headers: {
      'x-api-key': (/*qa ? CAAS.TOKEN.QA : */CAAS.TOKEN.PROD),
    },
  },
});
