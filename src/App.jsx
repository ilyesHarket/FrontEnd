import Navbar from "./components/Navbar";
import "./App.css";
import ProductPage from "./components/ProductPage";
import { Route, Routes } from "react-router-dom";
import CategoryPage from "./components/CategoryPage";
import ProductList from "./components/productList";
import Login from "./Login";
import Register from "./Register";

function App() {
  return (
    <>
      <div>
        <Navbar />
        <Routes>
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/" element={<CategoryPage />} />
          <Route path="/category/:id/:name" element={<ProductList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
