import fs from "fs";

const save_track_data = (tracks) => {
  const trackData = tracks.map((e) => ({
    name: e.track.name,
    artist: e.track.artists[0].name,
    album: e.track.album.name,
  }));

  fs.writeFileSync(
    "output-burner/tracks.json",
    JSON.stringify(trackData, null, 2)
  );
  console.log("Tracks saved to tracks.json");
  return trackData;
};

export { save_track_data };
