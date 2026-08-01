import { useState } from "react";
import Button from "../components/ui/Button";
import { verifyByDocumentId, verifyByFile } from "../services/verifyService";

export default function Verify() {
  const [documentId, setDocumentId] = useState("");
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);
    try {
      // Backend: POST /api/verify  { documentId }  OR multipart file
      const data = file
        ? await verifyByFile(file)
        : await verifyByDocumentId(documentId);
      setResult(data);
    } catch (err) {
      setError(err.message || "Could not verify this document.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: "var(--space-xl)", maxWidth: 640, margin: "0 auto" }}>
      <div className="section-heading">
        <div>
          <h2>Verify a Land Document</h2>
          <p>Confirm a certificate or deed is authentic and matches our records.</p>
        </div>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="documentId">Document / Certificate ID</label>
            <input
              id="documentId"
              type="text"
              placeholder="e.g. DOC-2026-004521"
              value={documentId}
              onChange={(e) => setDocumentId(e.target.value)}
            />
          </div>

          <div className="row" style={{ margin: "var(--space-md) 0", color: "var(--color-text-muted)", fontSize: "var(--fs-sm)" }}>
            — or —
          </div>

          <div className="form-group">
            <label htmlFor="documentFile">Upload Document</label>
            <input
              id="documentFile"
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            disabled={loading || (!documentId && !file)}
          >
            {loading ? "Verifying…" : "Verify Document"}
          </Button>
        </form>

        <div className="backend-hook" style={{ marginTop: "var(--space-md)" }}>
          <i className="fas fa-plug"></i> Backend: POST /api/verify
        </div>
      </div>

      {error && (
        <div className="form-error" style={{ marginTop: "var(--space-lg)" }}>
          {error}
        </div>
      )}

      {result && (
        <div className="card" style={{ marginTop: "var(--space-lg)" }}>
          <h3 className="card__title">
            <i
              className={`fas ${result.valid ? "fa-circle-check" : "fa-circle-xmark"}`}
              style={{ color: result.valid ? "var(--color-success)" : "var(--color-danger)" }}
            ></i>
            {result.valid ? "Document Verified" : "Document Not Recognized"}
          </h3>
          {result.record && (
            <table className="kv-table">
              <tbody>
                <tr>
                  <td><i className="fas fa-hashtag"></i> Parcel ID</td>
                  <td>{result.record.parcelId}</td>
                </tr>
                <tr>
                  <td><i className="fas fa-user"></i> Owner</td>
                  <td>{result.record.owner}</td>
                </tr>
                <tr>
                  <td><i className="fas fa-calendar"></i> Verified At</td>
                  <td>{result.verifiedAt}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
