import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Logout from './components/Logout';
import Register from './pages/Register';
import Login from './pages/Login';
import MovieDetails from './pages/MovieDetails';
import "./assets/styles/App.css"; 
import Videor from './pages/Videor';

const App = () => {
  // State för inloggad användare
  const [user, setUser] = useState<{ id: number; username: string } | null>(null);

  return (
    <Router>
      <Routes>

        <Route path="/" element={<Navigate to="/videor" replace />} />
        <Route path="/videor" element={<Videor />} />
        <Route path="/register" element={<Register />} />

        {/* Inloggningssida – skickar med setUser för att spara användaren vid lyckad inloggning */}
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/movie/:imdbID" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
