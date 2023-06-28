import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
          params: {
            api_key: 'd5c775389c73a0b2a2bc815d05093528',
            language: 'es-MX',
          },
        });

        setPopularMovies(response.data.results);
      } catch (error) {
        console.error('Error al obtener películas populares:', error);
      }
    };

    fetchPopularMovies();
  }, []);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  return (
    <div className="app">
      <h1>API de Películas</h1>
      <div className="movie-container">
        <h2>Películas Populares:</h2>
        <div className="movie-grid">
          {popularMovies.map((movie) => (
            <div
              key={movie.id}
              className={`movie-card ${selectedMovie === movie ? 'selected' : ''}`}
              onClick={() => handleMovieClick(movie)}
            >
              <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} />
              <div className="movie-info">
                <h3>{movie.title}</h3>
                {selectedMovie === movie && (
                  <div>
                    <p className="movie-description">{movie.overview}</p>
                    <p className="movie-rating">Calificación: {movie.vote_average}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
