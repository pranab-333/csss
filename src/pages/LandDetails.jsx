import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import MapPanel from "../components/land/MapPanel";
import StateBlock from "../components/ui/StateBlock";
import { getLandRecordById } from "../services/landService";
import { sampleRecords } from "../data/sampleRecords";

export default function LandDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);

    // Backend: GET /api/land-records/:id
    getLandRecordById(id)
      .then((data) => setRecord(data?.record ?? data))
      .catch(() => {
        const fallback = sampleRecords.find((r) => r.id === id);
        if (fallback) {
          setRecord(fallback);
        } else {
          setNotFound(true);
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  function handlePrint() {
    window.print();
  }

  if (loading) {
    return <StateBlock icon="fa-spinner fa-spin" title="Loading parcel details…" />;
  }

  if (notFound || !record) {
    return (
      <StateBlock
        icon="fa-triangle-exclamation"
        title="Parcel not found"
        description="This parcel ID doesn't match any record."
      />
    );
  }

  return (
    <div style={{ padding: "var(--space-xl)", maxWidth: "var(--content-max-width)", margin: "0 auto" }}>
      <div className="section-heading">
        <div>
          <h2>Parcel #{record.parcelId}</h2>
          <p>Full record details as held in the registry.</p>
        </div>
        <Badge variant={record.status?.toLowerCase() === "registered" ? "success" : "warning"}>
          {record.status}
        </Badge>
      </div>

      <div className="grid-2col">
        <div className="stack">
          <div className="card">
            <h3 className="card__title">
              <i className="fas fa-file-alt" style={{ color: "var(--color-accent)" }}></i>
              Record Information
            </h3>
            <table className="kv-table">
              <tbody>
                <tr>
                  <td><i className="fas fa-hashtag"></i> Parcel ID</td>
                  <td><strong>{record.parcelId}</strong></td>
                </tr>
                <tr>
                  <td><i className="fas fa-tag"></i> Category</td>
                  <td>{record.category}</td>
                </tr>
                <tr>
                  <td><i className="fas fa-user"></i> Owner</td>
                  <td>{record.owner}</td>
                </tr>
                <tr>
                  <td><i className="fas fa-ruler-combined"></i> Area</td>
                  <td>{record.area}</td>
                </tr>
                <tr>
                  <td><i className="fas fa-map-marker-alt"></i> Location</td>
                  <td>{record.location}</td>
                </tr>
                <tr>
                  <td><i className="fas fa-money-bill-wave"></i> Value</td>
                  <td>{record.value}</td>
                </tr>
              </tbody>
            </table>

            <div className="row row--wrap" style={{ marginTop: "var(--space-lg)" }}>
              <Button variant="primary" onClick={() => navigate(`/transfer/${record.id}`)}>
                <i className="fas fa-exchange-alt"></i> Request Transfer
              </Button>
              <Button variant="ghost" onClick={handlePrint}>
                <i className="fas fa-print"></i> Print Record
              </Button>
            </div>
          </div>

          <div className="backend-hook">
            <i className="fas fa-plug"></i> Backend: GET /api/land-records/{"{id}"}
          </div>
        </div>

        <div className="stack">
          <MapPanel selectedParcelId={record.parcelId} />
        </div>
      </div>
    </div>
  );
}
