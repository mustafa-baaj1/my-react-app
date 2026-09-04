# Course Platform - Codex Master Build Brief

## التعليمات الأساسية
أنت مسؤول عن بناء منصة دورات تعليمية كاملة داخل مشروع React + Vite الموجود. لا تنشئ مشروعًا جديدًا. افحص `package.json` و`src/` أولًا ثم نفّذ المشروع تدريجيًا مع الحفاظ على كود نظيف وقابل للصيانة.

## Stack
- React + Vite + JavaScript
- React Router DOM
- Axios
- Context API
- LocalStorage
- CSS responsive
- ESLint

## API/Data strategy
- DummyJSON للأجزاء التي يدعمها: Authentication / Users.
- Base URL: `https://dummyjson.com`
- Courses تكون بيانات محلية منظمة داخل `src/data/courses.js` لأنها تحتاج Sections/Lessons/Instructor/Progress.
- Enrollment وCompleted Lessons وProgress تحفظ في LocalStorage.
- لا تكرر API calls داخل Components؛ استخدم `src/services/`.

## Routes
- `/` Home
- `/courses` Courses
- `/courses/:id` Course Details
- `/login` Login
- `/register` Register
- `/my-courses` Protected
- `/learn/:courseId` Protected
- `/learn/:courseId/:lessonId` Protected
- `/profile` Protected
- `*` Not Found

## Features
### Home
Navbar, Hero, Featured Courses, Categories, Popular Courses, Why Choose Us, CTA, Footer.

### Courses
Reusable CourseCard, search, category filter, level filter, sorting (rating/price/A-Z), loading/error/empty states.

### Course Details
Course image, title, description, instructor, price, rating, level, duration, students count, curriculum, sections, lessons, Enroll/Continue Learning.

### Authentication
Login + Register forms with validation; AuthContext with `user`, `token`, `isAuthenticated`, `login`, `register`, `logout`; session restore after refresh; ProtectedRoute.

### Enrollment / My Courses
Enroll signed-in users, prevent duplicates, persist enrollment, show user courses and progress.

### Learning
Lesson player/video placeholder, sections/lesson sidebar, previous/next, mark completed, calculate progress, persist progress and last lesson.

### Profile
Basic user info, enrolled/completed/in-progress counts, logout. Edit profile is optional.

## Target structure
```text
src/
├── assets/
├── components/
│   ├── common/
│   ├── layout/
│   ├── course/
│   ├── lesson/
│   ├── auth/
│   └── home/
├── pages/
│   ├── Home/
│   ├── Courses/
│   ├── CourseDetails/
│   ├── Login/
│   ├── Register/
│   ├── MyCourses/
│   ├── Learning/
│   ├── Profile/
│   └── NotFound/
├── context/AuthContext.jsx
├── hooks/
├── services/api.js
├── services/authService.js
├── services/courseService.js
├── data/courses.js
├── routes/AppRoutes.jsx
├── utils/
├── styles/
├── App.jsx
└── main.jsx
```

## LocalStorage contract
```text
coursePlatform.auth = { user, accessToken }
coursePlatform.enrollments = { [userId]: [courseId, ...] }
coursePlatform.progress = {
  [userId]: {
    [courseId]: { completedLessonIds: [...], lastLessonId }
  }
}
```
Do not store passwords in LocalStorage.

## Implementation phases
1. Inspect existing repo, clean Vite defaults, install `react-router-dom` and `axios`, create structure/global styles.
2. Layout + Navbar + Footer + routing + 404.
3. Home page.
4. Courses data + Courses page + search/filter/sort.
5. Course Details + curriculum.
6. Auth API/service + Login/Register + AuthContext.
7. ProtectedRoute + Enrollment + My Courses.
8. Learning + lesson navigation + completion + progress.
9. Profile + responsive/accessibility/polish.
10. `npm run lint`, `npm run build`, README, final cleanup.

## Quality rules
- Modern portfolio-ready UI, not Vite default.
- Responsive desktop/tablet/mobile.
- Reusable components and clear service boundaries.
- Loading/Error/Empty states.
- Semantic HTML, form labels, alt text, keyboard-visible focus.
- No unnecessary large UI framework.
- No console errors or ESLint errors.
- Avoid giant components and duplicated API/LocalStorage logic.

## Definition of Done
All routes/pages work; search/filter/sort work together; auth/session/protected routes work; enrollment persists; My Courses works; lessons and progress persist; responsive UI; 404; lint/build pass; README completed.

## Start command for Codex
> Read this brief completely before changing code. Work inside the existing React + Vite project; do not create a new app. Inspect `package.json` and `src/`, then implement the project phase by phase. Continue through the full build unless a blocking technical issue requires clarification. After major phases run lint/build and fix errors. At the end summarize files changed, features completed, commands run, and remaining limitations.
