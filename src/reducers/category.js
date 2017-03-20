export default function category(state = {}, { type, category }) {
  if (type.includes('CATEGORY')) {

    if (type === 'CATEGORY_SELECT') {
      return Object.assign({}, category);
    }

    if (type === 'CATEGORY_CLEAR') {
      return {};
    }
  }

  return state;
}
