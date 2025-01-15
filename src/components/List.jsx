import React, { useState, useEffect } from "react";
import axios from "axios";
import { fetchToken } from "../helpers/cookies.js";
import ListItem from "./ListItem.jsx";
import { useSelector } from "react-redux";

const List = ({ query, showFavorites }) => {
    const [results, setResults] = useState([]);
    const [token, setToken] = useState();
    const favoriteItems = useSelector((state) => state.store.favoriteItems);

    /**
     * Fetches data from the Spotify API
     *
     * @async
     * @param {string} type - The type of data to fetch ('album' or 'artist')
     * @returns {Promise<void>} Resolves when the data fetch is complete
     * @throws {Error} If there's an issue with the API request
     */
    const fetchData = async () => {
        if (!token || !query) return;
        try {
            const response = await axios.get(
                `https://api.spotify.com/v1/search?q=${encodeURIComponent(
                    query
                )}&type=album,track,artist&limit=10`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setResults(
                [
                    ...response.data.tracks.items,
                    ...response.data.artists.items,
                    ...response.data.albums.items,
                ].sort(() => Math.random() - 0.5)
            );
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchToken().then((token) => setToken(token));
    }, []);

    useEffect(() => {
        setResults([]);
        fetchData();
    }, [query]);

    useEffect(() => {
        if (!showFavorites) {
            fetchData();
        } else {
            setResults(favoriteItems);
        }
    }, [token, showFavorites]);

    return (
        <div className="max-w-lg flex flex-col items-center gap-4">
            {results.length === 0 ? (
                showFavorites ? (
                    <h3 className="mt-12 opacity-70">
                        Neviena dziesma, albums vai izpildītājs nav saglabāts kā
                        iecienītākais
                    </h3>
                ) : (
                    <h3 className="mt-12 opacity-70">
                        Ievadiet meklētājā dziesmu, albūmu vai izpildītāju
                    </h3>
                )
            ) : (
                <div className="flex flex-col gap-4">
                    {results.map((item) => (
                        <ListItem
                            key={item.id}
                            item={item}
                            isFavoriteItem={showFavorites}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default List;
