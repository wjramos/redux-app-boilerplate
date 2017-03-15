/**
  * Preprocessor for transforming code for tests
  */

const babel = require('babel-core');
const jestPreset = require('babel-preset-jest');
const esPreset = require('babel-preset-env');
const stageZeroPreset = require('babel-preset-stage-0');
const reactPreset = require('babel-preset-react');

module.exports = {
  process(src, filename) {
    if (filename.match(/\.[css|less|scss]/)) {
      return '';
    }
    if (babel.util.canCompile(filename) && filename.indexOf('node_modules') === -1) {
      return babel.transform(src, {
        auxiliaryCommentBefore: ' istanbul ignore next ',
        filename,
        presets: [jestPreset, esPreset, stageZeroPreset, reactPreset],
        plugins: ['transform-decorators-legacy'],
        retainLines: true,
      }).code;
    }
    return src;
  },
};
