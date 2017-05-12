import React from 'react';
// import style from './style';

export default ({ total = 4, rating = 0 }) => (
  <ol style={{display: 'inline-flex', flexFlow: 'row nowrap', fontWeight: 700}}>
    {[...Array(total)].map((element, i) => (
      <li key={i} style={{ color: i > rating ? '#ccc' : 'gold' }}>
        $
      </li>
    ))}
  </ol>
);
