import { CAAS } from './constants';

export default ({ brand, limit = 10, offset = 0, edition, preview, prod }) => dispatch => dispatch({
  middleware: 'API',
  types: [
    'ISSUES_REQUEST',
    'ISSUES_SUCCESS',
    'ISSUES_FAILURE',
  ],
  options: {
    method: 'POST',
    uri: CAAS.URI + (prod ? CAAS.TLD.PROD : CAAS.TLD.QA) + '/search',
    json: true,
    body: {
      query: {
        query: {
          constant_score: {
            filter: {
              and: [
                {
                  term: { brand },
                },
                (edition ? {
                  term: { edition },
                } : {}),
                {
                  exists: {
                    field: 'issue_pdf',
                  },
                },
                {
                  exists: {
                    field: 'asset_thumbnail',
                  },
                },
              ],
            },
          },
        },
        sort: {
          issue_date: {
            unmapped_type: 'long',
            order: 'desc',
          },
          size: limit,
          from: offset,
        },
        type: 'issue',
        provider: 'xip',
        follow: [
          'asset_path',
          'asset_path_signed',
          'asset_path_expiration',
          'asset_thumbnail',
          'issue_pdf',
          // 'issue_brand',
        ],
      },
    },
    headers: {
      'x-api-key': (prod ? CAAS.TOKEN.PROD : CAAS.TOKEN.QA),
    },
  },
});
