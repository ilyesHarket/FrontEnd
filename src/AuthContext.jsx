import { createContext, useContext, useState, useEffect } from "react";

// --- Auth Context ---
const AuthContext = createContext();

// Token management singleton
let tokenState = null;
export const getToken = () => tokenState;

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
      tokenState = auth.token;  // Update the singleton
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
    tokenState = authData.token;  // Update the singleton
    setIsAuthenticated(true);
    localStorage.setItem("auth", JSON.stringify({
      user: userData,
      token: authData.token,
    }));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    tokenState = null;  // Update the singleton
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
