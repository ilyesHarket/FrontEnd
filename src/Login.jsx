import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css"; // Assurez-vous d'avoir un fichier CSS pour le style
import { useAuth } from "./AuthContext";
import api from "./api";

function EyeIcon({ open }) {
  return open ? (
    // Eye open SVG
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="10" cy="10" rx="7" ry="4" stroke="#333" strokeWidth="2" fill="none" />
      <circle cx="10" cy="10" r="2" fill="#333" />
    </svg>
  ) : (
    // Eye closed SVG (eye with slash)
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="10" cy="10" rx="7" ry="4" stroke="#333" strokeWidth="2" fill="none" />
      <circle cx="10" cy="10" r="2" fill="#333" />
      <line x1="4" y1="16" x2="16" y2="4" stroke="#333" strokeWidth="2" />
    </svg>
  );
}

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    try {
      const res = await api.post("/api/v1/users/signin", {
        username,
        password,
      });
      const data = res.data;
      login({
        token: data.token,
        username: data.username,
        role: data.role,
        userId: data.userId,
        name: data.name,
        email: data.email,
      });
      setMessage(null);

      // Handle role-based redirect
      if (data.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/categories");
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setMessage(err.response.data.message || "Erreur de connexion");
      } else {
        setMessage("Erreur réseau");
      }
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Connexion</h2>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <div style={{ position: "relative", width: "100%" }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ display: "block", width: "100%", paddingRight: 0, paddingLeft: 0 }}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            style={{
              position: "absolute",
              right: 8,
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#333"
            }}
            tabIndex={-1}
            aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
          >
            <EyeIcon open={showPassword} />
          </button>
        </div>
        <button type="submit">Se connecter</button>
        {message && <div className="login-message">{message}</div>}
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <span>Vous n'avez pas de compte ? </span>
          <Link to="/register">Inscrivez-vous ici</Link>
        </div>
      </form>
    </div>
  );
}
