# Personal Spotify Playlist Fetcher & YouTube MP3 Downloader

This project allows you to fetch the list of songs from your personal Spotify playlists and then search for MP3 versions of those songs on YouTube. It serves as a tool to bypass Spotify's limitations and offers a more flexible way of accessing your music. You can also download your favorite tracks directly in MP3 format from YouTube by using the song names fetched from Spotify.

### Why This Project?

Spotify’s constant updates and changes have been making the user experience more restrictive. This project gives you the freedom to access your music without being shackled by Spotify's limitations. You can build your own app to listen to your favorite tracks without worrying about the ever-changing Spotify interface and subscription models.

---

## Features

- **Fetch Songs from Spotify Playlists**: This app fetches a list of songs from the specified Spotify playlists.
- **Search Songs on YouTube**: For each song, it searches YouTube for similar results, allowing you to find MP3 versions of the songs.
- **Custom Playlists**: You can update the list of playlists in the `app.js` to fetch songs from any of your Spotify playlists.
- **MP3 Downloader**: Once the songs are fetched, you can download MP3s from YouTube for offline listening.

---

## Requirements

- **Node.js**: The app is built using Node.js. You’ll need Node.js installed on your machine.
- **Spotify Developer Account**: You will need a Spotify Developer account to access the Spotify API and obtain your `client_id` and `client_secret`.
- **YouTube API**: To fetch MP3 files from YouTube, the app makes use of YouTube search features, and you might want to integrate or customize this further.
- **Nodemon**: To streamline development, `nodemon` is used to automatically restart the server during code changes.

---

## Setup & Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/spotify-to-youtube-mp3.git
    cd spotify-to-youtube-mp3
    ```

2. **Install dependencies**:
    Make sure you have `node` and `npm` installed. Run the following command to install the required dependencies:
    ```bash
    npm install
    ```

3. **Install `nodemon` globally**:
    To run the app in development mode with auto-reloading, you’ll need `nodemon` installed globally:
    ```bash
    npm install -g nodemon
    ```

4. **Get your Spotify `client_id` and `client_secret`**:
    - Visit the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications).
    - Log in with your Spotify account, create a new app, and note down the `client_id` and `client_secret`.

5. **Configure Spotify credentials**:
    Open the `src/api/auth.js` file and replace the placeholder `client_id` and `client_secret` with your own:
    
    ```javascript
    const client_id = 'YOUR_SPOTIFY_CLIENT_ID';
    const client_secret = 'YOUR_SPOTIFY_CLIENT_SECRET';
    ```

    These credentials are used to authenticate requests to the Spotify API.

6. **Update your playlists**:
    In the `app.js` file, you will find a `playlists` object that contains some predefined playlists. You can update it to include your own playlists. Each key should be the name of the playlist, and the value should be the playlist's unique Spotify ID (you can find this in the URL of the playlist on Spotify).

    Example:

    ```javascript
    const playlists = {
      "My Favorite Songs": "4lA92G0saM461OIOnQcIKX",
      "Chill Vibes": "5d5b6b73bd1f4dfc8bf4505a12e95c16",
      "Workout Playlist": "6b5b547322e14edb945be8b29ec547c6",
    };
    ```

    You can find the playlist ID in the URL of any playlist on Spotify, for example:
    ```
    https://open.spotify.com/playlist/4lA92G0saM461OIOnQcIKX
    ```

    The ID in this case is `4lA92G0saM461OIOnQcIKX`.

---

## How to Use

1. **Run the app**:
    After setting up the Spotify credentials and updating the playlists, start the server by running:
    ```bash
    nodemon src/server.js
    ```

    The app will automatically restart if you make any changes to the code, thanks to `nodemon`.

2. **Access the server**:
    The app will start an Express server on your local machine (by default, on port `3000`). Open your browser and go to:
    ```
    http://localhost:3000
    ```

3. **View Results**:
    The server will fetch the list of songs from your selected Spotify playlists, and you’ll see a list of tracks returned by the app.

4. **MP3 Downloads**:
    The app will then search YouTube for MP3 versions of these songs and return the download links. You can further customize this feature to download MP3 files directly or just view the results.

---

## Spotify Web API Documentation

To better understand how the Spotify Web API works, you can refer to the official [Spotify Web API Documentation](https://developer.spotify.com/documentation/web-api). It provides detailed information on how to make requests to Spotify and what kind of responses to expect.

---

## Customization

- **Adding More Playlists**: You can add more playlists to the `playlists` object in `app.js`. Just use the format:
  
  ```javascript
  playlists["Playlist Name"] = "Spotify Playlist ID";
  ```

- **Changing Search Criteria**: The app searches YouTube for similar songs by their names. If you'd like to modify the search or customize it further, check the YouTube API integration and adjust accordingly.

- **Downloading MP3s**: Currently, the app uses YouTube search to find songs. You can extend this by integrating a library or API that directly downloads MP3 files from YouTube or other sources.

---

## Contributing

Feel free to fork this repository, make improvements, and submit pull requests. Here are a few ideas for contributions:

- Implementing a more robust MP3 downloading system.
- Adding the ability to download entire playlists as ZIP files.
- Supporting additional streaming services like Apple Music or YouTube Music.

---

### Acknowledgments

- Thanks to the [Spotify Web API](https://developer.spotify.com/documentation/web-api) for providing access to user playlists.
- Thanks to the open-source community for tools that help interact with YouTube and download MP3 files.
