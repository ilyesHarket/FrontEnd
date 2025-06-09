import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";

const Navbar = () => (
  <nav className="navbar">
    <div className="navbar-left">
      <Link to="/" className="logo">
        MyShop
      </Link>
    </div>
    <div className="navbar-center">
      <input
        className="search-bar"
        type="text"
        placeholder="Rechercher un produit..."
      />
    </div>
    <div className="navbar-right">
      <Link to="/">Accueil</Link>
      <Link to="/categories">Catégories</Link>
      <Link to="/about">À propos</Link>
      <Link to="/contact">Contact</Link>
      <Link to="/cart" className="icon-link" title="Panier">
        <FaShoppingCart />
      </Link>
      <Link to="/login" className="icon-link" title="Compte">
        <FaUser />
      </Link>
    </div>
  </nav>
);

export default Navbar;
