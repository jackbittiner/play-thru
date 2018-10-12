import React, { Component } from "react";
import styled from "styled-components";
import { getHarmonicKeys } from "./camelot-wheel/camelot-wheel";
import _ from "lodash";

import NowPlaying from "./display-components/now-playing";
import ListsOfRecommendations from "./display-components/list-of-recommendations";
import QualitySlider from "./display-components/slider";

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
          time_signature: null,
          harmonicKeys: [],
          danceability: null,
          energy: null,
          valence: null,
          popularity: null
        }
      },
      recommendedTracks: [],
      sliderValues: {
        tempo: 0,
        danceability: 0,
        energy: 0,
        valence: 0,
        popularity: 0
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
            },
            trackFeatures: {
              ...this.state.nowPlaying.trackFeatures,
              popularity: response.item.popularity
            }
          }
          // sliderValues: {
          //   popularity: response.item.popularity
          // }
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
              artistGenres: response.genres
            }
          }
        });
    });
  }

  getTrackFeatures(trackId) {
    spotifyApi.getAudioFeaturesForTrack(trackId).then(response => {
      const harmonicKeys = getHarmonicKeys(response.key, response.mode);
      response &&
        this.setState({
          nowPlaying: {
            ...this.state.nowPlaying,
            trackFeatures: {
              ...this.state.nowPlaying.trackFeatures,
              key: response.key,
              mode: response.mode,
              tempo: response.tempo,
              time_signature: response.time_signature,
              harmonicKeys: harmonicKeys,
              danceability: response.danceability,
              energy: response.energy,
              valence: response.valence
            }
          },
          sliderValues: {
            popularity: this.state.nowPlaying.trackFeatures.popularity,
            tempo: response.tempo,
            danceability: response.danceability,
            energy: response.energy,
            valence: response.valence
          }
        });
    });
  }

  getRelatedArtists(artistId) {
    spotifyApi.getArtistRelatedArtists(artistId).then(response => {
      response &&
        this.setState({
          nowPlaying: {
            ...this.state.nowPlaying,
            artist: {
              ...this.state.nowPlaying.artist,
              relatedArtists: response.artists.map(artist => artist.id)
            }
          }
        });
    });
  }

  getRecommendations() {
    this.state.recommendedTracks = [];
    this.state.nowPlaying.trackFeatures.harmonicKeys.forEach(key => {
      const jsonObject = {
        limit: 5,
        seed_artists: _.sampleSize(
          [...this.state.nowPlaying.artist.relatedArtists],
          2
        ),
        seed_genres: _.sampleSize(this.state.nowPlaying.artist.artistGenres, 2),
        seed_tracks: [this.state.nowPlaying.trackId],
        target_key: key.pitchClass,
        target_mode: key.mode,
        min_tempo: this.state.nowPlaying.trackFeatures.tempo - 5,
        max_tempo: this.state.nowPlaying.trackFeatures.tempo + 5,
        target_time_signature: this.state.nowPlaying.trackFeatures
          .time_signature,
        min_valence: this.state.sliderValues.valence - 20 / 100,
        max_valence: this.state.sliderValues.valence + 20 / 100,
        min_danceability: this.state.sliderValues.danceability - 20 / 100,
        max_danceability: this.state.sliderValues.danceability + 20 / 100,
        min_popularity: this.state.sliderValues.popularity - 20,
        max_popularity: this.state.sliderValues.popularity + 20,
        min_energy: this.state.sliderValues.energy - 20 / 100,
        max_energy: this.state.sliderValues.energy + 20 / 100
      };
      spotifyApi.getRecommendations(jsonObject).then(response => {
        response.tracks.forEach(track => {
          track.key = key.pitchClass;
          track.mode = key.mode;
        });
        response &&
          this.setState(prevState => ({
            recommendedTracks: [
              ...prevState.recommendedTracks,
              ...response.tracks
            ]
          }));
      });
    });
  }

  handleValueChange = (value, quality) => {
    this.setState({
      sliderValues: {
        ...this.state.sliderValues,
        [quality]: value
      }
    });
  };

  render() {
    const recommendedTracksByKey = _.groupBy(
      this.state.recommendedTracks,
      "key"
    );

    return (
      <Page>
        {!this.state.loggedIn && (
          <Login>
            <LogInButton href="http://localhost:8888">
              Login to Spotify
            </LogInButton>
          </Login>
        )}
        {this.state.loggedIn && (
          <React.Fragment>
            <CurrentTrack>
              <NowPlaying nowPlaying={this.state.nowPlaying} />
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
            </CurrentTrack>
            <Sliders>
              <QualitySlider
                onValueChange={this.handleValueChange}
                quality={"popularity"}
                number={this.state.sliderValues.popularity}
              />
              <QualitySlider
                onValueChange={this.handleValueChange}
                quality={"danceability"}
                number={Math.floor(
                  this.state.sliderValues.danceability <= 1
                    ? this.state.sliderValues.danceability * 100
                    : this.state.sliderValues.danceability
                )}
              />
              <QualitySlider
                onValueChange={this.handleValueChange}
                quality={"energy"}
                number={Math.floor(
                  this.state.sliderValues.energy <= 1
                    ? this.state.sliderValues.energy * 100
                    : this.state.sliderValues.energy
                )}
              />
              <QualitySlider
                onValueChange={this.handleValueChange}
                quality={"valence"}
                number={Math.floor(
                  this.state.sliderValues.valence <= 1
                    ? this.state.sliderValues.valence * 100
                    : this.state.sliderValues.valence
                )}
              />
            </Sliders>
            <Recommendations>
              <ListsOfRecommendations
                recommendedTracksByKey={recommendedTracksByKey}
              />
            </Recommendations>
          </React.Fragment>
        )}
      </Page>
    );
  }
}

const Page = styled.div`
  display: grid;
  text-align: center;
  height: 100%;
  grid-template-columns: 1fr;
  grid-template-rows: 100px 1fr 350px 3fr;
  grid-gap: 1px 1px;
  grid-template-areas: "Login" "CurrentTrack" "Sliders" "Recommendations";
}
`;
const Login = styled.div`
  grid-area: Login;
`;
const CurrentTrack = styled.div`
  grid-area: CurrentTrack;
`;

const Sliders = styled.div`
  grid-area: Sliders;
`;

const Recommendations = styled.div`
  grid-area: Recommendations;
  display: grid;
  height: 100%;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  grid-gap: 1px 1px;
`;

const LogInButton = styled.a`
  color: #fff;
  background-color: #1db954;
  text-decoration: none;
  border-radius: 500px;
  padding: 18px 48px 16px;
  border-width: 0;
  letter-spacing: 2px;
  width: 200px;
  position: relative;
  top: 15%;
`;

export default App;
