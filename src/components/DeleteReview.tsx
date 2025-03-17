import axios from 'axios';

// Definierar props för DeleteReview-komponenten
interface DeleteReviewProps {
  reviewId: number; // ID för recensionen som ska raderas
  onDelete: (id: number) => void; // Funktion som anropas efter att recensionen raderats
}

// Funktionell komponent för att hantera radering av en recension
const DeleteReview = ({ reviewId, onDelete }: DeleteReviewProps) => {
  
  // Funktion som hanterar radering av en recension
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token'); // Hämta autentiseringstoken från localStorage

      // Skicka DELETE-förfrågan till servern för att radera recensionen
      await axios.delete(`http://localhost:3000/reviews/${reviewId}`, { //Port till backend är 3000
        headers: { Authorization: `Bearer ${token}` }, // Skicka token för autentisering
      });

      onDelete(reviewId); // Anropa onDelete-funktionen för att uppdatera UI:t efter borttagning
    } catch (error) {
      console.error('Fel vid radering av recension', error); // Logga fel om något går fel vid raderingen
    }
  };

  return <button onClick={handleDelete}>Ta bort</button>; // Knapp för att radera recensionen
};

export default DeleteReview; // Exporterar komponenten för användning i andra filer
