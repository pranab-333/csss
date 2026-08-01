import apiClient from "./apiClient";
import { ENDPOINTS } from "../config/api.config";

// ------------------------------------------------------------
// Document verification service.
// Expected backend contract:
//   POST /verify  { documentId }  OR  multipart file upload
//   -> { valid: boolean, record: {...}, verifiedAt }
// ------------------------------------------------------------

export async function verifyByDocumentId(documentId) {
  const { data } = await apiClient.post(ENDPOINTS.VERIFY_DOCUMENT, {
    documentId,
  });
  return data;
}

export async function verifyByFile(file) {
  const formData = new FormData();
  formData.append("document", file);
  const { data } = await apiClient.post(ENDPOINTS.VERIFY_DOCUMENT, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}
