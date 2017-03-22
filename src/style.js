const typographicScale = 1.618;

export default {
  // Global Reset
  html: {
    fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
    boxSizing: 'border-box',

    // Accessibilty-friendly setting 1 rem to equal ~10px
    fontSize: '62.5%',
  },
  '*, *:before, *:after': {
    boxSizing: 'inherit',
    margin: 0,
    padding: 0,
    border: 'none',
    borderRadius: 0,
    boxShadow: 'none',
    background: 'transparent',
    backgroundImage: 'none',
    outline: 'none',
    position: 'relative',
  },
  a: {
    textDecoration: 'inherit',
    color: 'inherit',
  },
  'p, h1, h2, h3, h4, h5, h5': {
    fontSize: 'inherit',
    fontWeight: 'inherit',
  },
  'ol, ul': {
    listStyleType: 'none',
  },
  img: {
    display: 'inline-block',
    height: 'auto',
    maxWidth: '100%',
    verticalAlign: 'middle',
  },
  table: {
    borderCollapse: 'collapse',
  },

  // Typography
  'p, li, td': {
    fontSize: `${1 * typographicScale}rem`,
  },

  h1: {
    fontSize: `${3 * typographicScale}rem`,
  },

  h2: {
    fontSize: `${2 * typographicScale}rem`,
  },

  h3: {
    fontSize: `${1.4 * typographicScale}rem`,
  },

  // Theme
  'input, select, button': {
    background: 'transparent',
    border: '.1rem solid #ccc',
    borderRadius: 5,
    padding: 5,
  },
  a: {
    color: '#329ccc',
  },
  'table, select, input, textarea': {
    width: '100%',
  },
  td: {
    padding: 5,
  },
  'td:last-of-type': {
    textAlign: 'right',
  },
  'th td': {
    border: '.1rem solid #ccc',
  },
  'tr td': {
    borderBottom: '.1rem solid #ccc',
  },
  'fieldset, section': {
    padding: '1.5rem 5rem',
  },
};
