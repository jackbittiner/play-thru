async function getPlayer({ playerInput, authToken }) {
  return {
    playing: playerInput.uris,
    playerInput,
    authToken
  };
}

export default getPlayer;
