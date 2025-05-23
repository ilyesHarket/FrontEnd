import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/v1/categories/"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading)
    return <div className="loading-spinner">Loading categories...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="category-page">
      <h1>Shop by Category</h1>
      <div className="category-grid">
        {categories.map((category) => (
          <Link
            to={`/category/${category.id}/${category.name.toLowerCase()}`}
            key={category.id}
            className="category-card"
          >
            <h3>{category.name}</h3>
            <p>{category.description || "Explore products"}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
