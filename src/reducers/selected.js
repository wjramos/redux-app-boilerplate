export default function selected(state = [], { type, id }) {
  if (type.includes('SELECTED')) {
    const newState = state.slice();

    if (type === 'SELECTED_ADD') {
      newState.push(id)
      return newState;
    }

    if (type === 'SELECTED_CLEAR') {
      return [];
    }

    if (type === 'SELECTED_REMOVE') {
      newState.splice(newState.indexOf(id), 1);
      return newState;
    }
  }

  return state;
}
