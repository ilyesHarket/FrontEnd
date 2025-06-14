import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CategoryPage from "./components/CategoryPage";
import ProductList from "./components/productList";
import ProductPage from "./components/ProductPage";
import Login from "./Login";
import Register from "./Register";
import Panier from "./components/Panier";
import AdminPanel from "./components/AdminPanel";
import "./App.css"; // CSS global (navbar, footer, produits, etc.)

function App() {
  return (
    <div className="app-root">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<CategoryPage />} />
          <Route path="/categories" element={<CategoryPage />} />
          <Route path="/category/:id/:name" element={<ProductList />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/panier" element={<Panier />} />
          <Route path="/admin" element={<AdminPanel />} />
          {/* Ajoute d'autres routes ici si besoin */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
