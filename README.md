# Energy Tracker

A responsive, full-featured energy consumption tracking dashboard built with React and TypeScript.

---

## Overview

Energy Tracker lets users monitor and manage their electricity usage through a clean, data-driven interface. Readings are fetched from and persisted to a mock REST API, with all interactions handled client-side in real time.

---

## Features

### Authentication
- Login and Sign Up pages with client-side form validation
- Protected routes via `AuthGuard` — unauthenticated users are redirected to login
- Session managed via localStorage token

### Readings Management
- Add, edit, and delete energy readings via a modal form
- Real-time UI updates on every CRUD operation
- Confirmation dialog before deletion

### Dashboard
- Monthly energy and cost summary cards
- Daily, weekly, and monthly consumption charts
- Recent readings panel

### Goals & Limits
- Set monthly kWh and budget limits
- Alert threshold slider — get warned before hitting your limit
- Recent performance history by month
- Persistent goal storage via localStorage

### Energy Tips
- Static tips panel with actionable energy-saving advice

### Responsive Design
- Mobile bottom navigation bar
- Sidebar navigation on desktop
- Fluid layouts across all screen sizes

---

## Tech Stack

| Tool | Purpose |
|---|---|
| React + TypeScript | UI framework and type safety |
| React Router DOM | Client-side routing and protected routes |
| Axios | HTTP requests to mock API |
| Tailwind CSS | Utility-first styling |
| Recharts | Data visualization |
| Lucide React | Icon library |
| MockAPI | Mock REST API backend |

---

## Getting Started

### Prerequisites
- Node.js v18 or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/energy-tracker.git

# Navigate into the project
cd energy-tracker

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Environment

If you are using a custom API URL, update the `API_URL` value inside your `ReadingsContext` to point to your mock API endpoint.

---

## Project Structure

src/
├── components/
│   ├── AuthGuard.tsx
│   ├── DashboardAlertBanner.tsx
│   ├── dashboard/
│   │   ├── DailyConsumptionChart.tsx
│   │   ├── MonthlyConsumptionChart.tsx
│   │   ├── RecentReadings.tsx
│   │   └── WeeklyConsumptionChart.tsx
│   ├── layout/
│   │   ├── AppLayout.tsx
│   │   └── SidebarLinks.tsx
│   ├── readingsInfo/
│   │   ├── AddModal.tsx
│   │   └── ReadingsTable.tsx
│   └── ui/
│       └── Button.tsx
│
├── context/
│   ├── ReadingProvider.tsx
│   └── ReadingsContext.tsx
│
├── pages/
│   ├── DashBoard.tsx
│   ├── Goals.tsx
│   ├── Login.tsx
│   ├── Readings.tsx
│   ├── Settings.tsx
│   ├── SignUp.tsx
│   └── Tips.tsx
│
├── type/
│   └── types.ts
│
├── App.tsx
├── index.css
├── main.tsx
└── assets/dvs 