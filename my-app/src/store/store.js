import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./reducers/todo";
import musicApiReducer, { musicApi } from "./api/music"
import trackReducer from './trackSlice'
import { apiReducer } from "./reducers/api";

export const store = configureStore({
  reducer: {
    auth: apiReducer,
    music: trackReducer,
    player: playerReducer,
    [musicApi.reducerPath]: musicApiReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(musicApi.middleware) 
});