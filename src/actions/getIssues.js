import { CAAS } from './constants';

export default ({ brand, limit, offset, edition, preview, qa }) => dispatch => dispatch({
  middleware: 'API',
  types: [
    'ISSUES_REQUEST',
    'ISSUES_SUCCESS',
    'ISSUES_FAILURE',
  ],
  params: { brand, limit, offset, edition, preview, qa },
  options: {
    method: 'POST',
    uri: CAAS.URI + (qa ? CAAS.TLD.QA : CAAS.TLD.PROD) + '/search',
    json: true,
    body: {
      type: 'issue',
      provider: (qa ? 'xip' : 'internal_typed_index'),
      follow: [
        '$sameAs',
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
          bool: {
            must: [
              { match: { brand } },
              (edition ? { match: { issue_edition: edition } } : {}),
            ],
          },
        },
        filter: {
          and: [
            { exists: { field: 'issue_pdf' } },
            { exists: { field: 'asset_thumbnail' } },
            (!preview ? { range: {
              issue_digitalOnSaleDate: { lte: new Date().toISOString() },
            } } : {}),
          ],
        },
      },
    },
    headers: {
      'x-api-key': (qa ? CAAS.TOKEN.QA : CAAS.TOKEN.PROD),
    },
  },
});
