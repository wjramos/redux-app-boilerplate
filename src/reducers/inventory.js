export default function inventory(state = [], { type, response }) {
  if (type.includes('INVENTORY')) {
    const newState = state.slice();

    if (type === 'INVENTORY_REQUEST') {
      return newState;
    }

    if (type === 'INVENTORY_SUCCESS') {
      return JSON.parse(response);
    }

    if (type === 'INVENTORY_FAILURE') {
      return newState;
    }
  }

  return state;
}
