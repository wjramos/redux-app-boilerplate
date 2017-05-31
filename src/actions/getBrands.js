import { CAAS } from './constants';

export default ({ prod }) => dispatch => dispatch({
  middleware: 'API',
  types: [
    'BRANDS_REQUEST',
    'BRANDS_SUCCESS',
    'BRANDS_FAILURE',
  ],
  options: {
    method: 'POST',
    uri: CAAS.URI + (prod ? CAAS.TLD.PROD : CAAS.TLD.QA),
    json: true,
    body: {
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
      size: 0,
      type: 'issue',
      provider: 'xip',
    },
    headers: {
      'x-api-key': (prod ? CAAS.TOKEN.PROD : CAAS.TOKEN.QA),
    },
  },
});
