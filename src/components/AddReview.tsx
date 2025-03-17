import { useState } from "react";
import axios from "axios";
import { Send } from "lucide-react";

// Gränssnitt för komponentens props
interface AddReviewProps {
  movieTitle: string;
  onAddReview: (newReview: Review) => void; // Funktion för att lägga till en ny recension

}
// Gränssnitt för en recension
interface Review {
  id: number;
  username: string;
  review: string;
}
// Funktionell komponent för att lägga till en recension
const AddReview = ({ movieTitle, onAddReview }: AddReviewProps) => {
  const [newReview, setNewReview] = useState("");// State för att lagra den nya recensionstexten
  const [error, setError] = useState("");// State för att hantera felmeddelanden

 // Hanterar formulärinlämning
  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Förhindrar att sidan laddas om vid formulärskick

 // Kontrollera att recensionen inte är tom
    if (!newReview.trim()) {
      setError("Recensionen kan inte vara tom.");
      return;
    }

    try {
      const token = localStorage.getItem("token");// Hämta token från localStorage för autentisering

      const response = await axios.post(
        `http://localhost:3000/reviews/${movieTitle}`, // API-endpoint för att lägga till recension
        { movieTitle, review: newReview }, // Skicka filmens titel och recensionstext i request-body
        {
          headers: {
            Authorization: `Bearer ${token}`, // Skicka token i headers för att autentisera användaren
          },
        }
      );
      console.log("Server Response:", response.data); // Logga serverns svar för debugging

   // Kontrollera att svaret från servern innehåller nödvändig data
      if (response.data && response.data.review && response.data.username) {

         // Uppdatera recensionerna i gränssnittet genom att anropa onAddReview
        onAddReview({
          id: response.data.id, 
          username: response.data.username,
          review: response.data.review,
        });

        setNewReview(""); // Återställ textrutan efter en lyckad inlämning
        setError("");// Återställ felmeddelanden
      } else {
        setError("Fel: Ofullständig respons från servern");
      }
    } catch (error) {
      console.error("Fel vid skickande av recension", error);// Logga eventuella fel i konsolen
      setError("Kunde inte skicka recensionen.");// Visa felmeddelande för användaren
    }
  };

  return (
    <div className="card mt-4 shadow-sm">
      <div className="card-body">
        <h4 className="card-title text-center">Skriv en recension</h4>
        {error && <div className="alert alert-danger">{error}</div>} {/* Visa felmeddelande om det finns något */}

        <form onSubmit={handleReviewSubmit}>
          <div className="mb-3">
            <textarea
              className="form-control"
              value={newReview} // Koppla state till inputfältet
              onChange={(e) => setNewReview(e.target.value)} // Uppdatera state vid ändringar
              placeholder="Skriv din recension här..."
              rows={4}
            />
          </div>

          <div className="d-grid">
            <button className="btn btn-primary d-flex align-items-center justify-content-center" type="submit" disabled={!newReview.trim()}>
              <Send size={18} className="me-2" />{/* Ikon för skicka-knappen */}
              Skicka recension
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReview; // Exportera komponenten så att den kan användas i andra filer
