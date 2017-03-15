export default function chat(state = [], { type, input }) {
  const newState = state.slice();

  if (type === 'POST_MESSAGE') {
    const { user, value } = input;
    const date = new Date().toISOString();
    newState.push({ user, value, date });
    return newState;
  }

  if (type === 'POST_MESSAGE_SUCCESS') {
    return newState;
  }

  if (type === 'POST_MESSAGE_FAILURE') {
    return newState;
  }

  return state;
}
