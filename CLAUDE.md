# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository layout

The repository root is mostly presentation/metadata. The actual application lives in `A_ID/`.

- Root `README.md` — marketing/company description (A-Identity-Z multilingual AI services). Not a developer doc.
- `LICENSE` — MIT.
- `.github/workflows/` — see "CI / deployment" below. These workflows do **not** match the app in `A_ID/` and should be treated as scaffolding.
- `A_ID/` — the real full-stack app: a React frontend (public marketing site + admin SPA) and a FastAPI backend.

Note: `A_ID/README.md` is a placeholder ("Here are your Instructions") — ignore it.

## App architecture (`A_ID/`)

Two independent services that are developed and run separately:

### Frontend (`A_ID/frontend/`) — the substantial part
- Create React App (`react-scripts` 5) with **React 19**, Tailwind CSS, `framer-motion`, and `react-i18next`. Uses **yarn** (`yarn.lock` present).
- `src/index.js` → `src/routes.js` is the entry. `routes.js` defines two top-level route trees wrapped in `AuthProvider`:
  - `/*` → `src/App.js` — the public marketing single-page site (Navbar, Hero, Services, About, Testimonials, FAQ, CTA, Footer). All one file; sections are local components driven by `framer-motion` + `react-intersection-observer` scroll animations.
  - `/admin/*` → `src/admin/AdminApp.js` — the admin dashboard SPA. Sidebar nav + nested routes to pages in `src/admin/pages/` (Dashboard, UserManagement, Projects, TranslationManagement, AIModels, Settings, Login).
- **Auth is mocked.** `src/admin/hooks/useAuth.js` accepts any login, fabricates a user with a hardcoded `demo-token-12345`, and persists it to `localStorage` under `adminUser`. There is no real auth backend wired up. The comment in the file explicitly marks where a real API call belongs.
- **i18n** (`src/i18n.js`): 7 languages — `en, no, sv, da, de, tr, ar`. `en` is the fallback. Translations are loaded lazily over HTTP from `/locales/{{lng}}/{{ns}}.json`, i.e. from `public/locales/`. Language is detected from URL path first, then localStorage, then navigator. Arabic is RTL — `document.documentElement.dir`/`lang` are updated on language change, so don't hardcode LTR layout assumptions.
  - There are two locale trees: `public/locales/` (the ones actually served/loaded at runtime) and `src/locales/` (not loaded by the HTTP backend). When adding/editing translations, edit `public/locales/`.
- **Design tokens** live in `tailwind.config.js`: custom `primary`/`secondary` color scales, `neutral.dark`/`neutral.light`, `display`/`headline`/`subheadline` fluid font sizes, and `glass*` shadows. Prefer these tokens over ad-hoc values; the existing components rely on them heavily (e.g. `text-display`, `shadow-glass-xl`, `bg-neutral-dark`).
- `REACT_APP_BACKEND_URL` (in `frontend/.env`) is read in `App.js` but the public site does not yet call the backend.

### Backend (`A_ID/backend/`) — currently a stub
- FastAPI + MongoDB via `motor` (async). `server.py` connects to Mongo using `MONGO_URL` and `DB_NAME` from `backend/.env`, sets permissive CORS (`allow_origins=["*"]`), and exposes a single `GET /` returning `{"message": "Hello World"}`.
- There are **no real API routes yet** — the app is scaffolding. `external_integrations/` is an empty package.
- Caveat: `FastAPI(prefix="/api")` in `server.py` is not a valid FastAPI constructor argument and is silently ignored — routes are served at root, not under `/api`. Use an `APIRouter(prefix="/api")` if you intend an `/api` namespace.

## Dependency files — which one is real

There are three `requirements.txt`, and they disagree. Be deliberate about which you touch:
- `A_ID/backend/requirements.txt` — **this is what the backend actually needs** (fastapi, uvicorn, motor/pymongo, pydantic, etc.). Edit this for backend work.
- `A_ID/requirements.txt` — a much larger, aspirational stack (supabase, litellm, redis, kubernetes, sqlalchemy, langsmith…) that the current `server.py` does not use. Don't assume these are installed or wired up.
- `A_ID/.env.example` likewise references Supabase / `MOCK_AUTH`, which does **not** match the running backend's MongoDB config in `backend/.env`. The Supabase/litellm path is unimplemented.

## Common commands

All commands run from inside `A_ID/`.

Frontend (`A_ID/frontend/`):
```bash
yarn install            # install deps
yarn start              # dev server on port 3000
yarn build              # production build to build/
yarn test               # react-scripts (Jest) test runner, watch mode
yarn test --watchAll=false src/path/File.test.js   # run a single test file once
```
ESLint is configured via devDependencies (eslint 9 + react/jsx-a11y/import plugins); there is no `lint` script defined, so run `npx eslint src` if you need it.

Backend (`A_ID/backend/`):
```bash
pip install -r requirements.txt
uvicorn server:app --reload --port 8001    # dev server (frontend tooling assumes backend on :8001)
pytest                                      # tests (none exist yet under A_ID/tests/)
black . && isort . && flake8 && mypy .      # formatters/linters listed in requirements
```

## Running the full stack in the container

`A_ID/scripts/update-and-start.sh` is written for the hosted (Emergent-style) container, **not** a local checkout. It assumes:
- code at `/app/backend` and `/app/frontend`,
- `supervisorctl` manages `backend` and `frontend` services,
- backend deps installed with **poetry** (despite the repo shipping `requirements.txt`, not a `pyproject.toml`),
- frontend on port **3000**, backend on port **8001**.

Don't expect this script to work on a plain local clone. For local dev, run the frontend and backend commands above directly.

## CI / deployment

- `.github/workflows/main_zio.yml` deploys to **Azure Functions** as a **Node.js 22** app via `npm install/build/test` at the repo root on push to `main`. The repo has no root `package.json` or Node project, so this workflow is a generated template that does not correspond to the actual app. Do not assume it produces a working deploy.
- `.github/workflows/codeql-analysis.yml` runs CodeQL.

If you change build/run behavior, update or replace these workflows rather than assuming they reflect reality.

## Conventions worth following

- Frontend components are functional components with hooks; animations use `framer-motion` variants + `useInView`. Match the existing `FadeInSection`/card patterns when adding sections.
- Use Tailwind utility classes with the custom tokens from `tailwind.config.js`; avoid introducing a separate styling system.
- All user-facing copy should go through `react-i18next` (`useTranslation`) and the `public/locales/*` files — note that large parts of `App.js` still contain hardcoded English strings, so adding i18n keys is an active migration, not a finished one.
- Keep the public site (`App.js`) and the admin app (`src/admin/`) separate; they share only `AuthProvider` and Tailwind tokens.
