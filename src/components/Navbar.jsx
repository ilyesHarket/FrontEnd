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
      <Link to="/categories">Catégories</Link>
    </div>
    <div className="navbar-right">
      <Link to="/panier" className="nav-link">
        <FaShoppingCart /> Panier
      </Link>
      <Link to="/login" className="nav-link">
        <FaUser /> Connexion
      </Link>
    </div>
  </nav>
);

export default Navbar;
