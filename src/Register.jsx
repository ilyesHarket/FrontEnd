import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      const res = await fetch("http://localhost:3001/api/v1/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setMessage("Inscription réussie ! Redirection...");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        const text = await res.text();
        setMessage(text || "Erreur lors de l'inscription");
      }
    } catch (err) {
      console.error(err);
      setMessage("Erreur réseau");
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
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
            J'accepte les{" "}
            <a href="/cgu" target="_blank" rel="noopener noreferrer">
              conditions d'utilisation
            </a>
          </label>
        </div>
        <button type="submit">S'inscrire</button>
        {message && <div className="register-message">{message}</div>}
      </form>
    </div>
  );
}
