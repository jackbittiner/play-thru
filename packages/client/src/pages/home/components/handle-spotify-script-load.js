const handleScriptLoad = ({
  authToken,
  setPausedState,
  getCurrentTrack,
  setDevice
}) => {
  window.onSpotifyWebPlaybackSDKReady = () => {
    const player = new window.Spotify.Player({
      name: "Play Thru",
      getOAuthToken: cb => {
        cb(authToken);
      }
    });

    player.addListener("initialization_error", ({ message }) => {
      console.error(message);
    });
    player.addListener("authentication_error", ({ message }) => {
      console.error(message);
    });
    player.addListener("account_error", ({ message }) => {
      console.error(message);
    });
    player.addListener("playback_error", ({ message }) => {
      console.error(message);
    });

    player.addListener("player_state_changed", state => {
      setPausedState(state.paused);
      getCurrentTrack({
        variables: {
          trackId: state.track_window.current_track.id
        }
      });
    });

    player.addListener("ready", ({ device_id }) => {
      sessionStorage.removeItem("setlist");
      setDevice(device_id);
      console.log("Ready with Device ID", device_id);
    });

    player.addListener("not_ready", ({ device_id }) => {
      console.log("Device ID has gone offline", device_id);
    });

    player.connect();
  };
};

export default handleScriptLoad;
