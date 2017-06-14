import React, { Component } from 'react';

import { Pdf } from '../components';
import { propTypes, isLandscape } from '../util';


export default class PdfReader extends Component {
  static propTypes = propTypes;

  render() {
    return (
      <Pdf {...this.props} landscape={isLandscape()} />
    );
  }
}
