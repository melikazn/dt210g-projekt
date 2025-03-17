import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom"; 
import axios from "axios";
import { Pencil, Trash } from "lucide-react"; 
import Layout from "../components/Layout";
import AddReview from "../components/AddReview"; 
import UpdateReview from "../components/UpdateReview";

// Typdefinition för recensioner
interface Review {
  id: number;
  username: string;
  review: string;
}

const ReviewList = () => {
  const { imdbID } = useParams<{ imdbID: string }>(); // Hämtar imdbID från URL-parametrarna
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [movie, setMovie] = useState<any>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(""); 
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
  const [editingReviewId, setEditingReviewId] = useState<number | null>(null); 

  // useEffect hook som körs när imdbID ändras
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoggedInUser(localStorage.getItem("username")); // Hämtar användarnamnet från localStorage

        // Hämtar filmdetaljer från OMDb API
        const movieResponse = await axios.get(
          `http://www.omdbapi.com/?i=${imdbID}&apikey=f5f1e3b7`
        );
        setMovie(movieResponse.data); // Sätter filmens detaljer i state

        // Hämtar recensioner från backend för den aktuella filmen
        const reviewsResponse = await axios.get(
          `http://localhost:3000/reviews/${movieResponse.data.Title}`
        );
        // Sätter recensionerna i state om de är en array
        setReviews(Array.isArray(reviewsResponse.data) ? reviewsResponse.data : []);
      } catch (error) {
        console.error("Fel vid hämtning av filmdetaljer eller recensioner", error);
        setError("Kunde inte hämta filmens detaljer eller recensioner."); // Sätter felmeddelande vid problem
      } finally {
        setLoading(false); // Stänger av laddningsindikatorn
      }
    };

    fetchMovieDetails(); // Kör funktionen för att hämta film och recensioner
  }, [imdbID]); // Kör om när imdbID ändras

  // Funktion för att hantera borttagning av recension
  const handleDeleteReview = async (id: number) => {
    try {
      const token = localStorage.getItem("token"); 
      await axios.delete(`http://localhost:3000/reviews/${id}`, {
        headers: { Authorization: `Bearer ${token}` }, // Lägger till token i headers för autentisering
      });
      // Uppdaterar recensionerna i state genom att filtrera bort den raderade recensionen
      setReviews((prev) => prev.filter((review) => review.id !== id));
    } catch (error) {
      console.error("Fel vid radering av recension", error); // Felhantering om radering misslyckas
    }
  };

  // Funktion för att hantera uppdatering av recension
  const handleUpdateReview = async (id: number, updatedText: string) => {
    try {
      const token = localStorage.getItem("token"); 
      await axios.put(
        `http://localhost:3000/reviews/${id}`,
        { review: updatedText },
        { headers: { Authorization: `Bearer ${token}` } } 
      );
      // Uppdaterar recensionerna i state med den nya texten
      setReviews((prev) =>
        prev.map((review) =>
          review.id === id ? { ...review, review: updatedText } : review
        )
      );
      setEditingReviewId(null); // Återställer redigering
    } catch (error) {
      console.error("Fel vid uppdatering av recension", error); // Felhantering om uppdatering misslyckas
    }
  };

  // Laddar meddelande eller felmeddelande medan data hämtas
  if (loading) return <p className="text-center mt-5">Laddar...</p>;
  if (!movie) return <p className="text-center mt-5">Ingen film hittades.</p>;

  return (
    <Layout> {/* Omger sidan med Layout-komponenten */}
      <Link to="/home">Back</Link> 
      <div className="container mt-4 px-5">
        <h2 className="text-center mb-3">{movie.Title}</h2>
        
        <div className="card shadow p-3">
          <h3 className="text-center">Recensioner</h3>
          {error && <div className="alert alert-danger text-center">{error}</div>}
          
          {/* Om det inte finns några recensioner */}
          {reviews.length === 0 ? (
            <p className="text-center text-muted">Inga recensioner än.</p>
          ) : (
            <ul className="list-group">
              {/* Visa recensioner */}
              {reviews.map((review) => (
                <li key={review.id} className="list-group-item d-flex justify-content-between align-items-center">
                  {/* Om recensionen redigeras, visa UpdateReview-komponenten */}
                  {editingReviewId === review.id ? (
                    <UpdateReview
                      reviewId={review.id}
                      currentReview={review.review}
                      onUpdate={(id, updatedReview) => handleUpdateReview(id, updatedReview)} 
                      onCancel={() => setEditingReviewId(null)} 
                    />
                  ) : (
                    <div>
                      <strong>{review.username}:</strong> {review.review} 
                    </div>
                  )}

                  {/* Om användaren som är inloggad är samma som recensionens användare */}
                  {loggedInUser === review.username && (
                    <div className="btn-group">
                      {/* Knapp för att redigera recension */}
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => setEditingReviewId(review.id)}
                      >
                        <Pencil size={18} />
                      </button>
                      {/* Knapp för att radera recension */}
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDeleteReview(review.id)}
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}

          {/* Komponent för att lägga till recension */}
          <AddReview
            movieTitle={movie?.Title}
            onAddReview={(newReview) => setReviews((prev) => [...prev, newReview])} // Lägg till ny recension i state
          />
        </div>
      </div>
    </Layout>
  );
};

export default ReviewList;
