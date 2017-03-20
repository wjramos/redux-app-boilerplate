export default function getItems() {
  return dispatch => dispatch({
    middleware: ['CALL_API'],
    data: {
      types: [
        'ITEMS_REQUEST',
        'ITEMS_SUCCESS',
        'ITEMS_FAILURE',
      ],
      endpoint: 'items.json',
    },
  });
}
