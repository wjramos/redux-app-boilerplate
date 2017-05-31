export default {
  list: {
    display: 'flex',
    flexFlow: 'row wrap',
    padding: '4vh 4vw',
  },
  item: {
    boxSizing: 'border-box',
    width: '50%',
    '@media only screen and (min-width: 767px)': {
      width: '33.333%',
    },
    '@media only screen and (min-width: 1024px)': {
      width: '25%',
    },
  },
};
