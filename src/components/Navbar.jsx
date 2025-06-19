import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to={isAuthenticated && user?.role === "USER" ? "/categories" : "/"} className="logo">
          MyShop
        </Link>
      </div>
      <div className="navbar-center">
        {/* Optionally, add navigation for USER here */}
      </div>
      <div className="navbar-right">
        {!isAuthenticated && (
          <></>
        )}
        {isAuthenticated && (
          <>
            <span className="nav-username">{user.username}</span>
            <button className="nav-logout" onClick={logout} style={{ marginLeft: "1rem" }}>
              Déconnexion
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
