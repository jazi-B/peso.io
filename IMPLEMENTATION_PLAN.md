# Peso.io Implementation Plan

## 1. Setup
- [x] Initialize Next.js App (Running)
- [ ] Install Prisma & SQLite
- [ ] Initialize Prisma

## 2. Database Schema
- Order Model:
  - id (Int, PK)
  - name (String)
  - contact (String)
  - location (String)
  - service (Enum or String): General Pest Control, Fumigation, Termite Control, Disinfectant Service, Rodent Control Service
  - notes (String, optional)
  - status (String, default: "Pending") [Pending, Done, Cancelled]
  - createdAt (DateTime)

## 3. Design System (Vanilla CSS)
- **Colors**:
  - Primary: Emerald Green / Teal (Cleanliness, Safety)
  - Secondary: Deep Blue (Trust)
  - Accent: Orange (Action)
  - Background: Off-white / Light Gray
- **Typography**: Inter (Google Fonts)
- **UI Components**:
  - `components/Button.tsx`: Variants (primary, secondary, danger)
  - `components/Input.tsx`: With label and validation error
  - `components/Select.tsx`: For services
  - `components/Card.tsx`: Glassmorphism effect

## 4. API Routes
- `POST /api/orders`: Validate & Create
- `GET /api/orders`: Auth check & List
- `PATCH /api/orders/[id]`: Auth check & Update Status
- `POST /api/auth/login`: Validate password, Set Cookie

## 5. Pages
- **Home (`/`)**:
  - Hero Section (Headline, CTA)
  - Services Grid (Cards with icons)
  - "Why Choose Us"
  - Footer
- **Order (`/order`)**:
  - Form with validation
  - Success state (Modal or Redirect)
- **Admin Login (`/admin/login`)**:
  - Simple password form
- **Admin Dashboard (`/admin/dashboard`)**:
  - Stats (Pending count)
  - Orders Table (Sortable/Filterable)
  - Actions (Mark Done/Cancel)

## 6. Security
- Middleware to protect `/admin/dashboard` and `/api/orders` (GET/PATCH)
- Input validation (Zod or manual)
