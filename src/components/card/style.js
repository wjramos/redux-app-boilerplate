const shadowColor = 'rgba(0,0,0,.2)';
const shadowLength = '10pt';
const blurStrength = '20pt';
const liftDistance = 3;

export default {
  card: {
    borderRadius: 0,
    cursor: 'pointer',
    overflow: 'hidden',
    position: 'relative',
    padding: 0,
    margin: '0 10px 20px',
    background: '#fff',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'stretch',
    flexFlow: 'column nowrap',
    breakInside: 'avoid',

    transition: '.25s ease all',
    boxShadow: `${shadowColor} 0 ${shadowLength} ${blurStrength}`,
    top: 0,
  },

  lift: {
    boxShadow: `${shadowColor} 0 ${shadowLength + liftDistance} ${blurStrength}`,
    top: -liftDistance,
  },

  blockLink: {
    height: '100%',
    width: '100%',
    display: 'block',
  },
};
