import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Layout from '../components/Layout'; 

// Definiera Movie-typen för filmernas egenskaper
interface Movie {
  Title: string;   
  Year: string;    
  imdbID: string; 
}

const Home = () => {
  // State för att hantera användarens söksträng
  const [search, setSearch] = useState("");
  
  // State för att lagra listan av filmer som returneras från API:et
  const [movies, setMovies] = useState<Movie[]>([]);
  
  // State för att hantera laddningstillstånd 
  const [loading, setLoading] = useState(false);

  // Funktion för att söka efter filmer när formuläret skickas
  const searchMovies = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setLoading(true);    
    try {
      // Skicka en GET-begäran till OMDb API för att hämta filmer baserat på söksträngen
      const response = await axios.get(`http://www.omdbapi.com/?s=${search}&apikey=f5f1e3b7`);
      
      // Om sökningen gav några resultat, sätt dessa till state; annars en tom array
      setMovies(response.data.Search || []);
    } catch (err) {
      console.error(err); // Logga fel om något går fel med API-anropet
    } finally {
      setLoading(false);  // Oavsett resultat, sätt laddningstillståndet till false
    }
  };

  return (
    <Layout> {/* Använd Layout-komponenten för att skapa sidstruktur */}
      <div>
        <h2>Hitta filmer</h2> {/* Rubrik för söksidan */}
        
        {/* Formulär för att söka efter filmer */}
        <form onSubmit={searchMovies}>
          <input
            type="text"
            placeholder="Sök efter film"  // Platshållare som talar om för användaren vad de ska skriva
            value={search}              // Bindning till search state
            onChange={(e) => setSearch(e.target.value)}  // Uppdatera söksträngen när användaren skriver
          />
          <button type="submit">Sök</button>  {/* Skicka formuläret för att söka filmer */}
        </form>

        {/* Visa en laddningsindikator om filmerna fortfarande hämtas */}
        {loading && <p>Laddar...</p>}
        <h3 >Ingen film hittades!</h3>

        {/* Om det finns några filmer, rendera listan */}
        {movies && (
          <div>
            <ul>
              {/* Iterera genom filmerna och skapa en lista */}
              {movies.map((movie) => (
                <li key={movie.imdbID}>
                  <div>
                    <h3>{movie.Title} ({movie.Year})</h3> {/* Visa filmtitel och år */}
                    
                    {/* Länk till filmens detaljsida */}
                    <Link to={`/movie/${movie.imdbID}`}>Se mer</Link> 
                    
                    {/* Länk till recensionerna för filmen */}
                    <Link to={`/reviews/${movie.imdbID}`}>Recensioner</Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Home;
