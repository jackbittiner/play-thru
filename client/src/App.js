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
          artistName: "",
          relatedArtists: [],
          artistGenres: []
        },
        trackFeatures: {
          key: null,
          mode: null,
          tempo: null,
          time_signature: null
        }
      },
      recommendedTracks: []
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
      this.getRelatedArtists(response.item.artists[0].id);
    });
  }

  getArtistGenres(artistId) {
    spotifyApi.getArtist(artistId).then(response => {
      response &&
        this.setState({
          nowPlaying: {
            ...this.state.nowPlaying,
            artist: {
              ...this.state.nowPlaying.artist,
              artistGenres:
                response.genres.length < 2
                  ? response.genres
                  : response.genres.slice(0, 2)
            }
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

  getRelatedArtists(artistId) {
    spotifyApi.getArtistRelatedArtists(artistId).then(response => {
      const relatedArtists =
        response.artists.length < 2
          ? response.artists
          : response.artists.slice(0, 2);
      response &&
        this.setState({
          nowPlaying: {
            ...this.state.nowPlaying,
            artist: {
              ...this.state.nowPlaying.artist,
              relatedArtists: relatedArtists.map(artist => artist.id)
            }
          }
        });
    });
  }

  getRecommendations() {
    const jsonObject = {
      seed_artists: [...this.state.nowPlaying.artist.relatedArtists],
      seed_genres: this.state.nowPlaying.artist.artistGenres,
      seed_tracks: [this.state.nowPlaying.trackId],
      target_key: this.state.nowPlaying.trackFeatures.key,
      target_mode: this.state.nowPlaying.trackFeatures.mode,
      min_tempo: this.state.nowPlaying.trackFeatures.tempo - 5,
      max_tempo: this.state.nowPlaying.trackFeatures.tempo + 5,
      target_time_signature: this.state.nowPlaying.trackFeatures.time_signature
    };
    console.log(jsonObject);
    spotifyApi.getRecommendations(jsonObject).then(response => {
      console.log(response);
      response &&
        this.setState({
          recommendedTracks: response.tracks
        });
    });
  }

  render() {
    const listOfTracks = this.state.recommendedTracks
      ? this.state.recommendedTracks.map(track => {
          return (
            <div>
              {track.name} by {track.artists[0].name}
            </div>
          );
        })
      : null;
    return (
      <div className="App">
        <a href="http://localhost:8888"> Login to Spotify </a>
        <div>
          <h2>
            {this.state.nowPlaying.name} by{" "}
            {this.state.nowPlaying.artist.artistName}
          </h2>
          <img src={this.state.nowPlaying.albumArt} style={{ height: 150 }} />
          <p />
        </div>
        {this.state.loggedIn && (
          <div>
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
            <div>{listOfTracks}</div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
