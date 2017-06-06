export function getDeviceWidth() {
  return parseInt(document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth, 10);
}
