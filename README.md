# Peso.io - Pest Control Services

A professional, fully-functional website for Peso.io, built with Next.js, Prisma, and SQLite.

## Features

- **Public Order Form**: Customers can book services with validation (Name, Contact, Location, Service).
- **Service Selection**: General Pest Control, Fumigation, Termite Control, etc.
- **Admin Dashboard**: Secure interface to view, manage, and update order statuses.
- **Authentication**: Password-protected admin access.
- **Responsive Design**: Mobile-friendly aesthetics with glassmorphism effects.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: SQLite (local)
- **ORM**: Prisma
- **Styling**: Vanilla CSS (Custom Design System)
- **Auth**: JOSE (JWT implementation)

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Database
The database is already configured. If you need to reset it:
```bash
npx prisma migrate dev --name init
```

### 3. Run the Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Admin Access

- **Login URL**: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- **Password**: `admin123` (Configurable in `.env` or `src/app/api/auth/login/route.ts`)

## Project Structure

- `src/app`: Page routes and API endpoints.
- `src/components`: Reusable UI components (Input, Select, Navbar, Footer).
- `src/lib`: Utilities (Prisma client, Auth).
- `prisma/schema.prisma`: Database schema.
