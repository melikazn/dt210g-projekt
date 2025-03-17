import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Logout from './components/Logout';  
import Register from './pages/Register'; 
import Login from './pages/Login'; 
import Home from './pages/Home';  
import MovieDetails from './pages/MovieDetails'; 
import PrivateRoute from './PrivateRoute';  
import ReviewList from './pages/ReviewList'; 
import "./assets/styles/App.css" 

const App = () => {
  // Hanterar användarens inloggningstillstånd
  const [user, setUser] = useState<{ id: number; username: string } | null>(null);  

  return (
    <Router>
      {/* Här definieras alla rutter och vilka komponenter som ska visas baserat på användarens väg */}
      <Routes>
        {/* Rutt för login-sidan. Sätter användaren när inloggning är lyckad */}
        <Route path="/" element={<Login setUser={setUser} />} />  

        {/* Skyddad rutt för /home, endast tillgänglig om användaren är inloggad */}
        <Route 
          path="/home" 
          element={
            <PrivateRoute>
                <Home />
            </PrivateRoute>
          } 
        />

        {/* Rutt för registreringssidan */}
        <Route path="/register" element={<Register />} />
        
        {/* Rutt för logout-sidan */}
        <Route path="/" element={<Logout />} />

        {/* Rutt för filmdetaljer baserat på imdbID */}
        <Route path="/movie/:imdbID" element={<MovieDetails />} />

        {/* Rutt för att visa recensioner för en specifik film */}
        <Route path="/reviews/:imdbID" element={<ReviewList />} />
      </Routes>
    </Router>
  );
};

export default App; 
