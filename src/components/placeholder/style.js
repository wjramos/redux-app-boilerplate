export default {
  placeholder: {
    position: 'relative',
    overflow: 'hidden',
  },
  ratio: {
    height: 0,
    // Default to 2:3 ratio
    paddingBottom: '66.66667%',
  },
  fill: {
    width: '100%',
    position: 'absolute',
    top: '100%',
    left: '100%',
    transform: 'translate(-100%, -100%)',
  },
  fillWidth: {
    width: '100%',
    position: 'relative',
  },
  img: {
    transition: 'opacity .5s ease-in',
  },
  imgSmall: {
    filter: 'blur(50px)',
  },
  loaded: {
    opacity: 1,
  },
  unloaded: {
    opacity: 0,
  },
};
