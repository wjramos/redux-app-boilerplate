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
        '$type',
        'article_deck',
        'article_page',
        'article_pdf_index',
        'article_section',
        'article_startingPage',
        'asset_path',
        'asset_path_signed',
        'asset_path_expiration',
        'asset_thumbnail',
        'asset_thumbnailurl',
        'issue_article',
        'issue_article/$',
        'issue_article/asset_thumbnail',
        // 'issue_brand',
        'issue_cover',
        'issue_cover/asset_thumbnail',
        'issue_dcpLead',
        'issue_pdf',
        'issue_toc/asset_thumbnail',
      ],
      // Try to combine requests getEditions into getIssues
      aggregations: {
        editions: {
          terms: {
            field: 'issue_edition.raw',
            // size: 0,
          },
        },
      },
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
              // (edition ? { match: { issue_edition: edition } } : {}),
            ],
          },
        },
        filter: {
          and: [
            { exists: { field: 'issue_pdf' } },
            { exists: { field: 'asset_thumbnail' } },
          ],
        },
      },
    },
    headers: {
      'x-api-key': (qa ? CAAS.TOKEN.QA : CAAS.TOKEN.PROD),
    },
  },
});
