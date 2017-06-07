export default ({ nativeUrl, contentType, options }) => (window.SitewaertsDocumentViewer ? (
  dispatch => dispatch({
    middleware: 'CORDOVA_PLUGIN',
    cordovaPlugin: window.SitewaertsDocumentViewer.viewDocument,
    data: {
      types: [
        { name: 'VIEW_PDF_REQUEST' },
        { name: 'VIEW_PDF_FAILURE' },
        {
          name: 'VIEW_PDF_ON_SHOW',
          resolvable: false,
        },
        { name: 'VIEW_PDF_ON_CLOSE' },
        { name: 'VIEW_PDF_ON_MISSING_APP' },
        { name: 'VIEW_PDF_FAILURE' },
        {
          name: 'VIEW_PDF_CURRENT_PAGE',
          resolvable: false,
        },
      ],
      input: [nativeUrl, contentType, options],
    },
  })
) : () => {});
