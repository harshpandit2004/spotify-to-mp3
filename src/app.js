import express from "express";
import { get_token } from "./api/auth.js";
import { get_playlist_tracks } from "./api/spotify.js";
import { save_track_data } from "./utils/file.js";

const playlists = {
  "Music to fight off the IRS to": "6EHb4urJ4gZc4BvKrDMTAP", // https://open.spotify.com/playlist/6EHb4urJ4gZc4BvKrDMTAP
  Regular: "1vzhJ2Csiy9VWdtWvBZVOV", // https://open.spotify.com/playlist/1vzhJ2Csiy9VWdtWvBZVOV
  "Regular [Burner]": "0dQsatkQ4lzFMu8Yk6IoWV", // https://open.spotify.com/playlist/0dQsatkQ4lzFMu8Yk6IoWV
  wannabekool: "0XM35qTJ1nQZIwbw1ErUXG", // https://open.spotify.com/playlist/0XM35qTJ1nQZIwbw1ErUXG
  "Regular [H]": "36ju4cLnQtFlJC8beUbX0X", // https://open.spotify.com/playlist/36ju4cLnQtFlJC8beUbX0X
  "Liked Songs": "4lA92G0saM461OIOnQcIKX", // https://open.spotify.com/playlist/4lA92G0saM461OIOnQcIKX
};

const app = express();
const port = process.env.PORT || 3000;

app.get("/spotify-section", async (req, res) => {
  // Always update the authentication header first
  await get_token();

  // Fetch tracks from a specific playlist (e.g., "Liked Songs")
  const tracks = await get_playlist_tracks(
    playlists["Music to fight off the IRS to"]
  );

  // Save track data to file
  const savedTracks = save_track_data(tracks);

  res.json({ tracks: savedTracks });
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
