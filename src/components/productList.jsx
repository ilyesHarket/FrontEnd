import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import api from "../api";
import { useAuth } from "../AuthContext";

export default function ProductList() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get(`/api/v1/products/by-category/${id}`);
        setProducts(response.data);
      } catch (err) {
        setError(err.message || "Failed to fetch products");
        console.error("Error fetching products:", err);
        navigate("/categories");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [id, navigate]);

  // Fonction pour ajouter au panier avec authentification JWT
  const addToCart = async (product) => {
    try {
      await api.post(
        "/api/v1/cart/add",
        {
          productId: product.id,
          productName: product.name,
          price: product.price,
          quantity: 1
        }
      );
      alert("Produit ajouté au panier !");
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'ajout au panier");
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;
  if (products.length === 0)
    return <div>Aucun produit trouvé dans cette catégorie.</div>;

  return (
    <div className="products-grid">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <Link to={`/product/${product.id}`}>
            <h3>{product.name}</h3>
            <p>Prix : {product.price.toFixed(2)} €</p>
            <p>{product.description || "Pas de description disponible."}</p>
          </Link>
          <button onClick={() => addToCart(product)} className="add-to-cart">
            Ajouter au panier
          </button>
        </div>
      ))}
    </div>
  );
}
