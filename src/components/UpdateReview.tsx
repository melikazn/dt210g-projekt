import { useState } from "react";
import axios from "axios";
import { Check, X } from "lucide-react";

// Definiera props som ska tas emot av UpdateReview-komponenten
interface UpdateReviewProps {
  reviewId: number;           
  currentReview: string;     
  onUpdate: (id: number, updatedReview: string) => void; 
  onCancel: () => void;      
}

const UpdateReview = ({ reviewId, currentReview, onUpdate, onCancel }: UpdateReviewProps) => {
  // State för att hålla den uppdaterade recensionen
  const [updatedReview, setUpdatedReview] = useState(currentReview);

  // State för att hantera felmeddelanden
  const [error, setError] = useState("");

  // Funktion för att hantera uppdateringen av recensionen
  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Förhindra formulärens standardbeteende
    try {
      const token = localStorage.getItem("token"); // Hämta token från localStorage

      // Skicka en PUT-begäran för att uppdatera recensionen
      const response = await axios.put(
        `http://localhost:3000/reviews/${reviewId}`,  // Endpoint för att uppdatera recensionen
        { review: updatedReview }, // Skickar den uppdaterade recensionen
        { headers: { Authorization: `Bearer ${token}` } } // Lägg till Authorization-headern med token
      );

      if (response.data) {
        // Om uppdateringen lyckades, anropa onUpdate med recensionens ID och den uppdaterade recensionen
        onUpdate(reviewId, updatedReview);
      } else {
        console.error("Fel: Ofullständig respons från servern", response.data); // Hantera ofullständig serverrespons
      }
    } catch (error) {
      console.error("Fel vid uppdatering av recension", error);
      setError("Kunde inte uppdatera recensionen."); // Sätt ett felmeddelande om något går fel
    }
  };

  return (
    <div className="p-4 border rounded shadow-sm bg-light">
      <form onSubmit={handleUpdateSubmit}> {/* Formulär för att uppdatera recensionen */}
        <div className="mb-3">
          <textarea
            value={updatedReview} // Håller värdet för recensionen som användaren ändrar
            onChange={(e) => setUpdatedReview(e.target.value)} // Uppdaterar recensionen vid förändring
            rows={4}
            className="form-control"
            placeholder="Uppdatera din recension här" // Plats för att skriva ny recension
          />
        </div>

        {/* Knappar för att uppdatera eller avbryta */}
        <div className="d-flex justify-content-end gap-3">
          <button
            type="submit"
            className="btn btn-success d-flex align-items-center"
            disabled={!updatedReview} // Avaktivera knappen om recensionen är tom
          >
            <Check size={18} className="me-2" /> Uppdatera
          </button>
          <button
            type="button"
            className="btn btn-secondary d-flex align-items-center"
            onClick={onCancel} // Anropa onCancel när användaren vill avbryta
          >
            <X size={18} className="me-2" /> Avbryt
          </button>
        </div>
      </form>

      {/* Visa felmeddelande om det finns något */}
      {error && <p className="text-danger mt-3">{error}</p>}
    </div>
  );
};

export default UpdateReview;
