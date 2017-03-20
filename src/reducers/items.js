export default function inventory(state = [], { type, response }) {
  if (type.includes('ITEMS')) {
    const newState = state.slice();

    if (type === 'ITEMS_REQUEST') {
      return newState;
    }

    if (type === 'ITEMS_SUCCESS') {
      return JSON.parse(response);
    }

    if (type === 'ITEMS_FAILURE') {
      return newState;
    }
  }

  return state;
}
