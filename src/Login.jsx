import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Assurez-vous d'avoir un fichier CSS pour le style
import { useAuth } from "./AuthContext";
import api from "./api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Se connecter</button>
        {message && <div className="login-message">{message}</div>}
      </form>
    </div>
  );
}
