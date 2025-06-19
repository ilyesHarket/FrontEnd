import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CategoryPage from "./components/CategoryPage";
import ProductList from "./components/productList";
import ProductPage from "./components/ProductPage";
import Login from "./Login";
import Register from "./Register";
import Panier from "./components/Panier";
import AdminPanel from "./components/AdminPanel";
import ProtectedRoute from "./components/ProtectedRoute";
import Forbidden from "./components/Forbidden";
import "./App.css"; // CSS global (navbar, footer, produits, etc.)
import { AuthProvider } from "./AuthContext";

function App() {
  return (
    <div className="app-root">
      <AuthProvider>
        <Navbar />
        <main>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forbidden" element={<Forbidden />} />
            
            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Admin-only routes */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute 
                  element={<AdminPanel />} 
                  allowedRoles={["ADMIN"]} 
                />
              } 
            />

            {/* User-only routes */}
            <Route 
              path="/categories" 
              element={
                <ProtectedRoute 
                  element={<CategoryPage />} 
                  allowedRoles={["USER"]} 
                />
              } 
            />
            <Route 
              path="/category/:id/:name" 
              element={
                <ProtectedRoute 
                  element={<ProductList />} 
                  allowedRoles={["USER"]} 
                />
              } 
            />
            <Route 
              path="/product/:productId" 
              element={
                <ProtectedRoute 
                  element={<ProductPage />} 
                  allowedRoles={["USER"]} 
                />
              } 
            />
            <Route 
              path="/panier" 
              element={
                <ProtectedRoute 
                  element={<Panier />} 
                  allowedRoles={["USER"]} 
                />
              } 
            />
          </Routes>
        </main>
        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;
