import './App.css';
import Home from './Components/Home';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MovieDetails from './Components/MovieDetails';
import NavbarComponent from './common/Navbar';
import UpcomingMovies from './Components/UpcomingMovies';
import TopRatedMovies from './Components/TopRatedMovies';
import ScrollComponent from './common/ScrollComponent';
import { useState } from 'react';
import Footer from './common/Footer';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <ScrollComponent>
      <Router>
        <NavbarComponent onSearch={handleSearch} />
        <Routes>
          <Route path="/" element={<Home searchQuery={searchQuery} />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/upcoming" element={<UpcomingMovies />} />
          <Route path="/top-rated" element={<TopRatedMovies />} />
        </Routes>
      </Router>
      <Footer/>
    </ScrollComponent>
  );
}

export default App;
