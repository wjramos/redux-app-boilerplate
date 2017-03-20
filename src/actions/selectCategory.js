export default function selectCategory(category) {
  return {
    type: 'CATEGORY_SELECT',
    category,
  };
}
