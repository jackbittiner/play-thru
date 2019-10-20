async function getPlayer({ playerInput, authToken, device }) {
  return {
    playerInput,
    authToken,
    device
  };
}

export default getPlayer;
