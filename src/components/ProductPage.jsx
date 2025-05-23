import { useParams } from "react-router-dom";
import { useProducts } from "../ProductsContext";

export default function ProductPage() {
  const { productId } = useParams();
  const { getProductById } = useProducts();
  const product = getProductById(productId);

  if (!product) {
    return <div className="product-not-found">Product not found</div>;
  }

  return (
    <div className="product-page">
      <h1>{product.name}</h1>
      <div className="product-content">
        <div className="product-image">
          <div className="image-placeholder"></div>
        </div>
        <div className="product-details">
          <p className="price">${product.price.toFixed(2)}</p>
          <p className="category">Category: {product.category}</p>
          <button className="add-to-cart">Add to cart</button>
          <div className="description-section">
            <h3>Description</h3>
            <p className="description">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
