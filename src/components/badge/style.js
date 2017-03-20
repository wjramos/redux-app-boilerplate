const accentColor = '#329ccc';
const disabledColor = '#ccc';
const size = '3.5rem';

export default {
  base: {
    borderRadius: '100%',
    display: 'inline-block',
    textAlign: 'center',
    position: 'absolute',
    left: '-5%',
    lineHeight: size,
    width: size,
    fontSize: size,
    height: size,
  },
  active: {
    backgroundColor: accentColor,
    color: '#fff',
  },
  inactive: {
    backgroundColor: disabledColor,
    color: '#000',
  },
};
