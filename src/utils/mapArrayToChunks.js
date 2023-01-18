function mapArrayToChunks(array, chunkLength) {
  if (!Array.isArray(array)) return;
  if (chunkLength === undefined)
    console.error("mapToArrayToChunk: no chunkLength given!");
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkLength) {
    chunks.push(array.slice(i, i + chunkLength));
  }

  return chunks;
}

export default mapArrayToChunks;
