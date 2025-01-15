import { createSlice } from "@reduxjs/toolkit";

const spotifyStoreSlice = createSlice({
    name: "spotifyStoreSlice",
    initialState: {
        favoriteItems: [],
    },
    reducers: {
        addToFavorite(state, item) {
            if (!state.favoriteItems.includes(item.payload.uri)) {
                state.favoriteItems.push(item.payload);
            }
        },
        deleteFromFavorite(state, item) {
            state.favoriteItems = state.favoriteItems.filter(
                (favoriteItem) => favoriteItem.uri !== item.payload.uri
            );
        },
    },
});

export const {
    addToFavorite,
    deleteFromFavorite,
} = spotifyStoreSlice.actions;
export default spotifyStoreSlice.reducer;
