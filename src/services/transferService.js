import apiClient from "./apiClient";
import { ENDPOINTS } from "../config/api.config";

// ------------------------------------------------------------
// Ownership transfer service.
// Expected backend contract:
//   POST /transfer-request       -> { requestId, status }
//   GET  /transfer-request/:id   -> { status, history }
// `payload` supports a File under `documents` — sent as
// multipart/form-data so Express (e.g. multer) can handle uploads.
// ------------------------------------------------------------

export async function submitTransferRequest(payload) {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });

  const { data } = await apiClient.post(ENDPOINTS.TRANSFER_REQUEST, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

export async function getTransferStatus(id) {
  const { data } = await apiClient.get(ENDPOINTS.TRANSFER_STATUS(id));
  return data;
}
