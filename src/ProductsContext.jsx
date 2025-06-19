import { createContext, useContext, useState, useEffect } from "react";
import React from "react";

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:3001/api/v1/products/");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getProductById = (id) => {
    return products.find((p) => p.id === Number(id));
  };

  return (
    <ProductsContext.Provider value={{ products, loading, getProductById }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
}

// --- Auth Context ---
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Load auth state from localStorage
  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      const auth = JSON.parse(storedAuth);
      setUser(auth.user);
      setToken(auth.token);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (authData) => {
    const userData = {
      username: authData.username,
      role: authData.role,
      userId: authData.userId,
      name: authData.name,
      email: authData.email,
    };
    setUser(userData);
    setToken(authData.token);
    setIsAuthenticated(true);
    localStorage.setItem("auth", JSON.stringify({
      user: userData,
      token: authData.token,
    }));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("auth");
  };

  // Create an axios instance or fetch wrapper with the token
  const authFetch = async (url, options = {}) => {
    if (token) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return fetch(url, options);
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      token,
      login, 
      logout,
      authFetch, // Provide the authenticated fetch function
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
