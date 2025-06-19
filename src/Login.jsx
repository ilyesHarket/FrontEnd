import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Assurez-vous d'avoir un fichier CSS pour le style
import { useAuth } from "./ProductsContext";

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
      const res = await fetch("http://localhost:3001/api/v1/users/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // Store auth data in context
        login({
          token: data.token,
          username: data.username,
          role: data.role,
          userId: data.userId,
          name: data.name,
          email: data.email,
        });
        setMessage(null);
        navigate("/");
      } else {
        setMessage(data.message || "Erreur de connexion");
      }
    } catch (err) {
      console.error(err);
      setMessage("Erreur réseau");
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
