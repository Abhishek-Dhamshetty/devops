# Campus Voice

A beginner-friendly student complaint management system built with React, Vite, Express, MongoDB, Mongoose, JWT, and bcryptjs.

## Setup

1. Start MongoDB locally, or add your MongoDB Atlas connection string to `backend/.env`.
2. Set `MONGO_URI`, a long random `JWT_SECRET`, `PORT=5001`, and `CLIENT_URL=http://localhost:5173` in `backend/.env`.
3. Set `VITE_API_URL=http://localhost:5001/api` in `frontend/.env.local`.
4. Provision the first administrator from `backend` with environment variables:

```sh
ADMIN_NAME="Campus Administrator" ADMIN_EMAIL="admin@example.edu" ADMIN_PASSWORD="replace-me" ADMIN_EMPLOYEE_ID="EMP-001" npm run create-admin
```

The public registration endpoint deliberately creates students only. Do not put the admin variables in frontend files.

## Run

In one terminal:

```sh
cd backend
npm run dev
```

In another:

```sh
cd frontend
npm run dev
```

The API runs on `http://localhost:5001` because macOS commonly reserves port 5000 for AirPlay Receiver. Open the frontend at `http://localhost:5173`.

## Security note

The frontend stores the bearer JWT in `localStorage` for this beginner project, which is convenient but exposes the token to JavaScript running through an XSS vulnerability. Backend authorization remains authoritative; production hardening should move the session to an HttpOnly, Secure, SameSite cookie with CSRF protection.

## Validation

`cd frontend && npm run lint` and `cd frontend && npm run build` are available. Full API behavior requires a reachable MongoDB instance and configured environment variables.
