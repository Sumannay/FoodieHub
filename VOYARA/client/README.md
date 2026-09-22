# VOYARA web client

Phase 1 of VOYARA’s travel platform: a responsive Vite + React + TypeScript web client with a production-minded route structure, typed domain models and a replaceable API boundary.

## What is working

- Premium travel discovery homepage, destination browsing, hotel browsing and global search.
- Canonical routes for destinations, stays, trip building, booking, confirmation, AI planning, account, favourites and admin boundaries.
- Six-step trip builder; review selections continue into checkout.
- Browser-persisted demo session, saved items, trip draft and confirmed bookings.
- Client-side sign-in/register flow with validation and protected account routes.
- A local `demoApi` provider that keeps UI code ready for a FastAPI/JWT provider replacement.

Demo data is intentionally marked by implementation: it lives in `src/data/catalog.ts` and is used only by the local provider.

## Run locally

```bash
npm install
Copy-Item .env.example .env
npm run dev
```

Open the local URL Vite prints (normally `http://localhost:5173`).

For production validation:

```bash
npm run lint
npm run build
```

## Client structure

```text
src/
├── components/       # navigation, layout, access guard
├── context/          # session, favourites, trip and booking state
├── data/             # clearly scoped demo catalogue
├── lib/              # replaceable local API provider
├── pages/            # route-level experiences
└── types/            # shared domain contracts
```

## Backend hand-off

This workspace contains only the existing `client` application. The app does not pretend to process real payments or secure production authentication locally. Replace `src/lib/demoApi.ts` with a typed FastAPI client and move persistence to the API before enabling real users, payments, or sensitive information.

The client only accepts public `VITE_*` configuration. Keep `DATABASE_URL`, `JWT_SECRET`, payment secrets and LLM keys exclusively in the server environment.
