import axios from "axios";

/**
 * Fetches a Spotify access token.
 *
 * @returns {Promise<string|undefined>} The Spotify access token or undefined if not found.
 */
export async function fetchToken() {
    const cookieToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("spotify_token="));

    if (cookieToken) {
        return cookieToken.split("=")[1];
    }

    try {
        const response = await axios.post(
            "https://accounts.spotify.com/api/token",
            new URLSearchParams({ grant_type: "client_credentials" }),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: `Basic ${btoa(
                        `${import.meta.env.VITE_SPOTIFY_CLIENT_ID}:${
                            import.meta.env.VITE_SPOTIFY_CLIENT_SECRET
                        }`
                    )}`,
                },
            }
        );

        const { access_token } = response.data;
        document.cookie = `spotify_token=${access_token}; max-age=3600; path=/`;
      
        return access_token;
    } catch (error) {
        console.error("Error fetching Spotify token", error);
    }
}
