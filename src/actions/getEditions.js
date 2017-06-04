import { CAAS } from './constants';

export default ({ brand, qa }) => dispatch => dispatch({
  middleware: 'API',
  types: [
    'EDITIONS_REQUEST',
    'EDITIONS_SUCCESS',
    'EDITIONS_FAILURE',
  ],
  params: { brand, qa },
  options: {
    method: 'POST',
    uri: CAAS.URI + (/*qa ? CAAS.TLD.QA : */CAAS.TLD.PROD) + '/search',
    json: true,
    body: {
      type: 'issue',
      provider: (/*qa ? 'xip' : */'internal_typed_index'),
      // size: 0,
      query: {
        query: {
          constant_score: {
            filter: {
              and: [
                {
                  term: { brand },
                },
              ],
            },
          },
        },
        aggregations: {
          editions: {
            terms: {
              field: 'issue_edition.raw',
              // size: 0,
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
