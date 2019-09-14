import React, { Component } from "react";
import styled from "styled-components";

export const authEndpoint = "https://accounts.spotify.com/authorize";
const clientId = "0e58e71063554851870abd7ea374bd45";
const redirectUri = "http://localhost:3000/home/#";
const scopes = [
  "user-read-private",
  "user-read-email",
  "user-read-playback-state",
  "user-modify-playback-state"
];

export default class Login extends Component {
  render() {
    return (
      <LoginSection>
        <LogInButton
          href={
            "https://accounts.spotify.com/authorize" +
            "?response_type=token" +
            "&client_id=" +
            clientId +
            (scopes ? "&scope=" + encodeURIComponent(scopes) : "") +
            "&redirect_uri=" +
            encodeURIComponent(redirectUri)
          }
        >
          Login to Spotify
        </LogInButton>
      </LoginSection>
    );
  }
}

const LoginSection = styled.div`
  position: fixed;
  padding: 0;
  margin: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: teal;
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
