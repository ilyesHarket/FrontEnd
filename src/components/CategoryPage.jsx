import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:3001/api/v1/categories/"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <div>Loading categories...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="category-page">
      <h2>Shop by category</h2>
      <div className="category-grid">
        {categories.map((category, index) => (
          <Link
            to={`/category/${category.toLowerCase()}`}
            key={index}
            className="category-card"
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Link>
        ))}
      </div>
    </div>
  );
}
