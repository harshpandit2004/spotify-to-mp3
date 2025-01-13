import axios from "axios";
import { AuthHeaders } from "./auth.js";

const get_playlist_tracks = async (playlistId) => {
  try {
    let offset = 0;
    const limit = 100;
    let allTracks = [];
    let hasMoreTracks = true;

    while (hasMoreTracks) {
      const response = await axios.get(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks?offset=${offset}&limit=${limit}`,
        AuthHeaders
      );

      const tracks = response.data.items;
      allTracks = [...allTracks, ...tracks];

      if (tracks.length < limit) {
        hasMoreTracks = false;
      } else {
        offset += limit;
      }
    }

    return allTracks;
  } catch (error) {
    console.error(
      "Error fetching playlist tracks:",
      error.response ? error.response.data : error.message
    );
  }
};

export { get_playlist_tracks };
