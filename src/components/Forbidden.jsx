import { useNavigate } from "react-router-dom";

export default function Forbidden() {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: "center", marginTop: "3rem" }}>
      <h1>403 - Accès interdit</h1>
      <p>Vous n'avez pas l'autorisation d'accéder à cette page.</p>
      <button onClick={() => navigate(-1)} style={{ marginTop: "1rem" }}>
        Retour à la page précédente
      </button>
    </div>
  );
} 