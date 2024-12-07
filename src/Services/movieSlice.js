import { createSlice } from '@reduxjs/toolkit';

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    loading: false,
    searchQuery: '',
    totalPages: 1,
    currentPage: 1,
  },
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload.movies;
      state.totalPages = action.payload.totalPages;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setMovies, setLoading, setSearchQuery, setCurrentPage } = movieSlice.actions;
export default movieSlice.reducer;
