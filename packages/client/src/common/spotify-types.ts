export type SearchResultsData = {
  searchResults: Array<Track>;
};

export type CurrentTrack = {
  name: string;
  art?: string;
  id: string;
  uri: string;
  artist: Artist;
  popularity: number;
  trackFeatures: TrackFeatures;
};

export type OnRouteTracks = {
  name: string;
  art: string;
  id: string;
  uri: string;
  artistName: string;
  camelotPosition: number;
  mode: number;
  tempo: number;
};

export type Artist = {
  id: string;
  name: string;
};

export type TrackFeatures = {
  key: Key;
  tempo: number;
  time_signature: number;
  harmonicKeys: [Key];
};

export type Key = {
  name: string;
  pitchClass: number;
  mode: number;
};

export type RecommendedTracksByKey = {
  key: Key;
  recommendedTracks: [Track];
};

export type Track = {
  art?: string;
  artist: string;
  id: string;
  name: string;
  uri: string;
};

export type PlayTrackObject = {
  status: string;
  trackUri: string;
  deviceId: string;
};

export type Account = {
  id: string;
  isPremium: boolean;
};
