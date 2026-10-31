# Defence SupplyChain Nexus

Defence SupplyChain Nexus is a hackathon demonstration platform that connects defence manufacturers with MSME and startup suppliers through a unified digital supplier ecosystem. It supports supplier discovery, digital qualification workflows, component traceability, and supply-chain visibility using fictional demo data only.

## Problem Statement

Defence-sector organizations often face fragmented supplier discovery, manual qualification paperwork, limited component traceability, and poor supply-chain visibility. This prototype demonstrates how a single digital platform can streamline supplier onboarding, approval tracking, component lifecycle visibility, and order/delivery coordination for MSMEs and startups without claiming official government authorization.

## Target Users

- **MSMEs and startups**: register, submit qualification applications, and track approval status.
- **Defence buyers / procurement teams**: discover suppliers, review applications, approve/reject/request documents, and monitor orders.
- **Reviewers / judges**: explore the end-to-end demo flows and inspect the architecture.

## Implemented Features

- Landing page with platform overview, benefits, workflow, traceability, and demo metrics.
- Dashboard with supplier counts, status breakdown, category distribution, qualification trends (illustrative), recent activity, and alerts.
- Supplier discovery with search and filters (category, location, status, capability, certification).
- Supplier profiles with capabilities, certifications, components, and purchase orders.
- Multi-step supplier qualification form with validation and submission.
- Admin panel for application review, demo document checklist, approve/reject/request-documents, activity logs, and analytics.
- Component traceability search with lifecycle timeline and QR-style placeholder.
- Supply-chain network visualization, purchase order status, delayed shipments, inventory visibility, and risk alerts.
- LocalStorage-based demo persistence and Reset Demo Data action.

## Technology Stack

- React 18 + Vite
- JavaScript
- Tailwind CSS
- Lucide React icons
- Recharts
- React Router
- LocalStorage (demo persistence)

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

Open `http://localhost:5173/`.

## Build

```bash
npm run build
```

## Tests

```bash
npx playwright test
```

Chromium-only scope (see `TESTING.md`).

## Architecture Overview

- `src/App.jsx`: global state (suppliers, components, orders, activities, applications) via React Context; persistence to LocalStorage; reset action.
- `src/components/`: reusable layout (sidebar, responsive mobile drawer).
- `src/pages/`: route-level pages for each module.
- `src/data/`: seed demo data (14 suppliers, 8 components, 10 purchase orders).
- `src/utils/`: storage helpers and formatters/status colors.
- Routing via React Router; charts via Recharts.

## LocalStorage Persistence and Reset

- State is saved to `localStorage` under `dsnx_state_v1` on every change.
- On load, saved state is used; otherwise seed data is loaded.
- "Reset Demo Data" (Admin) restores seed data after a confirmation dialog.

## Demo-Data Disclaimer

All suppliers, components, orders, metrics, and activities are synthetic demonstration data. The platform does not provide official government or defence authorization, real verification, cryptographic integrity, blockchain, secure authentication, or backend verification. The QR-style element is a placeholder, not a scannable code.

## Known Limitations

- Frontend-only prototype; no backend or real authentication.
- Trend chart values are illustrative.
- Traceability QR element is a placeholder.
- No real document uploads or external integrations.
- LocalStorage persistence is browser-local and can be cleared by the user.

## Future Scope

- Backend API and database persistence.
- Real supplier onboarding workflows and document verification integrations.
- Advanced analytics and risk scoring.
- Real QR generation/scanning integration.
- Role-based access control and audit trails.
- Multi-organization supply-chain collaboration.
