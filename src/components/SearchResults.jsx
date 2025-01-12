import React, { useState, useEffect } from "react";
import axios from "axios";
import { fetchToken } from "../helpers/cookies.js";

const SearchResults = ({ query }) => {
    const [results, setResults] = useState([]);
    const [searchType, setSearchType] = useState("album"); // Default search type
    const [token, setToken] = useState();

    const fetchData = async (type) => {
        if (!token) {
            console.log("No token found ");
            return;
        }
        if (!query) {
            query = "Hello";
        }
        try {
            const response = await axios.get(
                `https://api.spotify.com/v1/search?q=${encodeURIComponent(
                    query
                )}&type=${type}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setResults(
                type === "album"
                    ? response.data.albums.items
                    : response.data.artists.items
            );
        } catch (error) {
            console.error("Error fetching data from Spotify API", error);
        }
    };
    useEffect(() => {
        fetchToken().then((token) => setToken(token));
    }, []);

    useEffect(() => {
        setResults([]);
        fetchData(searchType);
    }, [token, query, searchType]);

    return (
        <div className="max-w-lg flex flex-col items-center gap-4">
            <div className="flex gap-4">
                <button
                    onClick={() => setSearchType("album")}
                    className={searchType === "album" ? "active  ring-2 ring-current" : ""}
                >
                    Albums
                </button>
                <button
                    onClick={() => setSearchType("artist")}
                    className={searchType === "artist" ? "active ring-2 ring-current" : ""}
                >
                    Artists
                </button>
            </div>
            {results.length === 0 ? null : (
                <div className="flex flex-col gap-4">
                    {results.map((item) =>
                        searchType === "album" ? (
                            <div
                                key={item.id}
                                className="flex flex-row items-center gap-4"
                            >
                                <img
                                    src={item.images[0]?.url}
                                    alt={item.name}
                                    width="50"
                                />
                                <div className="flex flex-col">
                                    <p>{item.name}</p>
                                    <p>
                                        {item.artists
                                            ?.map((artist) => artist.name)
                                            .join(", ")}
                                    </p>
                                </div>
                                <div className="star ml-auto aspect-square">
                                    <input
                                        type="checkbox"
                                        className="hidden"
                                        id={`star-${item.uri}`}
                                    />
                                    <label
                                        className="inline-block relative cursor-pointer"
                                        htmlFor={`star-${item.uri}`}
                                    ></label>
                                </div>
                            </div>
                        ) : (
                            <div
                                key={item.id}
                                className="flex flex-row items-center gap-4"
                            >
                                <img
                                    src={item.images[0]?.url}
                                    alt={item.name}
                                    width="50"
                                />
                                <div className="flex flex-col">
                                    <p>{item.name}</p>
                                    <p>
                                        {item.genres
                                            ?.map((genre) => genre)
                                            .join(", ")}
                                    </p>
                                </div>
                                <div className="star ml-auto aspect-square">
                                    <input
                                        type="checkbox"
                                        className="hidden"
                                        id={`star-${item.uri}`}
                                    />
                                    <label
                                        className="inline-block relative cursor-pointer"
                                        htmlFor={`star-${item.uri}`}
                                    ></label>
                                </div>
                            </div>
                        )
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchResults;
