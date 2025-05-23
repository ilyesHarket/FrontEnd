import Navbar from "./components/Navbar";
import "./App.css";
import ProductPage from "./components/ProductPage";
import { Route, Routes } from "react-router-dom";
import CategoryPage from "./components/CategoryPage";
import ProductList from "./components/productList";

function App() {
  return (
    <>
      <div>
        <Navbar />
        <Routes>
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/" element={<CategoryPage />} />
          <Route path="/category/:category" element={<ProductList />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
