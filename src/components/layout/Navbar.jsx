import { NavLink, useNavigate } from "react-router-dom";
import ThemeToggle from "../ui/ThemeToggle";
import Button from "../ui/Button";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar__brand" style={{ textDecoration: "none" }}>
        <i className="fas fa-landmark navbar__mark"></i>
        <span>DMalpot</span>
        <span className="navbar__badge">Digital Land Registration</span>
      </NavLink>

      <div className="navbar__links">
        <NavLink
          to="/search"
          className={({ isActive }) =>
            "navbar__link" + (isActive ? " active" : "")
          }
        >
          Search
        </NavLink>
        <NavLink
          to="/verify"
          className={({ isActive }) =>
            "navbar__link" + (isActive ? " active" : "")
          }
        >
          Verify
        </NavLink>
        {isAuthenticated && (
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              "navbar__link" + (isActive ? " active" : "")
            }
          >
            Dashboard
          </NavLink>
        )}
      </div>

      <div className="navbar__actions">
        <ThemeToggle />
        {isAuthenticated ? (
          <>
            <span className="navbar__user">
              <i className="fas fa-user-circle"></i> {user?.fullName || "Account"}
            </span>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              Sign Out
            </Button>
          </>
        ) : (
          <Button variant="primary" size="sm" onClick={() => navigate("/login")}>
            Sign In <i className="fas fa-arrow-right"></i>
          </Button>
        )}
      </div>
    </nav>
  );
}
