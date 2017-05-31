/**
  * Placeholder styles
  */

export default {
  placeholder: {
    position: 'relative',
    overflow: 'hidden',

    // Fixes WebKit bug which prevents border-radius from clipping images
    opacity: 0.999,
  },
  ratio: {
    height: 0,
    transition: '.25s linear padding-bottom',

    // Replace this - initial shape is square
    paddingBottom: '100%',
  },
  fill: {
    width: '100%',
    position: 'absolute',
    top: '100%',
    left: '100%',
    transform: 'translate(-100%, -100%)',
  },
  img: {
    transition: 'opacity .5s linear',
  },
  imgSmall: {
    filter: 'blur(50px)',
    transform: 'scale(1)',
  },
  imgFull: {
  },
  loaded: {
    opacity: 1,
  },
  unloaded: {
    opacity: 0,
  },
};
