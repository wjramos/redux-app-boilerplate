import { CAAS } from './constants';

export default ({ qa }) => dispatch => dispatch({
  middleware: 'API',
  types: [
    'BRANDS_REQUEST',
    'BRANDS_SUCCESS',
    'BRANDS_FAILURE',
  ],
  params: { qa },
  options: {
    method: 'POST',
    uri: CAAS.URI + (qa ? CAAS.TLD.QA : CAAS.TLD.PROD ) + '/search',
    json: true,
    body: {
      type: 'issue',
      provider: (qa ? 'xip' : 'internal_typed_index'),
      query: {
        // size: 0,
        aggregations: {
          brands: {
            terms: {
              field: 'brand',
            },
          },
        },
      },
    },
    headers: {
      'x-api-key': (qa ? CAAS.TOKEN.QA : CAAS.TOKEN.PROD),
    },
  },
});
