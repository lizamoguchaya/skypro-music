import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    currentTrack: null,
    allIds: [],
    isPlaying: null,
    tracks: [],
    isMix: false,
}
export const trackSlice = createSlice({
    name: 'trackSlice',
    initialState,
    reducers: {
        setCurrentTrack: (state, action) => {
            state.currentTrack = action.payload
        }
    }
})
export const {setCurrentTrack} = trackSlice.actions
export default trackSlice.reducer