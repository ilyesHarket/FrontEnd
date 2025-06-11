import React, { useState, useEffect } from "react";
import axios from "axios";

function Panier() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/v1/cart", {
        auth: {
          username: "admin",
          password: "admin",
        },
      })
      .then((response) => {
        setCart(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Erreur lors du chargement du panier");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Chargement du panier...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="panier">
      <h2>Votre panier</h2>
      {cart.length === 0 ? (
        <p>Votre panier est vide</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.productId}>
              <span>{item.productName}</span>
              <span>Quantité : {item.quantity}</span>
              <span>Prix : {item.price.toFixed(2)} €</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Panier;
