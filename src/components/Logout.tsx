import { useNavigate } from 'react-router-dom'; 

const Logout = () => {
  const navigate = useNavigate(); // Skapar en navigate-funktion för att kunna omdirigera användaren

  // Funktion som hanterar utloggning
  const handleLogout = () => {
    // Ta bort token från localStorage för att logga ut användaren
    localStorage.removeItem('token');
    
    // Omdirigera användaren till startsidan ("/")
    navigate('/');
  };

  return (
    // Renderar en knapp som användaren kan klicka på för att logga ut
    <button onClick={handleLogout}>Logga ut</button>
  );
};

export default Logout; // Exporterar Logout-komponenten för att kunna använda den på andra ställen i applikationen
