export function getSetlist(currentTrack) {
  const setlist = JSON.parse(sessionStorage.getItem("setlist")) || [];
  setlist.push(currentTrack);
  sessionStorage.setItem("setlist", [JSON.stringify(setlist)]);

  return setlist;
}
