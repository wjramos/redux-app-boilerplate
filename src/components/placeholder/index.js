import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';

import { LazyTrigger } from '..';
import style from './style';

const DEVICE_WIDTH = 2 * parseInt(document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth, 10); // Remove decimals
const IMAGE_QUALITY = 40;
const PLACEHOLDER_WIDTH = 100;
const SCROLL_THRESHOLD = 80;

@Radium
export default class Placeholder extends PureComponent {
  static propTypes = {
    style: PropTypes.object,
    src: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    maxWidth: PropTypes.number,
    height: PropTypes.number,
    ratio: PropTypes.number,
  }

  static defaultProps = {
    width: 1,
  }

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
      const ratio = this.props.ratio || this.getRatio(this.isComplete ? this.image : this.placeholder);

      if (ratio !== 1) {
        this.setState({ ratio });
      }

      if (!this.image && LazyTrigger.isInViewport(this.placeholder, SCROLL_THRESHOLD)) {
        const quality = IMAGE_QUALITY;
        const width = Math.min(maxWidth, DEVICE_WIDTH * width);
        const height = this.props.ratio ? Math.round(this.props.ratio * width) : this.placeholder.height
        const image = this.image = new Image();

        image.onload = () => this.setState({ opacity: 1 });
        image.src = this.getImage({ src, quality, width, height, ratio });
      }
    }
  }

  getRatio(image) {
    if (image) {
      const { height = 1, width = 1, complete = false } = image;

      return height / width;
    }

    return 1;
  }

  getImage({ src = '', quality = IMAGE_QUALITY, height = 0, width = 0, ratio = 0 }) {
    let query = `https://imagesvc.timeincapp.com/v3/tor0/image?url=${encodeURIComponent(src)}`;

    if (this.isCropped) {
      query += '&c=sc&poi=face'
    }

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

  get fileType() {
    return this.props.src.split('.').pop();
  }

  get isCropped() {
    const { ratio, height, width } = this.props;

    return (ratio || height && width) && (ratio || height / width) !== getRatio(this.isComplete ? this.image : this.placeholder);
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
        style={[style.img, style.imgFull, style.fillWidth, { opacity }, this.props.style]}
      />
    );
  }

  get placeholderImage() {
    const { src, ratio } = this.props;
    const quality = 0;
    const width = PLACEHOLDER_WIDTH;
    const height = ratio ? Math.round(width * ratio) : null;
    const source = this.getImage({ src, quality, width, height, ratio });

    if (!this.isComplete) {
      return (
        <img
          role="presentation"
          ref={node => (this.placeholder = node)}
          onLoad={::this.onInit}
          src={source}
          style={[style.img, style.imgSmall, style.fill, this.props.style]}
        />
      );
    }

    return null;
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
      <div style={{ width: `${(this.props.width || 1) * 100}%` }}>
        <figure
          style={[
            style.placeholder,
            style.ratio,
            { paddingBottom: `${(this.state.ratio || 1) * 100}%` },
          ]}
        >
          {this.placeholderTrigger}
          {this.fullImage}
        </figure>
      </div>
    );
  }
}
