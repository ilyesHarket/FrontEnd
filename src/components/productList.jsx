import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

export default function ProductList() {
  const { id, name } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/v1/products/by-category/${id}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching products:", err);
        // Redirect to categories page if there's an error
        navigate("/categories");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id, navigate]);

  if (loading)
    return <div className="loading-spinner">Loading products...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="product-list">
      <h2>
        {name ? name.charAt(0).toUpperCase() + name.slice(1) : "Products"}
      </h2>
      {products.length > 0 ? (
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <Link to={`/product/${product.id}`}>
                <h3>{product.name}</h3>
                <p className="price">${product.price.toFixed(2)}</p>
                <p className="description">
                  {product.description || "No description available"}
                </p>
                <div className="image-placeholder">
                  {/* Replace with actual image when available */}
                  <span>Product Image</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-products">
          <p>No products found in this category.</p>
          <button onClick={() => navigate("/categories")}>
            Back to Categories
          </button>
        </div>
      )}
    </div>
  );
}
