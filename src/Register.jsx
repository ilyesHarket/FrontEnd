import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import api from "./api";
//import "./Login.css";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    birthdate: "",
    address: "",
    acceptCGU: false,
  });
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!form.acceptCGU) {
      setMessage("Vous devez accepter les conditions d'utilisation.");
      return;
    }

    try {
      const res = await api.post("/api/v1/users/signup", form);
      const data = res.data;
      // If backend returns auth data on signup, store it and redirect
      if (data.token) {
        login({
          token: data.token,
          username: data.username,
          role: data.role,
          userId: data.userId,
          name: data.name,
          email: data.email,
        });
        setMessage(null);
        if (data.role === "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/categories");
        }
      } else {
        setMessage("Inscription réussie ! Redirection...");
        setTimeout(() => navigate("/login"), 1500);
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setMessage(err.response.data.message || "Erreur lors de l'inscription");
      } else {
        setMessage("Erreur réseau");
      }
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Inscription</h2>
        <input
          type="text"
          name="username"
          placeholder="Nom d'utilisateur"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={form.password}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Numéro de téléphone"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="birthdate"
          placeholder="Date de naissance"
          value={form.birthdate}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Adresse"
          value={form.address}
          onChange={handleChange}
          required
        />
        <div className="register-checkbox">
          <input
            type="checkbox"
            name="acceptCGU"
            checked={form.acceptCGU}
            onChange={handleChange}
            id="acceptCGU"
            required
          />
          <label htmlFor="acceptCGU">
            J'accepte les {" "}
            <a href="/cgu" target="_blank" rel="noopener noreferrer">
              conditions d'utilisation
            </a>
          </label>
        </div>
        <button type="submit">S'inscrire</button>
        {message && <div className="login-message">{message}</div>}
      </form>
    </div>
  );
}
