import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    citizenshipNo: "",
    email: "",
    password: "",
  });
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
      // Backend: POST /api/auth/register
      // { fullName, citizenshipNo, email, password }
      await register(form);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message || "Could not create your account.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page--narrow">
      <div className="auth-card">
        <div className="auth-card__icon">
          <i className="fas fa-user-plus"></i>
        </div>
        <h2>Create a citizen account</h2>
        <p style={{ marginBottom: "var(--space-xl)" }}>
          Register to search your land records and submit transfer requests
          online.
        </p>

        {error && <div className="form-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Enter full name"
              value={form.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="citizenshipNo">Citizenship Number</label>
            <input
              id="citizenshipNo"
              name="citizenshipNo"
              type="text"
              placeholder="e.g. 12-345-6789"
              value={form.citizenshipNo}
              onChange={handleChange}
              required
            />
          </div>
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
              placeholder="Create a password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <Button type="submit" variant="primary" fullWidth disabled={loading}>
            {loading ? "Creating account…" : "Create Account"}
          </Button>
        </form>

        <div className="backend-hook" style={{ marginTop: "var(--space-md)" }}>
          <i className="fas fa-plug"></i> Backend: POST /api/auth/register
        </div>

        <p className="auth-card__footer">
          Already registered? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
