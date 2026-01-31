import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: 'gpt',
    initialState: {
        showGptSearch:  false,
        movieResults: null,
        movieNames: null,
        showShimmer: false
    },
    reducers: {
        toggleGptSearchView: (state, action) => {
            state.showGptSearch =  !state.showGptSearch;
        },
        addGptMoviesResult: (state, action) => {
            const {movieNames, movieResults} = action.payload;
            state.movieNames = movieNames;
            state.movieResults = movieResults;
            state.showShimmer = false; // Hide shimmer when data arrives
        },
        setShowShimmer: (state, action) => {
            state.showShimmer = action.payload;
        },
    }
});

export const { toggleGptSearchView, addGptMoviesResult, setShowShimmer } = gptSlice.actions;

export default gptSlice.reducer;