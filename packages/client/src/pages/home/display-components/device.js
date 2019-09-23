import React from "react";
import styled from "styled-components";

export default function Device({ device, setCurrentDevice }) {
  return (
    <div key={device.id}>
      <DeviceCard>
        <button
          onClick={() => {
            setCurrentDevice(device);
          }}
        >
          Play on your {device.type}: {device.name}
        </button>
      </DeviceCard>
    </div>
  );
}

const DeviceCard = styled.li`
  list-style: none;
  padding: 10px;
  margin: 10px;
`;
