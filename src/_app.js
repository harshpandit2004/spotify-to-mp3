import axios from "axios";
import express from "express";
import fs from "fs";
const app = express();

const port = process.env.PORT || 3000;

let AuthHeaders = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization:
      "Bearer BQBZ7AYP1Et8U1bWBuI85ffgvGbQcS-tyj_2IrQgywYk3k0Xo2PWDgsJerkuftqaJpCarDdZr01XW9ON1Hr2m10qFoxTvFSEtWA-jJBipkD5noygLQU",
  },
};

const get_token = async () => {
  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      {
        grant_type: "client_credentials",
        client_id: "227957a91ed84dfd87a075b87bab1f49",
        client_secret: "321bb6d1404943b3a7178de3679eb18b",
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    AuthHeaders.headers.Authorization = `Bearer ${response.data.access_token}`;
    console.log("Access Token:", response.data);
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  }
};

const get_playlist = async () => {
  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/playlists/0dQsatkQ4lzFMu8Yk6IoWV",
      AuthHeaders
    );
    return Promise.resolve(response.data);
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  }
};

const get_playlist_tracks = async () => {
  try {
    let offset = 0;
    const limit = 100;
    let allTracks = [];
    let hasMoreTracks = true;

    // Continue fetching until no more tracks are available
    while (hasMoreTracks) {
      const response = await axios.get(
        `https://api.spotify.com/v1/playlists/${playlists["Liked Songs"]}/tracks?offset=${offset}&limit=${limit}`,
        AuthHeaders
      );

      const tracks = response.data.items;
      allTracks = [...allTracks, ...tracks]; // Add the new tracks to the list

      if (tracks.length < limit) {
        hasMoreTracks = false; // No more tracks to fetch
      } else {
        offset += limit; // Increase the offset for the next batch of results
      }
    }

    return { items: allTracks }; // Return all fetched tracks
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  }
};

const save_track_data = async (response_tracks) => {
  const tracks = response_tracks.map((e) => {
    return {
      name: e.track.name,
      artist: e.track.artists[0].name,
      album: e.track.album.name,
    };
  });
  // write the data to a outputs/tracks.json file
  fs.writeFileSync("tracks.json", JSON.stringify(tracks, null, 2));
  return tracks;
};

const get_liked_songs = async () => {
  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/tracks",
      AuthHeaders
    );
    console.log(response.data);
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  }
};

app.get("/", async (req, res) => {
  // always first update the authentication header
  // await get_token();

  // use the authheader everytime you need some data from spotify
  const response = await get_playlist_tracks();

  const tracks = await save_track_data(response.items);
  res.send({ tracks });
});

app.listen(port, () => {
  console.log(`Server is live at port ${port}`);
});
//
// https://open.spotify.com/playlist/
