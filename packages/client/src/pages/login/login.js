import React, { Component } from "react";
import styled from "styled-components";

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
      <Page>
        <VinylSection>
          <Vinyl src={require("./assets/orange-vinyl.png")} />
          <Vinyl src={require("./assets/black-vinyl.png")} />
          <Vinyl src={require("./assets/red-vinyl.png")} />
        </VinylSection>
        <Title>
          <Bigger>P</Bigger>LAY<Big>T</Big>HRU
        </Title>
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
      </Page>
    );
  }
}

const Title = styled.h1`
  color: #266179;
  font-size: 50px;
  padding-bottom: 32px;
  font-family: "DomaineDisplayNarrow", Georgia, serif;
`;

const Big = styled.span`
  font-size: 62.5px;
`;

const Bigger = styled.span`
  font-size: 75px;
`;

const VinylSection = styled.div`
  display: flex;
  justify-content: center;
  padding: 3em;
`;

const Vinyl = styled.img`
  height: 100px;
  width: 100px;
`;

const Page = styled.div`
  background: #f5f8f2;
  text-align: center;
`;

const LogInButton = styled.a`
  color: #fff;
  background-color: #1db954;
  text-decoration: none;
  border-radius: 500px;
  padding: 18px 48px 16px;
  letter-spacing: 2px;
`;
