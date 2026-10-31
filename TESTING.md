# Testing

## Existing Tests
- Playwright end-to-end tests in `tests/e2e.spec.js` (17 tests):
  - A. Supplier discovery: search, each filter, no-results, profile navigation.
  - B. Qualification and admin approval: empty-field validation, submit, approve, persist, no duplicate.
  - C. Traceability: valid ID, invalid ID, clear input.
  - D. Reset: cancel keeps edit, accept restores seed data and persists.
  - E. Navigation and responsiveness: all main routes, mobile drawer.

## How to Run
```bash
npx playwright test
```

## Reported Scope
- Chromium only (single project in `playwright.config.js`).
- No cross-browser coverage claimed.
- No security, accessibility certification, or performance benchmarking claimed.

## Manual Checks Remaining
- Visual review on tablet and narrow phone widths.
- Combined filter result verification.
- Keyboard-only and screen-reader navigation.
- Slow-network bundle loading behavior.
- Console/network error review on additional interactions.
