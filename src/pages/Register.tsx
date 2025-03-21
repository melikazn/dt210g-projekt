import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";
import { Mail, Lock, User } from "lucide-react";

// Register-komponenten för registrering av användare
const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

    // Funktion för att hantera formens inlämning
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Gör en POST-förfrågan till backend för att skapa en ny användare
      await axios.post("http://localhost:3000/users/register", {
        email,
        username,
        password,
      });
      alert("Konto registrerat!")
      navigate("/");// Vid lyckad registrering navigera användaren till inloggningssidan
    } catch (err: unknown) {
       // Om ett fel inträffar, visa ett felmeddelande
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Registreringen misslyckades.");
      } else {
        setError("Ett oväntat fel inträffade.");
      }
    }
  };
  return (
    <Layout> {/* Omger sidan med Layout-komponenten */}
      <div className="login-layout">
        <div className="d-flex justify-content-center align-items-center h-100">
          <div className="card shadow-lg p-4 login-card"> 
            <h2 className="text-center mb-4">Registrera</h2> {/* Rubrik för sidan */}
            
            {/* Om ett fel inträffar visas det här felet */}
            {error && <div className="alert alert-danger text-center">{error}</div>}

            {/* Registreringsformulär */}
            <form onSubmit={handleSubmit}>
              {/* E-postfält */}
              <div className="mb-3">
                <label className="form-label">E-post</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <Mail size={20} /> {/* Ikon för e-post */}
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Ange din e-post"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Uppdaterar emailvärdet vid inmatning
                    required
                  />
                </div>
              </div>

              {/* Användarnamnsfält */}
              <div className="mb-3">
                <label className="form-label">Användarnamn</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <User size={20} /> {/* Ikon för användarnamn */}
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ange ditt användarnamn"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} // Uppdaterar användarnamnet vid inmatning
                    required
                  />
                </div>
              </div>

              {/* Lösenordsfält */}
              <div className="mb-3">
                <label className="form-label">Lösenord</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <Lock size={20} /> {/* Ikon för lösenord */}
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Ange ett lösenord"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // Uppdaterar lösenordet vid inmatning
                    required
                  />
                </div>
              </div>

              {/* Registreringsknapp */}
              <button type="submit" className="btn btn-primary w-100">
                Registrera
              </button>
            </form>

            {/* Länk för att navigera till inloggningssidan om användaren redan har ett konto */}
            <p className="text-center mt-3">
              Har du redan ett konto?{" "}
              <a href="/" className="text-decoration-none">Logga in</a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
