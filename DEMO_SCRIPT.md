# Demo Script (3 Minutes)

## 0:00-0:30 - Landing and Dashboard
- Route: `/`
- Show headline "Building a Trusted, Traceable and Integrated Defence Supply Chain."
- Click "Get Started" to `/dashboard`.
- Point out supplier counts, status breakdown, and charts (demo data).

## 0:30-1:00 - Supplier Discovery
- Route: `/suppliers`
- Search "AeroForge" → `AeroForge Precision Pvt Ltd`.
- Apply filters (category, location, status, capability, certification).
- Open a supplier card → profile (e.g., AeroForge Precision Pvt Ltd).

## 1:00-1:30 - Qualification Submission
- Route: `/qualification`
- Attempt "Next" with empty fields → validation errors.
- Submit a new application using a unique company name (e.g., `DemoCo <timestamp>`).
- Complete all 6 steps and submit → "Application Submitted".

## 1:30-2:00 - Admin Approval
- Route: `/admin`
- Find the newly submitted supplier (status Submitted).
- Approve it.
- Route: `/suppliers`, search the unique company name → status shows Qualified.
- Refresh page → status persists.

## 2:00-2:20 - Traceability
- Route: `/traceability`
- Search `COMP-AF-1042` → "Aircraft Bracket Assembly" and lifecycle timeline.
- Search an invalid ID → "Component not found".
- Note: the QR-style element is a placeholder, not a scannable code.
- The newly submitted supplier is separate from this seeded component.

## 2:20-2:40 - Supply Chain
- Route: `/supply-chain`
- Show network visualization, purchase order table, delayed shipment, inventory, risk alerts.

## 2:40-3:00 - Reset and Closing
- Route: `/admin`
- Make a demo edit (e.g., reject a supplier), cancel reset → edit remains.
- Accept reset → seed data restored; refresh confirms.
- Closing: This is a frontend hackathon prototype using fictional demo data and LocalStorage persistence only. No official verification, backend, or secure authentication is implemented.
