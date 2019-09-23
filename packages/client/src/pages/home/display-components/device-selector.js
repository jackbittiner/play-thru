import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

import Device from "./device";

const GET_DEVICES = gql`
  query getDevices($authToken: String!) {
    devices(authToken: $authToken) {
      id
      is_active
      is_private_session
      is_restricted
      name
      type
      volume_percent
    }
  }
`;

export default function DeviceSelector({ token, setCurrentDevice }) {
  const { error, loading, data } = useQuery(GET_DEVICES, {
    variables: { authToken: token }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error ---- Device Selector</p>;
  // return <p>TOP TRACKS...</p>;

  const devices = data && data.devices;
  if (devices)
    return devices.map(device => (
      <Device
        device={device}
        setCurrentDevice={setCurrentDevice}
        key={device.id}
      />
    ));
}
