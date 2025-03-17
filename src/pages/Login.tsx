import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout"; 
import { Mail, Lock } from "lucide-react"; 

const Login = ({
  setUser,
}: {
  setUser: React.Dispatch<
    React.SetStateAction<{ id: number; username: string } | null>
  >;
}) => {
  // State för att hantera användarens e-post och lösenord
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // State för att hantera felmeddelanden vid misslyckad inloggning
  const [error, setError] = useState("");
  
  // Använd navigate för att navigera till andra sidor
  const navigate = useNavigate();

  // Funktion för att hantera inloggningsformuläret
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Skicka POST-begäran till backend för att logga in användaren
      const response = await axios.post("http://localhost:3000/users/login", {
        email,
        password,
      });

      // Om inloggning lyckas, sätt användaren i state
      setUser({ id: response.data.userId, username: response.data.username });

      // Spara token och användarnamn i localStorage för framtida användning
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username);

      // Omdirigera användaren till hemsidan
      navigate("/home");
    } catch (err) {
      console.log(err); // Logga fel om något gick fel
      setError("Fel e-post eller lösenord."); // Visa felmeddelande vid misslyckad inloggning
    }
  };

  return (
    <Layout> {/* Använd Layout-komponenten för att skapa sidstruktur */}
      <div className="login-layout">
        <div className="d-flex justify-content-center align-items-center h-100">
          <div className="card shadow-lg p-4 login-card">
            <h2 className="text-center mb-4">Logga in</h2> {/* Rubrik för inloggningssidan */}
            
            {/* Visa ett felmeddelande om det finns ett fel */}
            {error && (
              <div className="alert alert-danger text-center">{error}</div>
            )}

            <form onSubmit={handleSubmit}>
              {/* E-postadress input */}
              <div className="mb-3">
                <label className="form-label">E-post</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <Mail size={20} />
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Ange din e-post"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Uppdatera email vid förändring
                    required
                  />
                </div>
              </div>

              {/* Lösenord input */}
              <div className="mb-3">
                <label className="form-label">Lösenord</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <Lock size={20} /> {/* Lösenord ikon */}
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Ange ditt lösenord"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // Uppdatera lösenord vid förändring
                    required
                  />
                </div>
              </div>

              {/* Inloggningsknapp */}
              <button type="submit" className="btn btn-primary w-100">
                Logga in
              </button>
            </form>

            {/* Länk till registreringssidan om användaren inte har ett konto */}
            <p className="text-center mt-3">
              Har du inget konto?{" "}
              <a href="/register" className="text-decoration-none">
                Registrera dig
              </a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
