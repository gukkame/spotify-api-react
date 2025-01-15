import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    addToFavorite,
    deleteFromFavorite,
} from "../store/spotifyStoreSlice.js";

const ListItem = ({ item }) => {
    const dispatch = useDispatch();
    const favoriteItems = useSelector((state) => state.store.favoriteItems);
    const [isFavorite, setIsFavorite] = useState(false);

    /**
     * Toggles the favorite status of an item based on the current state
     */
    const toggleFavourite = () => {
        const action = isFavorite ? deleteFromFavorite : addToFavorite;

        dispatch(action(item));
        setIsFavorite(!isFavorite);
    };

    /**
     * Checks if an item is in the favorite list
     *
     * @param {string} itemUri - The URI of the item to check
     * @returns {boolean} True if the item is in the favorites list, false otherwise
     */
    const isInFavoriteList = (itemUri) =>
        !!favoriteItems.find((favoriteItems) => favoriteItems.uri === itemUri);

    /**
     * Updates the favorite status of an item based on the search type
     */
    useEffect(() => {
        const isFavoriteItem = isInFavoriteList(item.uri);

        setIsFavorite(isFavoriteItem);
    }, []);

    return (
        <div className="flex flex-row items-center gap-4">
            {item.type === "track" ? (
                <img
                    src={item.album.images[0]?.url}
                    alt={item.name}
                    width="50"
                />
            ) : (
                <img src={item.images[0]?.url} alt={item.name} width="50" />
            )}

            <div className="flex flex-col">
                <p>{item.name}</p>
                <p>{item.type}</p>
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
