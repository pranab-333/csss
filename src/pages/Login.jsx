import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // Backend: POST /api/auth/login  { email, password }
      await login(form);
      const redirectTo = location.state?.from?.pathname || "/dashboard";
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page--narrow">
      <div className="auth-card">
        <div className="auth-card__icon">
          <i className="fas fa-lock"></i>
        </div>
        <h2>Sign in to your account</h2>
        <p style={{ marginBottom: "var(--space-xl)" }}>
          Access your land records, transfer requests, and verification
          history.
        </p>

        {error && <div className="form-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <Button type="submit" variant="primary" fullWidth disabled={loading}>
            {loading ? "Signing in…" : "Sign In"}
          </Button>
        </form>

        <div className="backend-hook" style={{ marginTop: "var(--space-md)" }}>
          <i className="fas fa-plug"></i> Backend: POST /api/auth/login
        </div>

        <p className="auth-card__footer">
          Don&apos;t have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}
