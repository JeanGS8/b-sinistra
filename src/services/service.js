export const getVideos = async (nextPageToken = "") => {
  const apiKey = "AIzaSyDHTwEqvtQd7HREP11cKR6wk8K2XIyf6eY";
  const listId = "PLxECpcFkji1HxEWq2h2TMPXltKkO4x_Sy";
  const maxResults = 5;

  try{
    const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${listId}&key=${apiKey}&maxResults=${maxResults}&pageToken=${nextPageToken}`)
    const data = await response.json();
    return data;
  }
  catch(error) {
    console.error(`Ocorreu um erro: ${error}`);
    throw error;
  }
}