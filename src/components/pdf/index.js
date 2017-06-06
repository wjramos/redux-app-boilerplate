import React, { Component } from 'react';
import Pdf from 'react-pdf-js';

export default class PdfReader extends Component {
  constructor(props) {
    this.state = {
      page: 0,
    };
  }

  onDownloadComplete() {
    
  }

  onPageComplete() {

  }

  render() {
    return (
      <Pdf
        file={this.props.pdf}
        onDocumentComplete={::this.onDocumentComplete}
        onPageComplete={::this.onPageComplete}
        page={::this.state.page}
      />
    )
  }
}
