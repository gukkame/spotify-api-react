import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    addFavoriteArtist,
    addFavoriteAlbum,
    deleteFavoriteArtist,
    deleteFavoriteAlbum,
} from "../store/spotifyStoreSlice.js";

const ListItem = ({ item, searchType }) => {
    const dispatch = useDispatch();
    const favoriteArtists = useSelector((state) => state.store.favoriteArtists);
    const favoriteAlbums = useSelector((state) => state.store.favoriteAlbums);

    const [isFavorite, setIsFavorite] = useState(false);

    /**
     * Toggles the favorite status of an item based on the current state.
     */
    const toggleFavourite = () => {
        const action = isFavorite
            ? searchType === "album"
                ? deleteFavoriteAlbum
                : deleteFavoriteArtist
            : searchType === "album"
            ? addFavoriteAlbum
            : addFavoriteArtist;

        dispatch(action(item));
        setIsFavorite(!isFavorite);
    };

    /**
     * Checks if an artist is in the favorite artist list.
     *
     * @param {string} artistUri - The URI of the artist to check.
     * @returns {boolean} True if the artist is in the favorites list, false otherwise.
     */
    const isArtistInFavoriteList = (artistUri) =>
        !!favoriteArtists.find(
            (favoriteArtist) => favoriteArtist.uri === artistUri
        );

    /**
     * Checks if an album is in the favorite albums list.
     *
     * @param {string} albumUri - The URI of the album to check.
     * @returns {boolean} True if the album is in the favorites list, false otherwise.
     */
    const isAlbumInFavoriteList = (albumUri) =>
        !!favoriteAlbums.find(
            (favoriteAlbums) => favoriteAlbums.uri === albumUri
        );

    /**
     * Updates the favorite status of an item based on the search type.
     */
    useEffect(() => {
        const isFavoriteItem =
            searchType === "album"
                ? isAlbumInFavoriteList(item.uri)
                : isArtistInFavoriteList(item.uri);

        setIsFavorite(isFavoriteItem);
    }, []);

    return (
        <div className="flex flex-row items-center gap-4">
            <img src={item.images[0]?.url} alt={item.name} width="50" />
            <div className="flex flex-col">
                <p>{item.name}</p>

                {searchType === "album" ? (
                    <p>
                        {item.artists?.map((artist) => artist.name).join(", ")}
                    </p>
                ) : (
                    <p>{item.genres?.map((genre) => genre).join(", ")}</p>
                )}
            </div>
            <div className="star ml-auto aspect-square">
                <input
                    checked={!!isFavorite}
                    type="checkbox"
                    className="hidden"
                    id={`star-${item.uri}`}
                    onChange={() => toggleFavourite()}
                />
                <label
                    className="inline-block relative cursor-pointer"
                    htmlFor={`star-${item.uri}`}
                ></label>
            </div>
        </div>
    );
};

export default ListItem;
