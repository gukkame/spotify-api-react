import React, { useState, useEffect } from "react";
import axios from "axios";
import { fetchToken } from "../helpers/cookies.js";
import ListItem from "./ListItem.jsx";
import { useSelector } from "react-redux";

const SearchResults = ({ query, showFavorites }) => {
    const [results, setResults] = useState([]);
    const [searchType, setSearchType] = useState("album"); // Default search type
    const [token, setToken] = useState();
    const favoriteArtists = useSelector((state) => state.store.favoriteArtists);
    const favoriteAlbums = useSelector((state) => state.store.favoriteAlbums);

    /**
     * Fetches data from the Spotify API based on the provided type.
     *
     * @async
     * @param {string} type - The type of data to fetch ('album' or 'artist').
     * @returns {Promise<void>} Resolves when the data fetch is complete.
     * @throws {Error} If there's an issue with the API request.
     */
    const fetchData = async (type) => {
        if (!token || !query) return;

        try {
            const response = await axios.get(
                `https://api.spotify.com/v1/search?q=${encodeURIComponent(
                    query
                )}&type=${type}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setResults(
                type === "album"
                    ? response.data.albums.items
                    : response.data.artists.items
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
        fetchData(searchType);
    }, [query]);

    useEffect(() => {
        const action = showFavorites
            ? searchType === "album"
                ? favoriteAlbums
                : favoriteArtists
            : [];

        setResults(action);

        if (!showFavorites) {
            fetchData(searchType);
        }
    }, [token, searchType, showFavorites]);

    return (
        <div className="max-w-lg flex flex-col items-center gap-4">
            <div className="flex gap-4">
                <button
                    onClick={() => setSearchType("album")}
                    className={
                        searchType === "album"
                            ? "active  ring-2 ring-current"
                            : ""
                    }
                >
                    Albums
                </button>
                <button
                    onClick={() => setSearchType("artist")}
                    className={
                        searchType === "artist"
                            ? "active ring-2 ring-current"
                            : ""
                    }
                >
                    Artists
                </button>
            </div>
            {results.length === 0 ? (
                <h3 className="mt-12">
                    Ievadiet meklētājā mākslinieku vai tā albumu
                </h3>
            ) : (
                <div className="flex flex-col gap-4">
                    {results.map((item) => (
                        <ListItem
                            key={item.id}
                            item={item}
                            searchType={searchType}
                            isFavoriteItem={showFavorites}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchResults;
