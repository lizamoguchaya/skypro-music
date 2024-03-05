import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    search: "",
    genres: [],
    authors: [],
}
export const filterSlice = createSlice({
    name: 'filterSlice',
    initialState,
    reducers: {
        setSearchFilter: (state, action) => {
            state.search = action.payload.search
        },
        setGenresFilter: (state, action) => {
            state.genres = action.payload.genres
        },
        setAuthorsFilter: (state, action) => {
            state.authors = action.payload.authors
        }
    }
})
export const {setSearchFilter, setGenresFilter, setAuthorsFilter} = filterSlice.actions
export default filterSlice.reducer