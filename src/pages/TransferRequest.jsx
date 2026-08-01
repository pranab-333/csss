import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/ui/Button";
import { getLandRecordById } from "../services/landService";
import { submitTransferRequest } from "../services/transferService";
import { sampleRecords } from "../data/sampleRecords";

export default function TransferRequest() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [record, setRecord] = useState(null);
  const [form, setForm] = useState({
    newOwnerName: "",
    transferDate: "",
    reason: "",
  });
  const [documents, setDocuments] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    getLandRecordById(id)
      .then((data) => setRecord(data?.record ?? data))
      .catch(() => {
        setRecord(sampleRecords.find((r) => r.id === id) ?? null);
      });
  }, [id]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      // Backend: POST /api/transfer-request
      // multipart/form-data: { parcelId, newOwnerName, transferDate, reason, documents }
      await submitTransferRequest({
        parcelId: record?.parcelId ?? id,
        newOwnerName: form.newOwnerName,
        transferDate: form.transferDate,
        reason: form.reason,
        documents,
      });
      setSuccess(true);
    } catch (err) {
      setError(err.message || "Could not submit the transfer request.");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="page--narrow">
        <div className="card">
          <h3 className="card__title">
            <i className="fas fa-circle-check" style={{ color: "var(--color-success)" }}></i>
            Transfer Request Submitted
          </h3>
          <p>
            Your request for parcel #{record?.parcelId ?? id} has been received
            and is pending review.
          </p>
          <Button
            variant="primary"
            fullWidth
            style={{ marginTop: "var(--space-lg)" }}
            onClick={() => navigate(`/land/${id}`)}
          >
            Back to Parcel Details
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "var(--space-xl)", maxWidth: 640, margin: "0 auto" }}>
      <div className="section-heading">
        <div>
          <h2>Request Ownership Transfer</h2>
          <p>
            Parcel #{record?.parcelId ?? id}
            {record?.owner ? ` — currently owned by ${record.owner}` : ""}
          </p>
        </div>
      </div>

      <div className="card">
        {error && <div className="form-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="newOwnerName">
                New Owner Name <span style={{ color: "var(--color-danger)" }}>*</span>
              </label>
              <input
                id="newOwnerName"
                name="newOwnerName"
                type="text"
                placeholder="Enter full name"
                value={form.newOwnerName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="transferDate">
                Transfer Date <span style={{ color: "var(--color-danger)" }}>*</span>
              </label>
              <input
                id="transferDate"
                name="transferDate"
                type="date"
                value={form.transferDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="reason">Reason for Transfer</label>
            <textarea
              id="reason"
              name="reason"
              rows="3"
              placeholder="Optional remarks…"
              value={form.reason}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="documents">Supporting Documents</label>
            <input
              id="documents"
              type="file"
              onChange={(e) => setDocuments(e.target.files?.[0] ?? null)}
            />
          </div>

          <Button type="submit" variant="primary" fullWidth disabled={submitting}>
            {submitting ? "Submitting…" : (
              <>
                <i className="fas fa-paper-plane"></i> Submit Transfer Request
              </>
            )}
          </Button>
        </form>

        <div className="backend-hook" style={{ marginTop: "var(--space-md)" }}>
          <i className="fas fa-plug"></i> Backend: POST /api/transfer-request
        </div>
      </div>
    </div>
  );
}
