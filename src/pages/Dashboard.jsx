import { useEffect, useState } from "react";
import LandCard from "../components/land/LandCard";
import StateBlock from "../components/ui/StateBlock";
import { useAuth } from "../context/AuthContext";
import { getMyLandRecords } from "../services/landService";
import { sampleRecords } from "../data/sampleRecords";

export default function Dashboard() {
  const { user } = useAuth();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Backend: GET /api/land-records/mine (requires auth token)
    getMyLandRecords()
      .then((data) => setRecords(data?.records ?? []))
      .catch(() => setRecords(sampleRecords.slice(0, 2))) // demo fallback
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: "var(--space-xl)", maxWidth: "var(--content-max-width)", margin: "0 auto" }}>
      <div className="section-heading">
        <div>
          <h2>Welcome{user?.fullName ? `, ${user.fullName}` : ""}</h2>
          <p>Land records registered under your citizenship number.</p>
        </div>
      </div>

      <div className="backend-hook" style={{ marginBottom: "var(--space-lg)" }}>
        <i className="fas fa-plug"></i> Backend: GET /api/land-records/mine
      </div>

      {loading && <StateBlock icon="fa-spinner fa-spin" title="Loading your records…" />}

      {!loading && records.length === 0 && (
        <StateBlock
          icon="fa-folder-open"
          title="No land records yet"
          description="Records registered under your name will appear here."
        />
      )}

      {!loading && records.length > 0 && (
        <div className="stack">
          {records.map((record) => (
            <LandCard key={record.id} record={record} />
          ))}
        </div>
      )}
    </div>
  );
}
