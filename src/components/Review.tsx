interface ReviewProps {
    username: string; // Lägg till 'username' här
    review: string;   // Recensionstexten
  }
  
  const Review = ({ username, review }: ReviewProps) => {
    // Review-komponenten tar emot 'username' och 'review' som props och renderar en lista med recensionen
    return (
    <li>
      <strong>{username}:</strong> {/* Visa användarnamn */}
      <p>{review}</p> {/* Visa recensionstexten */}
    </li>
  );
}
  export default Review;// Exportera Review-komponenten så den kan användas på andra ställen
  