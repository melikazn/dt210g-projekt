import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Pencil } from "lucide-react";
import Layout from "../components/Layout";
import AddReview from "../components/AddReview";
import UpdateReview from "../components/UpdateReview";
import DeleteReview from "../components/DeleteReview"; 

// Typdefinition för recensioner
interface Review {
  id: number;
  username: string;
  review: string;
}

const MovieDetails = () => {
  // Hämta filmens ID från URL
  const { imdbID } = useParams<{ imdbID: string }>();

  // State-variabler
  const [movie, setMovie] = useState<any>(null); 
  const [reviews, setReviews] = useState<Review[]>([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(""); 
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null); 
  const [editingReviewId, setEditingReviewId] = useState<number | null>(null);


useEffect(() => {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  // Endast sätt loggedInUser om båda finns
  if (token && username) {
    setLoggedInUser(username);
  } else {
    setLoggedInUser(null);
  }

  const fetchData = async () => {
    try {
      // Hämta filmdata
      const movieResponse = await axios.get(
        `https://www.omdbapi.com/?i=${imdbID}&apikey=f5f1e3b7`
      );
      setMovie(movieResponse.data);

      // Hämta recensioner
      const reviewsResponse = await axios.get(
        `http://localhost:3000/reviews/${movieResponse.data.Title}`
      );

      setReviews(Array.isArray(reviewsResponse.data) ? reviewsResponse.data : []);
    } catch (error) {
      console.error("Fel vid hämtning", error);
      setError("Kunde inte hämta data.");
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [imdbID]);


  // Hantera borttagning av recension
  const handleDeleteReview = (id: number) => {
    // Uppdatera listan i UI efter lyckad borttagning
    setReviews((prev) => prev.filter((review) => review.id !== id));
  };

  // Hantera uppdatering av recension
  const handleUpdateReview = async (id: number, updatedText: string) => {
    try {
      const token = localStorage.getItem("token"); // Behövs för autentisering
      await axios.put(
        `http://localhost:3000/reviews/${id}`,
        { review: updatedText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Uppdatera recensionen 
      setReviews((prev) =>
        prev.map((review) =>
          review.id === id ? { ...review, review: updatedText } : review
        )
      );
      setEditingReviewId(null); // Avsluta redigeringsläge
    } catch (error) {
      console.error("Fel vid uppdatering av recension", error);
    }
  };

  // Visa laddning eller fel om det behövs
  if (loading) return <p className="text-center mt-5">Laddar...</p>;
  if (!movie) return <p className="text-center mt-5">Ingen film hittades.</p>;

  return (
    <Layout>
      <div className="container mt-4 px-5">
        {/* Tillbaka-knapp */}
        <Link to="/videor" className="btn btn-outline-secondary mb-3">⬅ Tillbaka</Link>

        {/* Filmdata i två kolumner */}
        <div className="row">
          <div className="col-md-4">
            <img src={movie?.Poster} alt={movie?.Title} className="img-fluid rounded" />
          </div>
          <div className="col-md-8">
            <h2>{movie?.Title} ({movie?.Year})</h2>
            <p><strong>Regissör:</strong> {movie?.Director}</p>
            <p><strong>Skådespelare:</strong> {movie?.Actors}</p>
            <p><strong>Handling:</strong> {movie?.Plot}</p>
          </div>
        </div>

        {/* Recensionsdel */}
        <hr className="my-4" />
        <div className="card shadow p-3">
          <h3 className="text-center">Recensioner</h3>

          {/* Felmeddelande om det finns */}
          {error && <div className="alert alert-danger text-center">{error}</div>}

          {/* Lista av recensioner eller meddelande om det saknas */}
          {reviews.length === 0 ? (
            <p className="text-center text-muted">Inga recensioner än.</p>
          ) : (
            <ul className="list-group">
              {reviews.map((review) => (
                <li key={review.id} className="list-group-item d-flex justify-content-between align-items-center">
                  
                  {/* Om man redigerar en recension */}
                  {editingReviewId === review.id ? (
                    <UpdateReview
                      reviewId={review.id}
                      currentReview={review.review}
                      onUpdate={handleUpdateReview}
                      onCancel={() => setEditingReviewId(null)}
                    />
                  ) : (
                    <div>
                      <strong>{review.username}:</strong> {review.review}
                    </div>
                  )}

                  {/* Redigera/radera endast om man själv är användaren */}
                  {loggedInUser === review.username && (
                    <div className="btn-group">
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => setEditingReviewId(review.id)}
                      >
                        <Pencil size={18} />
                      </button>
                      <DeleteReview
                        reviewId={review.id}
                        onDelete={handleDeleteReview}
                      />
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}

          {/* Visa formulär för att lägga till ny recension om man är inloggad */}
          {loggedInUser && (
            <AddReview
              movieTitle={movie?.Title}
              onAddReview={(newReview) =>
                setReviews((prev) => [...prev, newReview])
              }
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MovieDetails;
