import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import { hashHistory } from 'react-router';

export default class MagazineView extends PureComponent {
  static propTypes = {
    issue: PropTypes.object.isRequired,
    location: PropTypes.object,
    viewPdf: PropTypes.func,
    pdfView: PropTypes.object,
  }

  componentDidMount() {
    if (this.props.viewPdf) {
      this.loadViewer();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { location, issue, pdfView } = this.props;
    const ClosedMode = {
      ClosedOnSwipe: 0,
      ClosedOnDone: 1,
      ClosedOnPreview: 2,
    };

    if (nextProps.pdfView.isClosed) {
      const closedOnDone = nextProps.pdfView.closedOnDone;

      if (closedOnDone === ClosedMode.ClosedOnDone) {
        return hashHistory.push(decodeURIComponent(location.query.prevPath));
      }

      const closedPageNumber = nextProps.pdfView.pageNumber;
      const articleIds = [];
      for (const article of nextProps.issue.issue_article) {
        if (article.$id && article.article_pdf_index && article.article_pdf_index.includes(closedPageNumber - 1)) {
          articleIds.push(article.$id);
        }
      }

      if (articleIds.length > 0) {
        // TODO: allow more than one article to show...
        return hashHistory.push(`/article/${articleIds[0]}`);
      }
    }

      return hashHistory.push(`/magazine?page=${nextProps.pdfView.pageNumber}`);
    }

    return null;
  }

  loadViewer() {
    const { issue, latestIssue, location, viewPdf } = this.props;
    const issueName = issue.$name.length > 30 ? `${issue.$name.substring(0, 35)}...` : issue.$name;
    const intPage = parseInt(location.query.page, 10);
    const pageNumber = isNaN(intPage) ? 1 : intPage;

    const VIEWER_OPTIONS = {
      documentView: {
        closeLabel: 'Close',
      },
      navigationView: {
        closeLabel: 'Close',
      },
      email: {
        enabled: false,
      },
      print: {
        enabled: false,
      },
      openWith: {
        enabled: false,
      },
      bookmarks: {
        enabled: false,
      },
      search: {
        enabled: false,
      },
      page: {
        number: pageNumber,
      },
      articles: {
        pages: sessionStorage.online === 'false' ? [] : issue.issue_article_pages,
      },
      title: {
        title: issueName,
      },
      isPreview: {
        isPreview: false,
      },
    };

    if (window.cordova && window.cordova.file) {
      const nativeUrl = `${window.cordova.file.documentsDirectory}${issue.$.id}.pdf`;
      const input = {
        nativeUrl,
        contentType: 'application/pdf',
        options: VIEWER_OPTIONS,
      };
      return viewPdf(input);
    }

    return hashHistory.push('/issues');
  }

  render() {
    return (
      <div />
    );
  }
}
