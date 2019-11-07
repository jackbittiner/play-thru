import React, { useEffect } from "react";
import styled from "styled-components";
import ReactGA from "react-ga";
import { clientId, redirectUri, scopes } from "./constants";

const Login = ({ location }) => {
  useEffect(() => {
    ReactGA.pageview(location.pathname);
  });

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
};

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

export default Login;
