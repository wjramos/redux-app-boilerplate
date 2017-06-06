export default ({ issues, brand, qa, preview }) => ({
  type: 'DISPLAY_SET',
  params: { issues, brand, qa, preview },
});
