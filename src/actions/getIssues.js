import { CAAS } from './constants';

export default ({ brand, limit, offset, edition, preview, qa }) => dispatch => dispatch({
  middleware: 'API',
  types: [
    'ISSUES_REQUEST',
    'ISSUES_SUCCESS',
    'ISSUES_FAILURE',
  ],
  options: {
    method: 'POST',
    uri: CAAS.URI + (qa ? CAAS.TLD.QA : CAAS.TLD.PROD) + '/search',
    json: true,
    body: {
      type: 'issue',
      provider: (qa ? 'xip' : 'internal_typed_index'),
      follow: [
        'asset_path',
        'asset_path_signed',
        'asset_path_expiration',
        'asset_thumbnail',
        'issue_pdf',
        // 'issue_brand',
      ],
      query: {
        size: limit,
        from: offset,
        sort: {
          issue_date: {
            unmapped_type: 'long',
            order: 'desc',
          },
        },
        query: {
          constant_score: {
            filter: {
              and: [
                {
                  term: { brand },
                },
                (
                  edition
                  ? { term: { edition } }
                  : {}
                ),
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
      },
    },
    headers: {
      'x-api-key': (qa ? CAAS.TOKEN.QA : CAAS.TOKEN.PROD),
    },
  },
});
