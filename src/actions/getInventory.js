export default function getInventory() {
  return dispatch => dispatch({
    middleware: ['CALL_API'],
    data: {
      types: [
        'INVENTORY_REQUEST',
        'INVENTORY_SUCCESS',
        'INVENTORY_FAILURE',
      ],
      endpoint: 'inventory.json',
    },
  });
}
