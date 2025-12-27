# Care.xyz — Home Care Services (Next.js)

Care.xyz is a Next.js App Router project for booking home care services (Baby Care, Elderly Service, Sick People Service) with authentication, database-backed data, and a professional UI.

**Key Features**
- **Homepage**: Banner, About, Services overview, Testimonials, metrics — see [src/app/page.jsx](src/app/page.jsx)
- **Services**: DB-backed listing and detailed pages — see [src/app/services/page.jsx](src/app/services/page.jsx) and [src/app/service/[id]/page.jsx](src/app/service/%5Bid%5D/page.jsx)
- **Booking**: Private route, dynamic total, location selects — see [src/app/booking/[service_id]/page.jsx](src/app/booking/%5Bservice_id%5D/page.jsx) and [src/components/booking/BookingClient.jsx](src/components/booking/BookingClient.jsx)
- **My Bookings**: Private list with status badges and cancel — see [src/app/my-bookings/page.jsx](src/app/my-bookings/page.jsx)
- **Auth**: NextAuth with Credentials/Google providers — see [src/lib/authOptions.js](src/lib/authOptions.js)
- **DB**: MongoDB via `dbConnect`, auto-seeding services — see [src/actions/server/service.js](src/actions/server/service.js)
- **API Routes**: Services and bookings endpoints — see [src/app/api/services/route.js](src/app/api/services/route.js) and [src/app/api/bookings/route.js](src/app/api/bookings/route.js)
- **Middleware**: Private route protection — see [src/proxy.js](src/proxy.js)

**Tech Stack**
- Next.js 16 (App Router, Turbopack)
- Tailwind CSS + DaisyUI
- NextAuth (Credentials, Google)
- MongoDB (native driver)

**Getting Started**
- Prereqs: Node.js 18+, MongoDB instance, Google OAuth app (optional)

1) Install dependencies
```bash
npm install
```

2) Environment variables (.env at project root)
```bash
# Database
MONGODB_URI=
DBNAME=

# Auth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=

# OAuth (optional for Google sign-in)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Email (optional for booking invoices)
EMAIL_USER=
EMAIL_PASS=
```

3) Development
```bash
npm run dev
```
If port 3000 is busy, Next.js will use another port (e.g., 3001).

4) Build & Production
```bash
npm run build
npm start
```

**Deployment**
- Vercel recommended: set the same environment variables in the Vercel dashboard.
- Ensure `NEXTAUTH_URL` matches your production URL.

**Data & Seeding**
- Services are auto-seeded on first run from [src/data/services.json](src/data/services.json).
- DB access helpers normalize IDs and deduplicate entries — see [src/actions/server/service.js](src/actions/server/service.js).

**Booking Flow**
- From a service detail, click “Book Service” → private booking page.
- Choose duration (hours/days), select location (Bangladesh), enter address.
- Total cost respects `service.chargeType` (hour/day) on client and server.
- Confirm booking → persisted with `status: "Pending"` → redirect to My Bookings.

**Image Configuration**
- External image hosts must be allowed in [next.config.mjs](next.config.mjs) under `images.remotePatterns`.
- If you add new hosts, include them there to avoid `next/image` unconfigured host errors.

**UI Notes**
- Global loading screen shows only the Care.xyz logo — see [src/app/loading.jsx](src/app/loading.jsx).
- Navbar active state corrected — see [src/components/buttons/NavLink.jsx](src/components/buttons/NavLink.jsx) and [src/components/layouts/Navbar.jsx](src/components/layouts/Navbar.jsx).
- Location selects (Division → District → City) for Bangladesh — see [src/data/bdLocations.js](src/data/bdLocations.js).

**API Overview**
- `GET /api/services?id=<id>` → single service; `GET /api/services` → all services
- `GET /api/bookings` → authenticated user bookings
- `POST /api/bookings` → create booking (requires auth)
- `POST /api/bookings/cancel` → cancel a booking (requires auth)

**Troubleshooting**
- “Unconfigured host” on `next/image`: add the domain in [next.config.mjs](next.config.mjs).
- MongoDB not configured: set `MONGODB_URI` and `DBNAME` in `.env`.
- Private routes redirect: middleware is in [src/proxy.js](src/proxy.js).

**Scripts**
- `npm run dev` — start development server
- `npm run build` — build for production
- `npm start` — run the production build

**Acknowledgements**
- Built with Next.js, Tailwind CSS, DaisyUI, NextAuth, and MongoDB.
