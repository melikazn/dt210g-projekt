import React, { useState, useEffect } from "react"; 
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/movie-svgrepo-com.svg"

// Header-komponent som hanterar visningen av navigationen och användarinloggning
const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State som håller reda på om användaren är inloggad eller inte
  const navigate = useNavigate(); // useNavigate hook för att navigera programatiskt

  // useEffect som körs när komponenten laddas för att kolla om en token finns i localStorage
  useEffect(() => {
    const token = localStorage.getItem("token"); // Hämtar token från localStorage
    setIsLoggedIn(!!token); // Om en token finns, sätt inloggning till true
  }, []); // Tom array gör att detta körs en gång när komponenten laddas

  // Funktion för att logga ut användaren genom att ta bort token från localStorage
  const handleLogout = () => {
    localStorage.removeItem("token"); // Ta bort token från localStorage
    setIsLoggedIn(false); // Uppdatera state för att reflektera att användaren nu är utloggad
    navigate("/"); // Navigera användaren till startsidan
  };

  return (
    <header className="p-3 text-bg-dark">
      <div className="container">
        <div className="d-flex  align-items-center justify-content-between ">
        
          {/* Navigeringslänk till startsidan med logotyp och text */}
          <Link to="/" className="d-flex align-items-center mb-2 mb-lg-0  text-decoration-none px-2 text-warning">
            <img src={logo} alt="Movie Logo" width="50" height="40" /> {/* Logotypbild */}
            <h3 className="mb-0 ms-2">Sök filmer</h3> {/* Titel på hemsidan */}
          </Link>

          {/* Högra delen av headern som visar knappar för logga ut eller login/registrering beroende på inloggningsstatus */}
          <div className="ms-auto text-end">
            {isLoggedIn ? (
              // Om användaren är inloggad, visa "Logga ut" knapp
              <button type="button" className="btn btn-outline-light me-2" onClick={handleLogout}>Logga ut</button>
            ) : (
              // Om användaren inte är inloggad, visa knappar för login och registrering
              <>
                <Link to="/" className="btn btn-outline-light me-2">Logga in</Link>
                <Link to="/register" className="btn btn-warning">Registrera</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; // Exportera Header-komponenten för att kunna använda den på andra ställen i applikationen
