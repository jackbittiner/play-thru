import React, { Component } from 'react';
import styled from 'styled-components';

import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

export default class Login extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false
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

  render() {
    return (
      <LoginSection>
        <LogInButton href="http://localhost:8888">Login to Spotify</LogInButton>
      </LoginSection>
    );
  }
}

const LoginSection = styled.div`
  width: 400px;
  margin: 0 auto;
  height: 200px;
  background: teal;
  text-align: centre;
  padding: 100px;
`;

const LogInButton = styled.a`
  display: block;
  position: relative;
  color: #fff;
  background-color: #1db954;
  text-decoration: none;
  text-align: center;
  border-radius: 500px;
  padding: 18px 48px 16px;
  border-width: 0;
  letter-spacing: 2px;
  width: 50%;
  margin: auto;
  top: 15%;
`;
