# Learnova

Learnova is a portfolio-ready Arabic online learning platform built with React and Vite. The entire learner experience is designed for right-to-left use and includes course discovery, demo authentication, enrollment, lesson navigation, progress tracking, and a personal learning dashboard.

## Features

- Premium Arabic RTL landing page with categories, featured courses, statistics, testimonials, and calls to action.
- Course catalog with real-time Arabic search, category and level filters, sorting, URL-persisted catalog state, and responsive cards.
- Course details with curriculum accordions, outcomes, requirements, instructor information, related courses, and enrollment actions.
- DummyJSON login and current-user validation, plus local demo registration when persistent remote registration is unavailable.
- Protected routes that return learners to their originally requested page after login.
- Per-user course enrollment with duplicate prevention.
- Learning workspace with lesson routing, curriculum navigation, video placeholders, previous/next controls, completion tracking, and course completion states.
- My Courses page with real progress and resume links.
- Profile dashboard with learning statistics, recent activity, enrolled-course journey, and local display-name editing for demo users.
- Loading, error, empty, success, disabled, and not-authorized states across the application.
- Responsive layouts for desktop, tablet, and mobile, with keyboard and reduced-motion support.

## Technologies

- React 19
- React Router
- Axios
- Vite
- Context API
- LocalStorage
- Modern responsive CSS with shared design tokens
- ESLint

No backend or external UI component library is used.

## Architecture

```text
src/
├── components/        Reusable layout, course, auth, learning, profile, and home UI
├── context/           Authentication state and actions
├── data/              Single local course dataset
├── hooks/             Shared React hooks
├── pages/             Route-level page composition and styles
├── routes/            Application route definitions and protection
├── services/          API, auth, enrollment, progress, profile, and storage logic
├── styles/            Global styles, design tokens, and auth styles
└── utils/             Catalog, validation, and redirect helpers
```

The principal data flow is:

```text
Pages and components → contexts/services → storage or Axios API → DummyJSON
```

Course records are defined only in `src/data/courses.js`. UI components use `courseService.js` rather than maintaining separate datasets.

## API strategy

DummyJSON is used only for authentication and user-related demo behavior through the shared Axios instance.

Endpoints used:

- `POST /auth/login` — authenticate an existing DummyJSON user.
- `GET /auth/me` — validate and restore a remote authenticated session.
- `GET /users/filter` — resolve an email address to a DummyJSON username.
- `POST /users/add` — simulate account creation before saving a local demo account.

Courses, enrollments, and learning progress do not use DummyJSON.

## Authentication behavior

- Remote demo sessions are restored through `/auth/me` when possible.
- Registration creates a demo-compatible local account because DummyJSON does not persist newly created users.
- Local demo passwords are stored as salted SHA-256 hashes rather than plaintext.
- Logging out clears the active session and returns to the home page.
- `/my-courses`, `/profile`, and all `/learn/*` routes require authentication.
- Learning routes additionally require enrollment in the requested course.

DummyJSON demo credentials:

```text
Username: emilys
Password: emilyspass
```

## Local storage strategy

All browser storage access is centralized in the service layer.

| Key | Purpose |
| --- | --- |
| `coursePlatform.auth` | Current authenticated user and access token |
| `coursePlatform.localUsers` | Locally registered demo accounts and password hashes |
| `coursePlatform.enrollments` | Per-user course enrollment records |
| `coursePlatform.learningProgress` | Per-user, per-course completed lessons and last visited lesson |

Clearing browser site data removes local accounts, enrollment records, and learning progress.

## Installation

Requirements: a current Node.js LTS release and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Development commands

```bash
npm run dev      # Start the Vite development server
npm run lint     # Run ESLint across the project
npm run build    # Create a production bundle in dist/
npm run preview  # Preview the production bundle locally
```

## Production build and deployment

Create the deployable bundle with:

```bash
npm run build
```

Deploy the generated `dist` directory to a static host. Because Learnova uses browser-history routes, the host must return `index.html` for unknown application paths.

This repository includes:

- `public/_redirects` for Netlify and compatible static hosts.
- `vercel.json` for Vercel SPA rewrites.

For other providers, configure an equivalent fallback such as `/* → /index.html` with a successful response status.

## Environment and secrets

The demo uses no environment variables and contains no private API keys. `.env` files are ignored to prevent accidental secret commits. DummyJSON is a public demonstration API.

## Demo limitations

- This is a frontend-only portfolio project; it has no production backend or server-side authorization.
- Remote authentication depends on DummyJSON availability and its demo users.
- Locally registered users exist only in the current browser and device.
- Tokens and demo data are kept in LocalStorage, which is suitable for this demonstration but not a production security model.
- Course videos are professional placeholders; no streaming provider is integrated.
- Favorites are session-only UI feedback and are not persisted.
- Progress and recent activity are device-local. Activity uses enrollment and latest course-progress timestamps rather than a full event log.
- Static hosts require the included or equivalent SPA fallback configuration for direct route refreshes.
