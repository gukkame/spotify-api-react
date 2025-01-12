import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchResults = ({ query }) => {
    const [results, setResults] = useState([]);
    const [searchType, setSearchType] = useState("album"); // Default search type

    const fetchData = async (type) => {
        if (!query) {
            query = "Hello";
        }
        console.log(
            `https://api.spotify.com/v1/search?q=${encodeURIComponent(
                query
            )}&type=${type}`
        );

        try {
            const response = await axios.get(
                `https://api.spotify.com/v1/search?q=${encodeURIComponent(
                    query
                )}&type=${type}`,
                {
                    headers: {
                        Authorization: `Bearer ${
                            import.meta.env.VITE_SPOTIFY_TOKEN
                        }`,
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
        setResults([]);
        fetchData(searchType);
    }, [query, searchType]);

    return (
        <div className="max-w-xl flex flex-col items-center gap-4">
            <div className="flex gap-4">
                <button
                    onClick={() => setSearchType("album")}
                    className={searchType === "album" ? "active" : ""}
                >
                    Albums
                </button>
                <button
                    onClick={() => setSearchType("artist")}
                    className={searchType === "artist" ? "active" : ""}
                >
                    Artists
                </button>
            </div>
            <button onClick={() => fetchData(searchType)}>Test spotify</button>
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
                                <div className="ml-auto aspect-square">
                                    <div className="star">
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
                            </div>
                        )
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchResults;
