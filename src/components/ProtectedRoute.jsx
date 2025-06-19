import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function ProtectedRoute({ element, allowedRoles = ["USER", "ADMIN"] }) {
  // Use context for in-app state
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  // Check localStorage for auth state to survive refreshes
  let localAuth = null;
  try {
    localAuth = JSON.parse(localStorage.getItem("auth"));
  } catch {}
  const isAuth = isAuthenticated || !!(localAuth && localAuth.token);
  const localUser = user || (localAuth && localAuth.user);

  // Not authenticated -> redirect to login
  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role-based access
  if (!allowedRoles.includes(localUser?.role)) {
    // If admin trying to access user routes -> redirect to admin page
    if (localUser?.role === "ADMIN") {
      return <Navigate to="/forbidden" replace />;
    }
    // If user trying to access admin routes -> redirect to forbidden page
    return <Navigate to="/forbidden" replace />;
  }

  // Render the protected component
  return element;
} 