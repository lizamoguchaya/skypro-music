import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./reducers/todo";
import musicApiReducer, { musicApi } from "./api/music"
import trackReducer from './trackSlice'
import { apiReducer } from "./reducers/api";
import filterReducer from './filterSlice'

export const store = configureStore({
  reducer: {
    auth: apiReducer,
    music: trackReducer,
    filter: filterReducer,
    player: playerReducer,
    [musicApi.reducerPath]: musicApiReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(musicApi.middleware) 
});