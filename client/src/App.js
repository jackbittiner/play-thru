import React, { Component } from "react";
import "./App.css";

import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: {
        name: "",
        albumArt: "",
        trackId: "",
        artist: {
          artistId: "",
          artistName: ""
        },
        trackFeatures: {
          key: null,
          mode: null,
          tempo: null,
          time_signature: null
        }
      },
      seedData: {
        genres: [],
        artistIds: [],
        tracks: []
      }
    };
  }
  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  getNowPlaying() {
    spotifyApi.getMyCurrentPlaybackState().then(response => {
      response &&
        this.setState({
          nowPlaying: {
            name: response.item.name,
            albumArt: response.item.album.images[0].url,
            trackId: response.item.id,
            artist: {
              artistId: response.item.artists[0].id,
              artistName: response.item.artists[0].name
            }
          }
        });
      this.getArtistGenres(response.item.artists[0].id);
      this.getTrackFeatures(response.item.id);
    });
  }

  getArtistGenres(artistId) {
    spotifyApi.getArtist(artistId).then(response => {
      response &&
        this.setState({
          seedData: {
            genres:
              response.genres.length < 5
                ? response.genres
                : response.genres.slice(0, 5)
          }
        });
    });
  }

  getTrackFeatures(trackId) {
    spotifyApi.getAudioFeaturesForTrack(trackId).then(response => {
      response &&
        this.setState({
          nowPlaying: {
            ...this.state.nowPlaying,
            trackFeatures: {
              ...this.state.nowPlaying.trackFeatures,
              key: response.key,
              mode: response.mode,
              tempo: response.tempo,
              time_signature: response.time_signature
            }
          }
        });
    });
  }

  getRecommendations() {
    const jsonObject = {
      seed_artists: [this.state.nowPlaying.artistId],
      seed_genres: this.state.seedData.genres,
      seed_tracks: [this.state.nowPlaying.trackId],
      target_key: this.state.nowPlaying.trackFeatures.key,
      target_mode: this.state.nowPlaying.trackFeatures.mode,
      target_tempo: this.state.nowPlaying.trackFeatures.tempo,
      target_time_signature: this.state.nowPlaying.trackFeatures.time_signature
    };
    spotifyApi.getRecommendations(jsonObject).then(response => {
      console.log(response);
    });
  }

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <a href="http://localhost:8888"> Login to Spotify </a>
        <div>
          <h2>
            {this.state.nowPlaying.name} by {this.state.nowPlaying.artistName}
          </h2>
          <img src={this.state.nowPlaying.albumArt} style={{ height: 150 }} />
          <p />
        </div>
        {this.state.loggedIn && (
          <div>
            <button onClick={() => this.getNowPlaying()}>
              Check Now Playing
            </button>
            <button
              onClick={() =>
                this.getRecommendations(this.state.nowPlaying.trackId)
              }
            >
              Get getRecommendations
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default App;

// https://open.spotify.com/artist/3jOstUTkEu2JkjvRdBA5Gu?si=as6LyWeLSXGFWjfpjxCSgw
// https://open.spotify.com/artist/1lZvg4fNAqHoj6I9N8naBM?si=mdCXaMv_Rzy3XiQ2vbubww

// https://open.spotify.com/track/3g2gQMeeQAEPztiQKMlGSl?si=Qa-OhIiHQ5iJZ-jO2m52lg
