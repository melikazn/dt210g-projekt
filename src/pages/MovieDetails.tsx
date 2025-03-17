import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'; 
import Layout from '../components/Layout'; 

const MovieDetails = () => {
  // Hämta imdbID från URL-parametrar med hjälp av useParams
  const { imdbID } = useParams<{ imdbID: string }>();

  // State för att lagra filminformationen och en loading-state
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // useEffect hook för att hämta filminformation när komponenten renderas
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        // Skicka GET-begäran till OMDb API för att hämta filmdetaljer baserat på imdbID
        const movieResponse = await axios.get(
          `http://www.omdbapi.com/?i=${imdbID}&apikey=f5f1e3b7`
        );
        // Uppdatera state med den hämtade filminformationen
        setMovie(movieResponse.data);

      } catch (error) {
        console.error('Fel vid hämtning av filmdetaljer eller recensioner', error);
        // Logga fel om anropet misslyckas
      } finally {
        // Sätt loading till false när API-anropet är klart
        setLoading(false);
      }
    };

    fetchMovieDetails(); // Kör fetchMovieDetails när komponenten laddas om imdbID ändras
  }, [imdbID]); // useEffect körs om imdbID ändras

  // Returnera en laddar-text om data fortfarande hämtas
  if (loading) return <p>Laddar...</p>;

  // Returnera en meddelande om ingen film finns med detta imdbID
  if (!movie) return <p>Ingen film hittades.</p>;

  return (
    <Layout>
      {/* Länk till hem-sidan */}
      <Link to="/home">Back</Link>

      {/* Visa filmdetaljer */}
      <div>
        <h2>{movie?.Title} ({movie?.Year})</h2> 
        <img src={movie?.Poster} alt={movie?.Title} />
        <p><strong>Regissör:</strong> {movie?.Director}</p>
        <p><strong>Skådespelare:</strong> {movie?.Actors}</p> 
        <p><strong>Plot:</strong> {movie?.Plot}</p> 
      </div>
    </Layout>
  );
};

export default MovieDetails;
