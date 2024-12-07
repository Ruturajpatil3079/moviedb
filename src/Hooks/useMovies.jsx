import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setMovies, setLoading, setCurrentPage } from '../Services/movieSlice';
import { useEffect } from 'react';

const useMovies = (searchQuery, currentPage) => {
  const dispatch = useDispatch();

  const fetchMovies = async () => {
    try {
      dispatch(setLoading(true));
      let apiUrl;

      console.log('Search Query:', searchQuery);
      console.log('Current Page:', currentPage);

      if (searchQuery) {
        apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&query=${searchQuery}&page=${currentPage}`;
      } else {
        apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&page=${currentPage}`;
      }

      console.log('API URL:', apiUrl);  

      const response = await axios.get(apiUrl);
      
      dispatch(setMovies({ movies: response.data.results || [], totalPages: response.data.total_pages }));
      dispatch(setLoading(false));

    } catch (error) {
      console.error('Error fetching movies:', error);
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [searchQuery, currentPage, dispatch]);

  return { fetchMovies };
};

export default useMovies;
