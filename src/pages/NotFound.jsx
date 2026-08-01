import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

export default function NotFound() {
  return (
    <div className="state-block" style={{ padding: "var(--space-3xl)" }}>
      <i className="fas fa-map-signs"></i>
      <h2>Page not found</h2>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/">
        <Button variant="primary" style={{ marginTop: "var(--space-lg)" }}>
          Back to Home
        </Button>
      </Link>
    </div>
  );
}
