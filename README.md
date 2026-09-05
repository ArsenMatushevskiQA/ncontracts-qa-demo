# Ncontracts QA Playwright Demo

A lightweight Playwright QA automation demo using the public Ncontracts website for UI scenarios and a local mock API for API testing.

## Tech stack

- JavaScript
- Playwright
- Node.js 22+
- GitHub Actions
- No extra runtime dependencies

## Project structure

```text
ncontracts-qa-demo/
├── .github/workflows/playwright.yml   # CI workflow
├── mocks/
│   ├── api-config.js                  # local mock API config
│   └── api-server.js                  # local mock API server
├── pages/
│   ├── DemoPage.js                    # Page Objects
│   ├── HomePage.js
│   └── ResourcesPage.js
├── tests/
│   ├── api/
│   │   └── compliance-checks.spec.js
│   └── ui/
│       ├── demo.spec.js
│       ├── navigation.spec.js
│       └── resources.spec.js
├── AGENTS.md                          # repository conventions
├── package.json
├── package-lock.json
└── playwright.config.js
```

## Test scenarios

### UI tests

All UI tests run against `https://www.ncontracts.com/`.

- **Navigation** — open the home page, use the Solutions menu to reach Compliance Management, and verify the product page loaded.
- **Resource Hub search** — search the public Resource Hub for `TPRM` and verify results are filtered.
- **Demo form validation** — open the demo request form, submit it with empty required fields, and verify the First Name validation message appears. No fake lead data is submitted.

### API tests

The API tests run against a tiny **local mock API** that is started automatically by Playwright's `webServer`.

- **Create and retrieve a compliance check** — `POST /api/compliance-checks` creates a check with status `pending`; `GET /api/compliance-checks/:id` returns the same check with status `completed` and a deterministic `result: "compliant"`.
- **404 for unknown check** — a `GET` for a nonexistent id returns `404`.

## Important: the local mock API is not Ncontracts infrastructure

`mocks/api-server.js` is a **local demonstration mock only**. It is **not** a real Ncontracts API, service, database, message queue, or internal system. It exists only to let API tests demonstrate request/response validation without touching any external or private infrastructure.

## Getting started

### Install dependencies

```bash
npm ci
```

### Install Playwright Chromium

```bash
npx playwright install --with-deps chromium
```

### Run all tests

```bash
npx playwright test
# or
npm test
```

### Run UI tests only

```bash
npx playwright test tests/ui
```

### Run API tests only

```bash
npx playwright test tests/api
```

### Local mock API

Playwright's `webServer` configuration starts the local mock automatically when needed.

### HTML report

The Playwright HTML report is written to `playwright-report/` when the `html` reporter is enabled. In CI it is generated with the `list,html` reporter and uploaded as an artifact on failure. Locally:

```bash
npx playwright test --reporter=list,html
```

`playwright-report/` is gitignored.

## CI/CD

`.github/workflows/playwright.yml` runs on every push to `main` and every pull request targeting `main`. It:

- checks out the repo
- sets up Node 22
- runs `npm ci`
- installs Playwright Chromium with system dependencies
- runs `npx playwright test --reporter=list,html`
- uploads `playwright-report/` as an artifact on failure (7-day retention)

## Architecture notes

### Locator strategy

Tests prefer resilient, user-facing locators such as `getByRole`, `getByLabel`, and `getByText`. They avoid brittle CSS selectors and XPath. The demo form and Resource Hub locators are scoped to avoid duplicate matches.

### Page Object Model

Page Objects live in `pages/`. Each accepts `page` in its constructor and encapsulates page-specific actions. Assertions remain in the specs to keep test intent visible. No `BasePage` class or helper layer is used.

### Why no fixtures yet

The project intentionally does not introduce custom Playwright fixtures. Each Page Object is used by exactly one spec, there is no shared auth state, and there is no common setup that would benefit from a fixture. A fixture would be added only when a Page Object is reused across multiple tests or a shared precondition appears.
