# Gatherly — All-in-One Booking Platform

A responsive frontend-only booking prototype built with React, TypeScript and Vite. It demonstrates travel and accommodation, events and entertainment, and business/everyday services with separate Customer, Provider and Admin workspaces.

> **Prototype notice:** all providers, reviews, availability, booking records, pricing and dashboard analytics are illustrative sample data. No live inventory, authentication, payments, refunds, messages or provider payouts are connected. No backend or database is included.

## Technology

- React 18 + TypeScript + Vite
- Tailwind CSS + custom responsive CSS
- React Router DOM
- Framer Motion
- Lucide React
- React Context-ready architecture (local UI state currently uses React hooks)
- React Hook Form and Zod included as dependencies for future form expansion
- LocalStorage persistence for bookings, demo role, provider listings and admin demo users

## Requirements

- Node.js 18.18+ (or Node.js 20+ recommended)
- npm
- VS Code (recommended)

## Run locally

1. Extract the ZIP file.
2. Open the extracted `Gatherly` folder in VS Code (`File → Open Folder`).
3. Open the integrated terminal (`Terminal → New Terminal`).
4. Run:

```bash
npm install
npm run dev
```

5. Open the local URL printed by Vite (usually `http://localhost:5173`).

## Demo roles

Use the role selector in the top navigation to switch between the three prototype experiences, then open **Dashboard**.

| Role | Demo profile | What to explore |
|---|---|---|
| Customer | Aarav Kumar | Overview, bookings, upcoming/history/cancelled bookings, cancellation, profile and settings |
| Provider | Fern Hospitality | Listings, add/delete service demo, booking requests and business workspace |
| Admin | Platform Admin | Overview charts, customer/provider directories, services, categories, booking list and status controls |

No passwords are required. This is role selection for demonstration, not production authentication.

## Main user journey

1. Browse the homepage or open Explore.
2. Search by keyword/location and use category, price, rating and sorting controls.
3. Open a service detail page and select **Book this service**.
4. Choose date, time, quantity and enter sample contact details.
5. Review the simulated checkout screen and confirm the demo booking.
6. View the confirmation reference and find the saved record under My Bookings and the Customer dashboard.
7. Switch to Provider or Admin demo roles to inspect the related prototype workspaces.

## Build and preview

```bash
npm run build
npm run preview
```

The production build is generated in `dist/`.

## Deploy

### Vercel

1. Push this project to a GitHub repository.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
4. Deploy.

### Netlify

1. Push the project to GitHub and import it in Netlify, or drag the generated `dist` folder to Netlify Drop.
2. Build command: `npm run build`.
3. Publish directory: `dist`.

For a Git-connected deployment, add a single-page-app redirect rule so React Router routes resolve to `index.html` (Netlify: create `public/_redirects` containing `/* /index.html 200`; for Vercel, configure an equivalent rewrite).

## GitHub upload

Create an empty repository on GitHub, then run these commands in the project terminal:

```bash
git init
git add .
git commit -m "Initial Gatherly frontend prototype"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

Replace the remote URL with your repository URL. Do not upload `node_modules/` or secrets.

## Project structure

```text
Gatherly/
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── README.md
└── src/
    ├── App.tsx          # Routes, shared shell, pages and separate dashboards
    ├── data.ts          # Illustrative service and category data
    ├── main.tsx
    └── styles.css       # Design system, responsive layouts and animations
```

## Design direction

The interface uses a restrained neutral canvas with the color family from the supplied reference: blue, green, yellow, orange, red, pink, purple, maroon and gray. Category colors are used as accents rather than applying every color everywhere. Deep navy text, white cards, soft borders, subtle shadows and clear spacing keep the booking experience consistent and professional. Photography is referenced from Unsplash; an internet connection is required to load these remote images and Google Fonts.

## Notes / prototype boundaries

- LocalStorage is browser-local and can be cleared by clearing site data.
- Sample records are seeded on first load; new demo bookings persist in that browser.
- Provider and Admin interactions are illustrative UI operations, not connected business workflows.
- The project intentionally contains no backend, real database, payment gateway or third-party booking API, in line with the assessment scope.
