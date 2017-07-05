import React, { PureComponent } from 'react';
import Ionicon from 'react-ionicons';
import Pdf from 'react-pdf-js';
import { SpinLoader } from 'react-css-loaders';

import { Sticky, Swipe } from '../';

const BACKGROUND = '#222';

export default class PdfReader extends PureComponent {
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
    const increment = this.props.landscape ? 2 : 1;
    this.setState({ page: this.state.page - increment });
  }

  onNext() {
    const increment = this.props.landscape ? 2 : 1;
    this.setState({ page: this.state.page + increment });
  }

  onReader() {

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
      <span style={{
        position: 'absolute',
        textAlign: 'center',
        lineHeight: '24px',
        height: '100%',
        width: '100%',
        bottom: 0,
      }}>
        {this.state.page}&nbsp;/&nbsp;{this.state.pages}
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
              alignItems: 'center',
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
      <div style={{ display: 'flex', flexFlow: 'column nowrap' }}>
        <SpinLoader
          color="#fff"
          background={BACKGROUND}
          size={6}
        />
        <p style={{ textAlign: 'center' }}>
          Loading PDF...
        </p>
      </div>
    );
  }

  get pdf() {
    if (this.props.landscape) {
      return (
        <Swipe
          onSwipeLeft={::this.onPrevious}
          onSwipeRight={::this.onNext}
          onSwipeUp={::this.openReader}
          style={{
            color: '#fff',
            display: 'flex',
            flexFlow: 'row nowrap',
            justifyContent: 'center',
            backgroundColor: BACKGROUND,
            alignItems: 'center',
            height: '100vh',
            width: '100vw',
          }}
        >
          <Pdf
            onDocumentComplete={::this.onDocumentComplete}
            onPageComplete={::this.onPageComplete}
            page={this.state.page}
            loading={this.loader}
            file={this.props.pdf}
            style={{ height: '100%' }}
          />
          <Pdf
            page={this.state.page + 1}
            loading={(<span />)}
            file={this.props.pdf}
            style={{ height: '100%' }}
          />
        </Swipe>
      )
    }

    return (
      <Swipe
        onSwipeLeft={::this.onPrevious}
        onSwipeRight={::this.onNext}
        onSwipeUp={::this.openReader}
        style={{
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'center',
          backgroundColor: BACKGROUND,
          alignItems: 'center',
          height: '100vh',
          width: '100vw',
        }}
      >
        <Pdf
          onDocumentComplete={::this.onDocumentComplete}
          onPageComplete={::this.onPageComplete}
          page={this.state.page}
          loading={this.loader}
          file={this.props.pdf}
        />
      </Swipe>
    )
  }

  render() {
    return (
      <div style={{ color: '#fff', textShadow: '0 0 2px #000' }}>
        {this.pdf}
        {this.pagination}
      </div>
    );
  }
}
