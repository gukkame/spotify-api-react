import { configureStore } from '@reduxjs/toolkit'
import spotifyStoreSlice from './spotifyStoreSlice.js'

export default configureStore({
  reducer: {
    store: spotifyStoreSlice,
  }
})