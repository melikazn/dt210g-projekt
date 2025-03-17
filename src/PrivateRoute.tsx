import { Navigate, useLocation } from "react-router-dom";
import { JSX, useEffect, useState } from "react";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation(); // För att hämta den aktuella platsen (URL)

  useEffect(() => {
    // Hämta token från localStorage för att kontrollera om användaren är inloggad
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // Om token finns, sätt autentiserad till true
  }, []);

  if (isAuthenticated === null) return <div>Laddar...</div>; // Visar en laddningsindikator tills autentiseringen är klar

  // Om användaren inte är autentiserad, omdirigera till login-sidan
  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  // Om användaren är autentiserad, rendera barnkomponenten
  return children;
};

export default PrivateRoute;
