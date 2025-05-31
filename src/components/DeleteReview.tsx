import axios from "axios";
// Importera ikon för bättre design
import { Trash2 } from "lucide-react"; 

// Props för komponenten
interface DeleteReviewProps {
  reviewId: number;
  onDelete: (id: number) => void;
}

// Komponent som hanterar borttagning av recension
const DeleteReview = ({ reviewId, onDelete }: DeleteReviewProps) => {
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:3000/reviews/${reviewId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      onDelete(reviewId);
    } catch (error) {
      console.error("Fel vid radering av recension", error);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1"
      title="Ta bort recension"
    >
      <Trash2 size={18} />
    </button>
  );
};

export default DeleteReview;
