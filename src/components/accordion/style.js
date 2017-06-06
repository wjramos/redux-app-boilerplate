export default {
  accordion: {},
  heading: {
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #dfdfdf',
    padding: '10px 15px',
    ':last-child': {
      borderBottom: '0',
    },
  },
  headingText: {
    color: '#000',
    display: 'flex',
    justifyContent: 'space-between',
  },
  toggle: {
    display: 'inline-block',
    fontSize: '22px',
    color: '#b0b0b0',
  },
  section: {
    boxSizing: 'border-box',
  },
  sectionBorder: {
    borderBottom: '1px solid #dfdfdf',
  },
  content: {
    backgroundColor: '#fff',
    transition: 'max-height .25s linear',
    overflow: 'hidden',
    fontSize: '.9em',
    margin: 20,
  },
  collapsed: {
    maxHeight: 0,
  },
  expanded: {
    maxHeight: '100vh',
  },
};
