import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import StatGrid from "../components/ui/StatGrid";
import LandCard from "../components/land/LandCard";
import MapPanel from "../components/land/MapPanel";
import { getLandRecords } from "../services/landService";
import { sampleRecords, sampleStats } from "../data/sampleRecords";

const SEARCH_EXAMPLES = [
  "Kathmandu Ward 4",
  "Bhaktapur",
  "Kitta 123",
  "12-345-6789",
];

export default function Home() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [records, setRecords] = useState(sampleRecords);
  const [stats] = useState(sampleStats);
  const [selected, setSelected] = useState(sampleRecords[0]);

  useEffect(() => {
    // Backend: GET /api/land-records?page=1&limit=10
    // Falls back to bundled sample data if the backend isn't running yet.
    getLandRecords({ page: 1, limit: 10 })
      .then((data) => {
        if (data?.records?.length) {
          setRecords(data.records);
          setSelected(data.records[0]);
        }
      })
      .catch(() => {
        /* keep sample data — backend not reachable yet */
      });
  }, []);

  function handleSearchSubmit(e) {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(query)}`);
  }

  return (
    <>
      {/* ====== HERO ====== */}
      <section className="hero">
        <svg
          className="hero__peaks"
          viewBox="0 0 1440 500"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            points="0,500 260,220 520,380 760,140 1020,340 1260,120 1440,300 1440,500"
            fill="rgba(255,255,255,0.02)"
          />
          <polygon
            points="0,500 180,320 420,430 700,240 940,410 1200,230 1440,380 1440,500"
            fill="rgba(255,255,255,0.035)"
          />
        </svg>
        <div className="hero__content">
          <div className="hero__badge">
            <i className="fas fa-shield-alt"></i>
            Decentralized · Secure · Government-Grade
          </div>
          <h1 className="hero__title">
            Land Records, <br />
            <span>Permanently Secured.</span>
          </h1>
          <p className="hero__description">
            The official digital land registry. Search parcels, verify
            documents, and track ownership — every change is recorded and
            auditable.
          </p>
          <form className="hero__search" onSubmit={handleSearchSubmit}>
            <input
              type="search"
              placeholder="District, ward number, kitta, or citizenship no."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button type="submit" variant="primary" size="lg">
              <i className="fas fa-search"></i> Search
            </Button>
          </form>
          <div className="hero__search-examples">
            {SEARCH_EXAMPLES.map((example) => (
              <span key={example} onClick={() => navigate(`/search?q=${encodeURIComponent(example)}`)}>
                {example}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ====== DASHBOARD STATS ====== */}
      <StatGrid stats={stats} />

      <div style={{ padding: "var(--space-xl)" }}>
        <div className="grid-2col">
          {/* ====== LEFT: LAND LIST ====== */}
          <div className="stack">
            {records.map((record) => (
              <div key={record.id} onClick={() => setSelected(record)}>
                <LandCard record={record} />
              </div>
            ))}

            <Button
              variant="ghost"
              fullWidth
              onClick={() => navigate("/search")}
            >
              <i className="fas fa-chevron-down"></i> Load More
            </Button>

            <div className="backend-hook">
              <i className="fas fa-plug"></i> Backend: GET /api/land-records?page=1&amp;limit=10
            </div>
          </div>

          {/* ====== RIGHT: MAP + SELECTED DETAILS ====== */}
          <div className="stack">
            <MapPanel selectedParcelId={selected?.parcelId} />

            {selected && (
              <div className="card">
                <h3 className="card__title">
                  <i className="fas fa-file-alt" style={{ color: "var(--color-accent)" }}></i>
                  Selected Land Details
                </h3>
                <table className="kv-table">
                  <tbody>
                    <tr>
                      <td><i className="fas fa-hashtag"></i> Parcel ID</td>
                      <td><strong>{selected.parcelId}</strong></td>
                    </tr>
                    <tr>
                      <td><i className="fas fa-tag"></i> Category</td>
                      <td>{selected.category}</td>
                    </tr>
                    <tr>
                      <td><i className="fas fa-user"></i> Owner</td>
                      <td>{selected.owner}</td>
                    </tr>
                    <tr>
                      <td><i className="fas fa-ruler-combined"></i> Area</td>
                      <td>{selected.area}</td>
                    </tr>
                    <tr>
                      <td><i className="fas fa-map-marker-alt"></i> Location</td>
                      <td>{selected.location}</td>
                    </tr>
                    <tr>
                      <td><i className="fas fa-money-bill-wave"></i> Value</td>
                      <td>{selected.value}</td>
                    </tr>
                    <tr>
                      <td><i className="fas fa-info-circle"></i> Status</td>
                      <td>{selected.status}</td>
                    </tr>
                  </tbody>
                </table>
                <Button
                  variant="primary"
                  fullWidth
                  style={{ marginTop: "var(--space-md)" }}
                  onClick={() => navigate(`/transfer/${selected.id}`)}
                >
                  <i className="fas fa-exchange-alt"></i> Request Transfer
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
