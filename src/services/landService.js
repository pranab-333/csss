import apiClient from "./apiClient";
import { ENDPOINTS } from "../config/api.config";

// ------------------------------------------------------------
// Land record service.
// Expected backend contract (adjust field names to match your
// MongoDB schema, e.g. models/LandRecord.js):
//   GET /land-records?page=&limit=      -> { records: [...], total }
//   GET /land-records/search?q=         -> { records: [...] }
//   GET /land-records/:id               -> { record }
//   GET /land-records/mine              -> { records: [...] }
// ------------------------------------------------------------

export async function getLandRecords({ page = 1, limit = 10 } = {}) {
  const { data } = await apiClient.get(ENDPOINTS.LAND_RECORDS, {
    params: { page, limit },
  });
  return data;
}

export async function searchLandRecords(query) {
  const { data } = await apiClient.get(ENDPOINTS.LAND_SEARCH, {
    params: { q: query },
  });
  return data;
}

export async function getLandRecordById(id) {
  const { data } = await apiClient.get(ENDPOINTS.LAND_RECORD_BY_ID(id));
  return data;
}

export async function getMyLandRecords() {
  const { data } = await apiClient.get(ENDPOINTS.MY_RECORDS);
  return data;
}
