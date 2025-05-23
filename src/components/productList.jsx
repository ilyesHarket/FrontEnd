import { Link, useParams } from "react-router-dom";

export default function ProductList() {
  const { category } = useParams();
  // Sample product data with consistent category names
  const products = [
    { id: 1, name: "Smartphone", price: 599.99, category: "electronics" },
    { id: 2, name: "Laptop", price: 999.99, category: "electronics" },
    { id: 3, name: "Headphones", price: 149.99, category: "electronics" },
    { id: 4, name: "T-Shirt", price: 19.99, category: "clothing" },
    { id: 5, name: "Jeans", price: 49.99, category: "clothing" },
    { id: 6, name: "Running Shoes", price: 89.99, category: "shoes" },
    { id: 7, name: "Handbag", price: 129.99, category: "bags" },
    { id: 8, name: "Novel", price: 14.99, category: "books" },
    { id: 9, name: "Chair", price: 199.99, category: "furniture" },
    { id: 10, name: "Moisturizer", price: 24.99, category: "beauty" },
  ];

  // Filter products by category (case insensitive)
  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === category.toLowerCase()
  );

  return (
    <div className="product-list">
      <h2>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
      {filteredProducts.length > 0 ? (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className="product-card"
            >
              <h3>{product.name}</h3>
              <p>${product.price.toFixed(2)}</p>
              <div className="image-placeholder-small"></div>
            </Link>
          ))}
        </div>
      ) : (
        <p>No products found in this category.</p>
      )}
    </div>
  );
}
