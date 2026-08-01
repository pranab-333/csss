// ------------------------------------------------------------
// Sample data used ONLY as a placeholder so pages render nicely
// before the backend is wired up. Once GET /api/land-records is
// live, the pages that import this will use the real API
// response instead — see src/services/landService.js.
// ------------------------------------------------------------
export const sampleRecords = [
  {
    id: "KTM-0452",
    parcelId: "KTM-0452",
    category: "residential",
    status: "Registered",
    owner: "Shreeya Adhikari",
    area: "1,250 m²",
    location: "Lalitpur-12",
    value: "Rs 45,00,000",
  },
  {
    id: "KTM-0781",
    parcelId: "KTM-0781",
    category: "agricultural",
    status: "Pending Transfer",
    owner: "Kiran Gurung",
    area: "3,400 m²",
    location: "Bhaktapur-5",
    value: "Rs 32,00,000",
  },
  {
    id: "KTM-1123",
    parcelId: "KTM-1123",
    category: "commercial",
    status: "Registered",
    owner: "Ram Sharma",
    area: "850 m²",
    location: "Kathmandu-28",
    value: "Rs 78,00,000",
  },
];

export const sampleStats = [
  { label: "Lands Registered", value: "14,832" },
  { label: "Districts Covered", value: "77" },
  { label: "Transfers Completed", value: "3,241" },
  { label: "System Uptime", value: "99.98%" },
];
