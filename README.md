# DMalpot — Decentralized Land Registration System (Frontend)

React + Vite frontend for a decentralized land registration system, built to
run against a Node.js/Express backend with MongoDB.

## Features

- Government-style, minimalist UI with a dark navy + crimson theme (and a
  light mode toggle).
- Red primary buttons that turn a slightly darker red on hover.
- Fully modular folder structure (components / pages / services / context).
- One page per action on the home page: search, verify, sign in, register,
  view parcel details, request a transfer, and a citizen dashboard.
- A single, clearly commented place to plug in your backend URL.

## Project structure

```
src/
  components/
    layout/        Navbar, Footer, page Layout wrapper
    ui/             Button, Badge, ThemeToggle, StatGrid, StateBlock
    land/           LandCard, MapPanel (placeholder for Leaflet/Mapbox)
  pages/            One file per route/page
  context/          ThemeContext (dark/light), AuthContext (login state)
  services/         One file per backend resource (auth, land, transfer, verify)
  config/
    api.config.js   <-- BACKEND URL GOES HERE
  routes/
    ProtectedRoute.jsx  Redirects to /login when not authenticated
  data/
    sampleRecords.js    Placeholder data shown until the backend responds
  styles/
    theme.css       Design tokens (colors, spacing, type) for dark + light
    global.css      Reset and base element styles
    components.css  Navbar, hero, buttons, cards, forms, badges, map, etc.
```

## Pages / routes

| Route             | Purpose                                              | Auth required |
|--------------------|-------------------------------------------------------|:---:|
| `/`                | Home — hero search, stats, land list, map, quick transfer | no |
| `/login`           | Sign in                                                | no |
| `/register`        | Create a citizen account                               | no |
| `/search`          | Search land records                                    | no |
| `/verify`          | Verify a document/certificate                          | no |
| `/land/:id`        | Full parcel details ("View Details" button)             | no |
| `/transfer/:id`    | Submit an ownership transfer request                    | yes |
| `/dashboard`       | "My records" for the signed-in citizen                  | yes |

## Connecting your backend

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Set `VITE_API_BASE_URL` to your Express server, e.g.:
   ```
   VITE_API_BASE_URL=http://localhost:5000/api
   ```
3. That's it — every request goes through `src/services/apiClient.js`,
   which reads the URL from `src/config/api.config.js`. You do not need to
   edit any component to change the backend URL.

### Expected backend routes (Express + MongoDB)

These are the routes each service file calls. Adjust paths in
`src/config/api.config.js` if your Express routes differ.

```
POST   /api/auth/login             { email, password }        -> { token, user }
POST   /api/auth/register          { fullName, citizenshipNo,
                                      email, password }        -> { token, user }
GET    /api/auth/me                (auth header)               -> { user }

GET    /api/land-records           ?page=&limit=               -> { records, total }
GET    /api/land-records/search    ?q=                         -> { records }
GET    /api/land-records/:id                                    -> { record }
GET    /api/land-records/mine      (auth header)                -> { records }

POST   /api/verify                 { documentId } or file       -> { valid, record, verifiedAt }

POST   /api/transfer-request       multipart: parcelId,
                                    newOwnerName, transferDate,
                                    reason, documents            -> { requestId, status }
GET    /api/transfer-request/:id                                 -> { status, history }
```

Each land record is expected to look roughly like:

```json
{
  "id": "KTM-0452",
  "parcelId": "KTM-0452",
  "category": "residential",
  "status": "Registered",
  "owner": "Shreeya Adhikari",
  "area": "1,250 m²",
  "location": "Lalitpur-12",
  "value": "Rs 45,00,000"
}
```

Until the backend is reachable, pages fall back to the sample data in
`src/data/sampleRecords.js` so the UI can be developed and demoed on its
own.

## Local development

```bash
npm install
npm run dev
```

The dev server is pinned to **http://localhost:5173** (see
`vite.config.js`).

## Build

```bash
npm run build
npm run preview
```

## Notes on MongoDB

This is a frontend-only project — MongoDB is used on the backend, not here.
Make sure your Express backend connects to MongoDB (e.g. via Mongoose) and
exposes the routes above; the frontend just needs the base URL.

## Dark / light mode

Toggle is in the navbar (sun/moon icon). The preference is saved to
`localStorage` and respects the visitor's OS preference on first visit.
All colors are defined as CSS variables in `src/styles/theme.css` — add or
adjust variables there rather than hardcoding colors in components.
