# Job Application Tracker - Frontend

A web app to track job applications add, search, filter, edit, and delete applications you've applied to, with status tracking (Applied, Interviewing, Offer, Rejected).

This is the **frontend** repository, built with Next.js and TypeScript. It consumes a separate REST API backend (Node.js/Express/MySQL).

## Features

- Search applications by company name or job title
- Filter by application status
- Paginated results
- Add, edit, and delete applications
- Form validation with inline error messages
- Light/dark mode support

## Tech stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Data fetching / caching:** TanStack Query (React Query)
- **HTTP client:** Axios
- **Forms:** React Hook Form

## Prerequisites

- [Node.js](https://nodejs.org/) v18.18 or later
- npm (comes with Node.js)
- The [backend API](#) running locally or accessible remotely (see [Required environment variables](#required-environment-variables))

## Installation

1. Clone the repository

   ```bash
   git clone https://github.com/AmanShrestha955/job-tracker-frontend.git
   cd job-tracker-frontend
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Set up environment variables — see [Required environment variables](#required-environment-variables) below.

## Running in development mode

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

Make sure the backend API is running and reachable at the URL set in `NEXT_PUBLIC_API_URL` before starting the frontend, or data requests will fail.

## Building for production

```bash
npm run build
npm run start
```

## Tests

No automated tests are currently set up for this project.

## Required environment variables

| Variable              | Description                 | Example                 |
| --------------------- | --------------------------- | ----------------------- |
| `NEXT_PUBLIC_API_URL` | Base URL of the backend API | `http://localhost:5000` |

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

> The `NEXT_PUBLIC_` prefix is required because this variable is read in client components (e.g. inside `useQuery` hooks for search/filter/pagination). Variables without this prefix are only available server-side in Next.js.

A `.env.example` is recommended and included in this repo — copy it to get started:

```bash
cp .env.example .env.local
```

## API documentation

This frontend expects the backend to expose the following REST endpoints under `${NEXT_PUBLIC_API_URL}/api`:

### Get all applications

```
GET /applications
```

**Query parameters**

| Param    | Type   | Required | Description                                           |
| -------- | ------ | -------- | ----------------------------------------------------- |
| `limit`  | number | Yes      | Number of results per page                            |
| `offset` | number | Yes      | Number of results to skip                             |
| `search` | string | No       | Matches against company name or job title             |
| `status` | string | No       | One of `Applied`, `Interviewing`, `Offer`, `Rejected` |

**Response**

```json
{
  "applications": [
    {
      "id": 1,
      "company_name": "Google",
      "job_title": "Software Engineer",
      "job_type": "Full-time",
      "status": "Applied",
      "applied_date": "2024-01-14T18:15:00.000Z",
      "notes": "Applied through referral",
      "created_at": "2026-06-17T06:44:53.000Z",
      "updated_at": "2026-06-17T06:44:53.000Z"
    }
  ],
  "total": 1,
  "currentPage": 1,
  "totalPages": 1
}
```

### Get a single application

```
GET /applications/:id
```

**Response:** a single application object (same shape as above).

### Create an application

```
POST /applications
```

**Request body**

```json
{
  "company_name": "Microsoft",
  "job_title": "Frontend Developer",
  "job_type": "Full-time",
  "status": "Applied",
  "applied_date": "2026-06-15",
  "notes": "Applied via LinkedIn referral"
}
```

| Field          | Type                  | Required | Notes                                                 |
| -------------- | --------------------- | -------- | ----------------------------------------------------- |
| `company_name` | string                | Yes      | Minimum 2 characters                                  |
| `job_title`    | string                | Yes      |                                                       |
| `job_type`     | string                | Yes      | One of `Internship`, `Full-time`, `Part-time`         |
| `status`       | string                | Yes      | One of `Applied`, `Interviewing`, `Offer`, `Rejected` |
| `applied_date` | string (`YYYY-MM-DD`) | Yes      |                                                       |
| `notes`        | string                | No       |                                                       |

**Response**

```json
{ "message": "application created successfully" }
```

### Update an application

```
PUT /applications/:id
```

**Request body:** any subset of the fields listed above.

**Response**

```json
{ "message": "Application updated successfully" }
```

### Delete an application

```
DELETE /applications/:id
```

**Response**

```json
{ "message": "Application deleted successfully" }
```

### Error responses

All endpoints return errors in the following shape:

```json
{
  "message": "Application not found",
  "error": "error in getApplicationByIdController"
}
```

## Project structure

```
src/
├── app/
│   ├── page.tsx                  # Home — list, search, filter, pagination
│   ├── [id]/page.tsx             # Application detail page
│   └── add-application/page.tsx  # Create / edit form
├── components/                   # Reusable UI components
├── types/                        # TypeScript types, grouped by feature
└── utils/                        # API client and helper functions
```
