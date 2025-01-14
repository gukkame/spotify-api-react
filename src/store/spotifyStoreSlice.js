import { createSlice } from "@reduxjs/toolkit";

const spotifyStoreSlice = createSlice({
    name: "spotifyStoreSlice",
    initialState: {
        favoriteArtists: [],
        favoriteAlbums: [],
    },
    reducers: {
        addFavoriteArtist(state, artist) {
            if (!state.favoriteArtists.includes(artist.payload.uri)) {
                state.favoriteArtists.push(artist.payload);
            }
        },
        addFavoriteAlbum(state, album) {
            if (!state.favoriteAlbums.includes(album.payload.uri)) {
                state.favoriteAlbums.push(album.payload);
            }
        },
        deleteFavoriteArtist(state, artist) {
            state.favoriteArtists = state.favoriteArtists.filter(
                (favoriteArtist) => favoriteArtist.uri !== artist.payload.uri
            );
        },
        deleteFavoriteAlbum(state, album) {
            state.favoriteAlbums = state.favoriteAlbums.filter(
                (favoriteAlbum) => favoriteAlbum.uri !== album.payload.uri
            );
        },
    },
});

export const {
    addFavoriteArtist,
    addFavoriteAlbum,
    deleteFavoriteArtist,
    deleteFavoriteAlbum,
} = spotifyStoreSlice.actions;
export default spotifyStoreSlice.reducer;
