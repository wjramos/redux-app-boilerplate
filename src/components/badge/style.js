const accentColor = '#329ccc';
const disabledColor = '#ccc';
const size = '3.5rem';

export default {
  base: {
    borderRadius: '100%',
    display: 'inline-block',
    textAlign: 'center',
    margin: '0 10px',
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
