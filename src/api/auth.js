import axios from "axios";

let AuthHeaders = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: "", // Initially empty, will be filled after token fetch
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
    console.log("Access Token fetched:", response.data);
  } catch (error) {
    console.error(
      "Error fetching token:",
      error.response ? error.response.data : error.message
    );
  }
};

export { AuthHeaders, get_token };
