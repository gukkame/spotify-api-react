export async function fetchToken() {
    const cookieToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("spotify_token="))
        ?.split("=")[1];

    if (cookieToken) {
        console.log("Spotify token found in cookie ", cookieToken);
        return cookieToken;
    }
    try {
        const response = await axios.post(
            "https://accounts.spotify.com/api/token",
            new URLSearchParams({
                grant_type: "client_credentials",
            }),
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
        console.log("Spotify token updated successfully ", access_token);
        return access_token;
    } catch (error) {
        console.error("Error fetching Spotify token", error);
    }
};
