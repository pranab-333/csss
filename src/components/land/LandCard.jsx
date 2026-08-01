import { useNavigate } from "react-router-dom";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

const CATEGORY_VARIANT = {
  residential: "residential",
  agricultural: "agricultural",
  commercial: "commercial",
  industrial: "industrial",
  government: "government",
};

const STATUS_VARIANT = {
  registered: "success",
  "pending transfer": "warning",
  cancelled: "danger",
};

export default function LandCard({ record }) {
  const navigate = useNavigate();
  const {
    id,
    parcelId,
    category,
    status,
    owner,
    area,
    location,
    value,
  } = record;

  function handlePrint() {
    window.print();
  }

  return (
    <div className="card">
      <div className="row row--between">
        <div className="row">
          <span style={{ fontWeight: 600 }}>Parcel #{parcelId}</span>
          <Badge variant={CATEGORY_VARIANT[category] || "neutral"}>
            {category}
          </Badge>
        </div>
        <Badge
          variant={STATUS_VARIANT[status?.toLowerCase()] || "neutral"}
          icon={status?.toLowerCase() === "registered" ? "fa-check-circle" : "fa-clock"}
        >
          {status}
        </Badge>
      </div>

      <table className="kv-table" style={{ marginTop: "var(--space-sm)" }}>
        <tbody>
          <tr>
            <td><i className="fas fa-user"></i> Owner</td>
            <td>{owner}</td>
          </tr>
          <tr>
            <td><i className="fas fa-ruler-combined"></i> Area</td>
            <td>{area}</td>
          </tr>
          <tr>
            <td><i className="fas fa-map-marker-alt"></i> Location</td>
            <td>{location}</td>
          </tr>
          <tr>
            <td><i className="fas fa-money-bill-wave"></i> Value</td>
            <td>{value}</td>
          </tr>
        </tbody>
      </table>

      <div className="row row--wrap" style={{ marginTop: "var(--space-md)" }}>
        <Button variant="primary" size="sm" onClick={() => navigate(`/land/${id}`)}>
          <i className="fas fa-eye"></i> View Details
        </Button>
        <Button size="sm" onClick={() => navigate(`/transfer/${id}`)}>
          <i className="fas fa-exchange-alt"></i> Transfer
        </Button>
        <Button variant="ghost" size="sm" onClick={handlePrint} aria-label="Print record">
          <i className="fas fa-print"></i>
        </Button>
      </div>
    </div>
  );
}
