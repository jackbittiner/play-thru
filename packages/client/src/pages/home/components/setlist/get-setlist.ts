import { CurrentTrack } from "../../../../common/spotify-types";

// TODO: Actual unit tests for this bad boi
export function getSetlist(currentTrack: CurrentTrack) {
  const setlist = JSON.parse(sessionStorage.getItem("setlist") as string) || [];
  setlist.push(currentTrack);
  sessionStorage.setItem("setlist", JSON.stringify(setlist));

  return setlist;
}
