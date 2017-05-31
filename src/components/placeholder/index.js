/**
  * Placeholder component
  */
import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import { LazyTrigger } from '..';
import style from './style';

const DEVICE_WIDTH = parseInt(document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth, 10); // Remove decimals
const IMAGE_QUALITY = 90;
const PLACEHOLDER_WIDTH = 25;
const SCROLL_THRESHOLD = 80;

@Radium
export default class Placeholder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ratio: props.ratio,
      opacity: 0,
    };
  }

  onInit() {
    const { src, width, maxWidth } = this.props;

    if (this.placeholder) {
      const ratio = this.props.ratio || this.getRatio(this.image && this.image.complete ? this.image : this.placeholder);
      if (ratio !== 1) {
        this.setState({ ratio });
      }

      if (!this.image && LazyTrigger.isInViewport(this.placeholder, SCROLL_THRESHOLD)) {
        const quality = IMAGE_QUALITY;
        const width = Math.min(maxWidth, DEVICE_WIDTH * width);

        const image = this.image = new Image();
        image.onload = () => this.setState({ opacity: 1 });
        image.src = this.getImage({ src, quality, width });
      }
    }
  }

  getRatio(image) {
    const { height = 1, width = 1, complete = false } = image || {};
    if (complete) {
      return height / width;
    }

    return 1;
  }

  getImage({ src = '', quality = 90, height = 0, width = 0 }) {
    let query = `https://imagesvc.timeincapp.com/?url=${encodeURIComponent(src)}`;

    if (quality > -1) {
      query += `&q=${quality}`;
    }
    if (height) {
      query += `&h=${height}`;
    }
    if (width) {
      query += `&w=${width}`;
    }
    return query;
  }

  get isComplete() {
    return this.image && this.image.complete;
  }

  get fullImage() {
    const { src } = this.image || {};
    const { opacity } = this.state;
    return (
      <img
        role="presentation"
        src={src}
        onLoad={::this.onInit}
        style={[style.img, style.imgFull, style.fill, { opacity }, this.props.style]}
      />
    );
  }

  get placeholderImage() {
    const { src } = this.props;
    const quality = 0;
    const width = PLACEHOLDER_WIDTH;

    return (
      <img
        role="presentation"
        ref={node => (this.placeholder = node)}
        onLoad={::this.onInit}
        src={this.getImage({ src, quality, width })}
        style={[style.img, style.imgSmall, style.fill, this.props.style]}
      />
    );
  }

  get placeholderTrigger() {
    return (
      <LazyTrigger
        onScreenEnter={this.image ? () => {} : ::this.onInit}
        threshold={SCROLL_THRESHOLD}
      >
        {this.placeholderImage}
      </LazyTrigger>
    );
  }

  render() {
    return (
      <figure
        style={[style.placeholder, style.ratio, { paddingBottom: `${(this.state.ratio || 1) * 100}%` }]}
      >
        {this.placeholderTrigger}
        {this.fullImage}
      </figure>
    );
  }
}

Placeholder.propTypes = {
  style: PropTypes.array,
  src: PropTypes.string,
  width: PropTypes.number,
  maxWidth: PropTypes.number,
  ratio: PropTypes.number,
};

Placeholder.defaultProps = {
  style: [],
  src: '',
  width: 1,
};
