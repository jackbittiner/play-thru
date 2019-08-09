import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const GET_CURRENT_TRACK = gql`
  query currentTrack($authToken: String!) {
    currentTrack(authToken: $authToken) {
      name
      art
      id
      popularity
      artist {
        id
        name
      }
      trackFeatures(authToken: $authToken) {
        key
        tempo
        time_signature
        harmonicKeys {
          name
          pitchClass
          mode
        }
        danceability
        energy
        valence
      }
    }
  }
`;

export default function NowPlaying({ token }) {
  const { loading, error, data } = useQuery(GET_CURRENT_TRACK, {
    variables: { authToken: token }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  if (data)
    return (
      <div>
        <h2>
          {data.currentTrack.name} by {data.currentTrack.artist.name}
        </h2>
        {data.currentTrack.trackFeatures && (
          <React.Fragment>
            <p>
              {data.currentTrack.trackFeatures.key}
              tempo = {data.currentTrack.trackFeatures.tempo} time signature ={" "}
              {data.currentTrack.trackFeatures.time_signature}
            </p>
          </React.Fragment>
        )}
        <img
          src={data.currentTrack.art}
          style={{ height: 150 }}
          alt={data.currentTrack.artist.artistName}
        />
      </div>
    );
  return null;
}
