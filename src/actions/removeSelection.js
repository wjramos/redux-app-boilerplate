export default function removeSelection(id) {
  return {
    type: 'SELECTED_REMOVE',
    id,
  };
}
