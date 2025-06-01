import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import movieImage from "../assets/images/movie.png";
import Pagination from "../components/pagination";

// Typdefinition för en film från OMDb API
interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Poster: string;
}

const Videor = () => {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const moviesPerPage = 10;

  // Funktion som hämtar filmer från OMDb API
  const searchMovies = async (page: number = 1) => {
    if (!search.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?s=${search}&page=${page}&apikey=f5f1e3b7`
      );

      if (response.data.Response === "True") {
        setMovies(response.data.Search || []);
        setTotalResults(parseInt(response.data.totalResults));
        setCurrentPage(page);
      } else {
        setMovies([]);
        setTotalResults(0);
        setError("Inga filmer hittades för din sökning.");
      }
    } catch (err) {
      console.error("Fel vid hämtning av filmer", err);
      setError("Ett fel uppstod vid hämtning av filmer.");
    } finally {
      setLoading(false);
    }
  };
  // Beräkna totalt antal sidor baserat på antal filmer per sida
  const totalPages = Math.ceil(totalResults / moviesPerPage);

  return (
    <Layout>
      <div className="container">
        <h2 className="mb-4 text-center">🎬 Sök filmer</h2>

        {/* Sökformulär */}
        <form
          className="d-flex justify-content-center mb-4"
          onSubmit={(e) => {
            e.preventDefault();
            searchMovies(1); // Starta ny sökning från sida 1
          }}
        >
          <input
            type="text"
            className="form-control w-50 me-2"
            placeholder="Skriv filmtitel..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            Sök
          </button>
        </form>
        {/* Felmeddelande */}
        {error && (
          <div className="alert alert-warning text-center" role="alert">
            {error}
          </div>
        )}
        {/* Visa filmillustration är kvar om ingen resultat finns */}
        {!loading && movies.length === 0 && (
          <div className="text-center">
            <img
              src={movieImage}
              alt="Inga filmer"
              className="img-fluid"
              style={{ maxWidth: "40%", minWidth: "300px", opacity: 0.5 }}
            />
            <p className="mt-3 text-muted">Sök efter filmer ovan.</p>
          </div>
        )}

        {/* Lista med filmer som hittats */}
        <div className="row">
          {movies.map((movie) => (
            <div className="col-md-4 mb-4" key={movie.imdbID}>
              <div className="card h-100 shadow">
                <img
                  src={movie.Poster !== "N/A" ? movie.Poster : "/no-image.jpg"}
                  className="card-img-top"
                  alt={movie.Title}
                />
                <div className="card-body d-flex flex-column justify-content-between">
                  <h5 className="card-title">{movie.Title}</h5>
                  <p className="card-text">{movie.Year}</p>
                  <div className="d-grid gap-2">
                    <Link
                      to={`/movie/${movie.imdbID}`}
                      className="btn btn-outline-primary btn-sm"
                    >
                      Visa detaljer
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Visar paginering om det finns flera sidor */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={searchMovies}
          />
        )}
      </div>
    </Layout>
  );
};

export default Videor;
