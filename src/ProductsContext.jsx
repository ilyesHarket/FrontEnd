import { createContext, useContext } from "react";

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const products = [
    {
      id: 1,
      name: "Smartphone",
      price: 599.99,
      category: "electronics",
      description: "Latest smartphone with advanced features",
    },
    // ... other products
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

  const getProductById = (id) => products.find((p) => p.id === Number(id));

  return (
    <ProductsContext.Provider value={{ products, getProductById }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductsContext);
}
