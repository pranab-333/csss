import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Button from "../components/ui/Button";
import LandCard from "../components/land/LandCard";
import StateBlock from "../components/ui/StateBlock";
import { searchLandRecords } from "../services/landService";
import { sampleRecords } from "../data/sampleRecords";

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (initialQuery) {
      runSearch(initialQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function runSearch(term) {
    setLoading(true);
    setHasSearched(true);
    try {
      // Backend: GET /api/land-records/search?q=<term>
      const data = await searchLandRecords(term);
      setResults(data?.records ?? []);
    } catch {
      // Backend not reachable yet — fall back to filtering sample data
      // so the page is still usable during frontend development.
      const lower = term.toLowerCase();
      setResults(
        sampleRecords.filter(
          (r) =>
            r.parcelId.toLowerCase().includes(lower) ||
            r.location.toLowerCase().includes(lower) ||
            r.owner.toLowerCase().includes(lower)
        )
      );
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSearchParams(query ? { q: query } : {});
    runSearch(query);
  }

  return (
    <div style={{ padding: "var(--space-xl)", maxWidth: "var(--content-max-width)", margin: "0 auto" }}>
      <div className="section-heading">
        <div>
          <h2>Search Land Records</h2>
          <p>Look up parcels by district, ward, kitta number, or citizenship number.</p>
        </div>
      </div>

      <form className="search-bar" onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="District, ward number, kitta, or citizenship no."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button type="submit" variant="primary">
          <i className="fas fa-search"></i> Search
        </Button>
      </form>

      <div className="backend-hook" style={{ marginBottom: "var(--space-lg)" }}>
        <i className="fas fa-plug"></i> Backend: GET /api/land-records/search?q={"{query}"}
      </div>

      {loading && <StateBlock icon="fa-spinner fa-spin" title="Searching…" />}

      {!loading && hasSearched && results.length === 0 && (
        <StateBlock
          icon="fa-file-circle-question"
          title="No records found"
          description="Try a different district, ward number, or citizenship number."
        />
      )}

      {!loading && results.length > 0 && (
        <div className="stack">
          {results.map((record) => (
            <LandCard key={record.id} record={record} />
          ))}
        </div>
      )}

      {!hasSearched && !loading && (
        <StateBlock
          icon="fa-magnifying-glass"
          title="Start a search"
          description="Enter a district, ward number, kitta number, or citizenship number above."
        />
      )}
    </div>
  );
}
