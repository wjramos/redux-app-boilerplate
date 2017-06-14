export default ({ issues, preview, edition }) => ({
  type: 'DISPLAY_SET',
  params: { issues, preview, edition },
});
