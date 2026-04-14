# OpenUI

OpenUI is a full-stack web app for discovering, sharing, and curating UI components. Users can sign up, browse a public gallery, view leaderboards, and (when signed in) manage a profile, submit components, and edit submissions. Admins get a dashboard to approve or reject submissions.

## Repository layout

| Directory   | Description                                      |
|------------|---------------------------------------------------|
| `frontend` | React 19 + TypeScript + Vite + Tailwind CSS v4   |
| `backend`  | Express 5 + TypeScript + MongoDB (Mongoose) + JWT |

## Features (high level)

- **Authentication** — Register, login, JWT-backed sessions; protected routes for submit/profile/edit.
- **Public browsing** — Home, component catalog with search, component detail by slug, leaderboard (available without an account).
- **Submissions** — Authenticated users can submit and edit their components (multipart uploads where applicable).
- **Contribution docs** — In-app `/contribute` guide with quality standards and theme compatibility requirements.
- **Admin** — Role-based access to review submissions (approve / reject) and view dashboard data.

## Contribution standards

- Open `/contribute` in the app for contributor onboarding, review expectations, and submission quality checks.
- Submissions now include a `themeSupport` declaration (`both`, `light`, or `dark`).
- `both` is the recommended default; components that become unreadable/invisible in one theme are likely to be rejected during review.

API routes are mounted under `/api` (e.g. `/api/auth`, `/api/components`, `/api/admin`, `/api/leaderboard`).

## Prerequisites

- **Node.js** 20+ (Render currently defaults to Node 22; local 20+ is fine).
- **MongoDB** — A cluster or local instance; the backend expects a connection string in `MONGODB_URI`.

## Environment variables

### Backend (`backend/.env`)

Create `backend/.env` (never commit real secrets):

```env
PORT=5000
JWT_SECRET=your-long-random-secret
MONGODB_URI=mongodb+srv://USER:PASSWORD@cluster.example.mongodb.net/DATABASE_NAME
```

- **`PORT`** — HTTP port (default `5000` if omitted).
- **`JWT_SECRET`** — Secret used to sign and verify JWTs.
- **`MONGODB_URI`** — MongoDB connection string. If unset, the app logs a warning and skips connecting (API behavior may be limited).

### Frontend (`frontend/.env`)

```env
VITE_API_URL=http://localhost:5000
```

- **`VITE_API_URL`** — Origin of the API (no trailing slash). Vite only exposes variables prefixed with `VITE_`.
- If you leave it empty, the dev server can still proxy `/api` to the backend (see `frontend/vite.config.ts`). For production or when the API is on another host, set this to your deployed API URL.

## Local development

Install dependencies in each app:

```bash
cd backend && npm install
cd ../frontend && npm install
```

**Terminal 1 — API**

```bash
cd backend
npm run dev
```

**Terminal 2 — UI**

```bash
cd frontend
npm run dev
```

Open the URL Vite prints (typically `http://localhost:5173`). Ensure `VITE_API_URL` matches your API origin if you are not relying on the proxy.

## Build and production run

**Backend**

```bash
cd backend
npm run build    # runs tsc → output in dist/
npm start        # node dist/server.js
```

**Frontend**

```bash
cd frontend
npm run build    # tsc -b && vite build → output in dist/
npm run preview  # optional local preview of the static build
```

Serve the contents of `frontend/dist` with any static host or CDN, and point `VITE_API_URL` at your live API when building (or configure your host’s env at build time).

## Deployment notes (e.g. Render)

- **Backend Web Service** — Root directory: `backend`. Build: `npm install && npm run build`. Start: `npm start` (or `node dist/server.js`). Set `PORT`, `JWT_SECRET`, and `MONGODB_URI` in the service environment.
- **Frontend Static Site** — Root directory: `frontend`. Build: `npm install && npm run build`. Publish directory: `dist`. Define `VITE_API_URL` in the build environment so the client bundle targets your API.

The backend `tsconfig` uses `module` / `moduleResolution` settings compatible with TypeScript 5 and 6 so CI builds do not fail on `ignoreDeprecations` mismatches.

## Scripts reference

| Location   | Command           | Purpose                          |
|-----------|-------------------|----------------------------------|
| `backend` | `npm run dev`     | Dev server with nodemon + ts     |
| `backend` | `npm run build`   | Compile TypeScript to `dist/`    |
| `backend` | `npm start`       | Run compiled server              |
| `frontend`| `npm run dev`     | Vite dev server                  |
| `frontend`| `npm run build`   | Production bundle                |
| `frontend`| `npm run preview` | Preview production build locally |

## License

See `package.json` files in `frontend` and `backend` for package licensing; add a project-level license file if you want to specify terms for the whole repo.
