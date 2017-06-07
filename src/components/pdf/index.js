import React, { Component } from 'react';
import Ionicon from 'react-ionicons';
import Pdf from 'react-pdf-js';
import { SpinLoader } from 'react-css-loaders';

import { Sticky } from '../';

const BACKGROUND = '#222';

export default class PdfReader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
    };
  }

  onDocumentComplete(pages) {
    this.setState({ page: 1, pages });
  }

  onPageComplete(page) {
    this.setState({ page });
  }

  onPrevious() {
    this.setState({ page: this.state.page - 1 });
  }

  onNext() {
    this.setState({ page: this.state.page + 1 });
  }

  get previousButton() {
    const first = this.state.page === 1;

    return (
      <li onClick={first ? null : ::this.onPrevious}>
        <Ionicon icon="ion-arrow-left-b" color="#fff" style={{ verticalAlign: 'middle' }} />&nbsp;Previous
      </li>
    );
  }

  get nextButton() {
    const last = this.state.page === this.state.pages;
    return (
      <li onClick={last ? null : ::this.onNext}>
         Next&nbsp;<Ionicon icon="ion-arrow-right-b" color="#fff" style={{ verticalAlign: 'middle' }} />
      </li>
    );
  }

  get pageCounter() {
    return (
      <span style={{ position: 'absolute', lineHeight: '24px', bottom: 0, textAlign: 'center', width: '100%', height: '100%' }}>
        {this.state.page}/{this.state.pages}
      </span>
    );
  }

  get pagination() {
    if (this.state.pages) {
      return (
        <Sticky stuck bottom>
          <nav>
            {this.pageCounter}
            <ul style={{
              display: 'flex',
              flexFlow: 'row nowrap',
              justifyContent: 'space-between',
            }}>
              {this.previousButton}
              {this.nextButton}
            </ul>
          </nav>
        </Sticky>
      );
    }

    return null;
  }

  get loader() {
    return (
      <SpinLoader
        color="#fff"
        background={BACKGROUND}
        size={6}
      />
    );
  }

  render() {
    return (
      <div style={{
        color: '#fff',
        backgroundColor: BACKGROUND,
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'space-around',
      }}>
        <Pdf
          onDocumentComplete={::this.onDocumentComplete}
          onPageComplete={::this.onPageComplete}
          loading={this.loader}
          page={this.state.page}
          file={this.props.pdf}
          style={{ width: '100%' }}
        />
        {this.pagination}
      </div>
    );
  }
}
