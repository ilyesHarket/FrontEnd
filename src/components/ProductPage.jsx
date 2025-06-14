import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ProductPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:3001/api/v1/products/${productId}`
        );
        if (!response.ok) {
          throw new Error("Product not found");
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  // Fonction pour ajouter au panier
  const addToCart = async () => {
    try {
      await axios.post("http://localhost:3001/api/v1/cart/add", {
        productId: product.id,
        productName: product.name,
        price: product.price,
        quantity: 1,
      }, {
          auth: {
            username: "admin", // remplace par ton login
            password: "admin", // remplace par ton mot de passe
          },
        });
      alert("Produit ajouté au panier !");
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'ajout au panier");
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Produit non trouvé</div>;

  return (
    <div className="product-page">
      <h2>{product.name}</h2>
      <p>Prix : {product.price.toFixed(2)} €</p>
      <p>{product.description || "Pas de description disponible."}</p>
      <button onClick={addToCart} className="add-to-cart">
        Ajouter au panier
      </button>
    </div>
  );
}
