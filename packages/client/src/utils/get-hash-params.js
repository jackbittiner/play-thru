export function getHashParams(location) {
  const hashParams = {};
  let e,
    regex = /([^&;=]+)=?([^&;]*)/g,
    queryString = location.hash.substring(1);
  e = regex.exec(queryString);
  while (e) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
    e = regex.exec(queryString);
  }
  return hashParams;
}
