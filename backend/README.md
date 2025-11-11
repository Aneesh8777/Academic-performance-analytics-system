# Student Performance Analytics – Backend

## Prereqs

- Node 18+
- MongoDB running locally (default: mongodb://127.0.0.1:27017)

## Setup

```bash
cp .env.example .env
npm install
npm run seed
npm run dev
API base: http://localhost:4000

Auth
POST /api/auth/signup { name, email, password, role }

POST /api/auth/login { email, password } → { token }

Use Authorization: Bearer <token> for the endpoints below.

Students
GET /api/students (admin/teacher)

POST /api/students (admin/teacher)

GET /api/students/:id (admin/teacher)

PATCH /api/students/:id (admin/teacher)

DELETE /api/students/:id (admin only)

Courses
GET /api/courses (admin/teacher)

POST /api/courses (admin/teacher)

PATCH /api/courses/:id (admin/teacher)

DELETE /api/courses/:id (admin only)

Performance & Analytics
POST /api/analytics/performance (admin/teacher)
body: { student, course, exam, score, attendance, date? }

GET /api/analytics/:studentId (admin/teacher/student)

Reports
GET /api/reports/students?format=json|csv (admin/teacher)

Health
GET /api/health → { ok: true }
```
