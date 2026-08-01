/**
 * Placeholder map panel.
 *
 * To wire up a real map, install a library such as:
 *   npm install leaflet react-leaflet
 * or
 *   npm install mapbox-gl react-map-gl
 *
 * ...then replace the `.map-panel__placeholder` block below with the
 * actual map component, using parcel geo-coordinates from your
 * backend (e.g. record.geoJson or record.coordinates).
 */
export default function MapPanel({ selectedParcelId, size }) {
  return (
    <div className="card" style={{ padding: 0, overflow: "hidden" }}>
      <div className={`map-panel ${size === "sm" ? "map-panel--sm" : ""}`}>
        <div className="map-panel__placeholder">
          <i className="fas fa-map"></i>
          Interactive Map
          <span style={{ fontSize: "var(--fs-xs)", color: "var(--color-text-muted)" }}>
            Leaflet / Mapbox integration point
          </span>
        </div>

        <div className="map-legend">
          <span className="map-legend__item">
            <span className="map-legend__swatch map-legend__swatch--residential"></span> Res
          </span>
          <span className="map-legend__item">
            <span className="map-legend__swatch map-legend__swatch--agricultural"></span> Agri
          </span>
          <span className="map-legend__item">
            <span className="map-legend__swatch map-legend__swatch--commercial"></span> Comm
          </span>
          <span className="map-legend__item">
            <span className="map-legend__swatch map-legend__swatch--industrial"></span> Ind
          </span>
          <span className="map-legend__item">
            <span className="map-legend__swatch map-legend__swatch--government"></span> Gov
          </span>
        </div>

        {selectedParcelId && (
          <div className="map-selected-badge">
            <i className="fas fa-map-pin"></i> Parcel #{selectedParcelId} selected
          </div>
        )}
      </div>
    </div>
  );
}
