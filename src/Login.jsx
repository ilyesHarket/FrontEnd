import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    const url = `http://localhost:3001/api/v1/users/signin?Username=${encodeURIComponent(
      username
    )}&Password=${encodeURIComponent(password)}`;

    try {
      const res = await fetch(url, {
        method: "POST",
      });
      if (res.ok) {
        // Redirige vers la page d'accueil après succès
        navigate("/");
      } else {
        const text = await res.text();
        setMessage(text || "Erreur de connexion");
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
