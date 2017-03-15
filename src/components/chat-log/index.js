import React from 'react';

export default ({ chat = [] }) => (
  <ul>
    {chat.map(({ user, value, date }, key) => (
      <li key={key}>
        [{new Date(date).toLocaleString()}] {user}: {value}
      </li>
    ))}
  </ul>
);
