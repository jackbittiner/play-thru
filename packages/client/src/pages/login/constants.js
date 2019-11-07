export const clientId = "0e58e71063554851870abd7ea374bd45";
export const redirectUri =
  process.env.NODE_ENV === "production"
    ? "https://playthru.xyz/home/#"
    : "http://localhost:3000/home/#";
export const scopes = [
  "user-read-private",
  "user-read-email",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-top-read",
  "streaming",
  "playlist-modify-public",
  "playlist-modify-private"
];
