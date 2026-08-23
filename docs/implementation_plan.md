# الواحة التعليمية — Updated Implementation Plan v3

An Arabic (RTL) educational platform with **Next.js + FastAPI + Supabase + Tailwind CSS**.
Three role-based dashboards: **Student**, **Teacher**, **Admin**.

## Design Reference

![UI Design Reference](file:///C:/Users/eslam/.gemini/antigravity/brain/295537e6-8ce4-4a17-9c24-9dffd935381e/.user_uploaded/media_1787505202352.png)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (App Router) |
| Styling | Tailwind CSS 3 (RTL + dark mode) |
| Theme | next-themes |
| Backend | Python + FastAPI |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth (email + social) |
| File Storage | Supabase Storage (videos + PDFs) |
| Video Player | Plyr (lightweight HTML5 player) |
| PDF Viewer | react-pdf |
| Charts | Recharts |
| Animations | Framer Motion |

---

## 1. Security Plan

### Authentication Layer

```
User  -->  Next.js (Login Page)
              |
              v
        Supabase Auth (JWT issued)
              |
              v
        Next.js stores JWT in httpOnly cookie
              |
              v
        Every API call --> FastAPI validates JWT
              |
              v
        FastAPI checks user role --> grants/denies access
```

| Security Measure | Implementation |
|-----------------|----------------|
| **Authentication** | Supabase Auth with JWT tokens (access + refresh) |
| **Token Storage** | httpOnly cookies (NOT localStorage — prevents XSS theft) |
| **Password Hashing** | Supabase uses bcrypt internally |
| **Row Level Security (RLS)** | Enabled on ALL Supabase tables — users can only read/write their own data |
| **Role-Based Access (RBAC)** | Three roles: `student`, `teacher`, `admin` — stored in `profiles.role` |
| **API Protection** | FastAPI middleware validates JWT on every request |
| **Route Protection** | Next.js middleware redirects unauthenticated users to login |
| **CORS** | FastAPI CORS configured to only allow the frontend origin |
| **Input Validation** | Pydantic models validate all API inputs (prevents injection) |
| **Rate Limiting** | SlowAPI on FastAPI — prevents brute force attacks |
| **File Upload Validation** | Check file type + size before upload (videos: max 500MB, PDFs: max 50MB) |
| **SQL Injection** | Supabase uses parameterized queries — SQL injection is not possible |
| **XSS Protection** | React auto-escapes output, CSP headers via Next.js |
| **HTTPS** | Enforced in production via deployment platform |

### Row Level Security (RLS) Example

```sql
-- Students can only see their own enrollments
CREATE POLICY "Users see own enrollments" ON enrollments
  FOR SELECT USING (auth.uid() = user_id);

-- Teachers can see enrollments for their courses
CREATE POLICY "Teachers see course enrollments" ON enrollments
  FOR SELECT USING (
    course_id IN (
      SELECT id FROM courses WHERE instructor_id = auth.uid()
    )
  );

-- Admins can see everything
CREATE POLICY "Admin full access" ON enrollments
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
```

### FastAPI Role Middleware

```python
from fastapi import Depends, HTTPException

async def require_role(required_role: str):
    async def role_checker(user = Depends(get_current_user)):
        if user.role not in [required_role, "admin"]:  # admin can access everything
            raise HTTPException(status_code=403, detail="Access denied")
        return user
    return role_checker

# Usage:
@router.get("/teacher/students")
async def get_students(user = Depends(require_role("teacher"))):
    ...
```

---

## 2. Color Palette

### Design Tokens

| Token | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| `--bg-primary` | `#F0F4F8` | `#0F172A` | Page background |
| `--bg-card` | `#FFFFFF` | `#1E293B` | Card surfaces |
| `--bg-sidebar` | `#0F2440` | `#020617` | Sidebar (stays dark in both modes) |
| `--bg-input` | `#F1F5F9` | `#334155` | Search bar, input fields |
| `--text-primary` | `#1E293B` | `#F1F5F9` | Headings, main text |
| `--text-secondary` | `#64748B` | `#94A3B8` | Subtitles, labels |
| `--text-muted` | `#94A3B8` | `#64748B` | Timestamps, hints |
| `--border` | `#E2E8F0` | `#334155` | Card borders, dividers |
| `--accent-blue` | `#2563EB` | `#3B82F6` | Active nav, primary buttons |
| `--accent-blue-light` | `#DBEAFE` | `#1E3A5F` | Active nav background |
| `--hover` | `#F8FAFC` | `#283548` | Card hover states |

### Stat Card Colors

| Stat | Icon Color | Background Tint (Light) | Background Tint (Dark) |
|------|-----------|------------------------|----------------------|
| Learning Hours | `#F97316` (orange) | `#FFF7ED` | `#431407` |
| Completed Courses | `#22C55E` (green) | `#F0FDF4` | `#052E16` |
| Progress Points | `#3B82F6` (blue) | `#EFF6FF` | `#172554` |
| Weekly Sessions | `#EAB308` (yellow) | `#FEFCE8` | `#422006` |

### Course Card Gradients

| Category | Gradient (same in both modes) |
|----------|------|
| Programming | `linear-gradient(135deg, #6366F1, #8B5CF6)` — indigo to purple |
| Design | `linear-gradient(135deg, #818CF8, #C4B5FD)` — lavender |
| Data | `linear-gradient(135deg, #F59E0B, #FBBF24)` — amber to gold |
| Business | `linear-gradient(135deg, #3B82F6, #93C5FD)` — blue |

### Featured Course Card

| Element | Color |
|---------|-------|
| Background | `linear-gradient(135deg, #0F2440, #1B3A5C)` — navy gradient |
| Title text | `#FFFFFF` |
| Progress ring track | `#334155` (dark gray) |
| Progress ring fill | `#D4A017` (gold) |
| CTA button | `#2563EB` with white text |

### Tailwind Config

```js
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        sidebar: { DEFAULT: '#0F2440', dark: '#020617' },
        brand: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          500: '#2563EB',
          600: '#1D4ED8',
          700: '#1B3A5C',
          900: '#0F2440',
        },
      },
      fontFamily: {
        tajawal: ['Tajawal', 'sans-serif'],
      },
    },
  },
}
```

---

## 3. Login & Signup Plan

### Pages

| Page | Route | Features |
|------|-------|----------|
| Login | `/auth/login` | Email + password, "Remember me", forgot password link |
| Signup | `/auth/signup` | Full name, email, password, confirm password, role selection |
| Forgot Password | `/auth/forgot-password` | Email input, sends reset link |
| Reset Password | `/auth/reset-password` | New password + confirm (accessed via email link) |

### Login Page Design

```
+------------------------------------------+
|                                          |
|      [Logo: الواحة التعليمية]              |
|                                          |
|      تسجيل الدخول                         |
|      ─────────────────                   |
|      البريد الإلكتروني                     |
|      [________________________]          |
|                                          |
|      كلمة المرور                          |
|      [________________________] [eye]    |
|                                          |
|      [x] تذكرني        نسيت كلمة المرور؟  |
|                                          |
|      [    تسجيل الدخول    ]              |
|                                          |
|      ────── أو ──────                    |
|                                          |
|      [ Google تسجيل الدخول عبر ]          |
|                                          |
|      ليس لديك حساب؟  إنشاء حساب          |
|                                          |
|              [Light/Dark Toggle]          |
+------------------------------------------+
```

### Signup Flow

```
1. User fills: full name, email, password, confirm password
2. User selects role: "طالب" (Student) or "معلم" (Teacher)
   -- Admin accounts are created manually by existing admins only
3. Supabase Auth creates account + sends verification email
4. User verifies email
5. FastAPI creates profile record with selected role
6. User redirected to their role-specific dashboard
```

### Auth Flow (Technical)

```
Login Request
    |
    v
Supabase Auth verifies credentials
    |
    v
Returns: access_token (JWT, 1hr) + refresh_token (30 days)
    |
    v
Next.js stores tokens in httpOnly cookies
    |
    v
Next.js middleware checks cookie on every page load:
  - Valid token? --> Allow access
  - Expired?    --> Use refresh_token to get new access_token
  - No token?   --> Redirect to /auth/login
    |
    v
Role from JWT determines which dashboard to show:
  - student --> /dashboard
  - teacher --> /teacher
  - admin   --> /admin
```

### Protected Routes (Next.js Middleware)

```javascript
// middleware.js
export function middleware(request) {
  const token = request.cookies.get('access_token');
  const path = request.nextUrl.pathname;

  // Public routes
  if (path.startsWith('/auth')) return;

  // No token --> redirect to login
  if (!token) return redirect('/auth/login');

  // Role-based route protection
  const role = decodeJWT(token).role;
  if (path.startsWith('/teacher') && role !== 'teacher' && role !== 'admin')
    return redirect('/dashboard');
  if (path.startsWith('/admin') && role !== 'admin')
    return redirect('/dashboard');
}
```

---

## 4. Role-Based Dashboards

### A. Student Dashboard (الطالب)

This is the main design from the reference image. Includes:
- Welcome greeting + stats cards
- Current course with progress ring
- Deadlines widget
- Weekly plan
- My courses grid with category tabs
- بنك الأسئلة (Question Bank) — practice & self-assessment

**Sidebar Navigation:**
- الرئيسية (Dashboard)
- دوراتي (My Courses)
- بنك الأسئلة (Question Bank)
- المهام (Tasks)
- استكشف (Explore)

---

### B. Teacher Dashboard (المعلم)

| Section | Description |
|---------|-------------|
| Overview Stats | Total students, active courses, pending assignments, average scores |
| My Courses | List of courses the teacher created — edit, manage, view enrollment |
| Student Progress | Table: student name, course, progress %, last activity |
| Assignments | Create/edit assignments, view submissions, grade work |
| بنك الأسئلة | Create/edit/organize questions for quizzes and exams |
| Content Upload | Upload video lessons + PDF materials |
| Deadlines | Set deadlines for assignments and exams |

**Sidebar Navigation:**
- لوحة التحكم (Dashboard)
- دوراتي (My Courses)
- الطلاب (Students)
- بنك الأسئلة (Question Bank)
- المحتوى (Content — videos/PDFs)
- التقييمات (Assignments/Grades)

**Teacher can:**
- Create and edit courses
- Upload videos and PDFs per lesson
- Create questions in the question bank
- Build quizzes from question bank
- View student progress and grades
- Set deadlines

---

### C. Admin Dashboard (المدير)

| Section | Description |
|---------|-------------|
| Platform Stats | Total users, total courses, active sessions today, new signups this week |
| User Management | List all users — search, filter by role, activate/deactivate accounts |
| Course Management | View all courses — approve, reject, feature, archive |
| Category Management | Add/edit/delete course categories |
| Content Moderation | Review uploaded videos/PDFs |
| Reports | Platform analytics — user growth chart, popular courses, completion rates |
| Settings | Site name, logo, maintenance mode, announcement banner |

**Sidebar Navigation:**
- لوحة التحكم (Dashboard)
- المستخدمون (Users)
- الدورات (Courses)
- التصنيفات (Categories)
- التقارير (Reports)
- الإعدادات (Settings)

**Admin can:**
- Manage all users (create admin accounts, deactivate users)
- Approve/reject courses
- View platform-wide analytics
- Manage categories and settings
- Access everything a teacher can

---

## 5. بنك الأسئلة (Question Bank)

### Database Schema

```sql
-- Questions
CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  course_id INTEGER REFERENCES courses(id),
  created_by UUID REFERENCES profiles(id),
  question_text TEXT NOT NULL,
  question_type TEXT NOT NULL,  -- 'mcq', 'true_false', 'short_answer'
  difficulty TEXT DEFAULT 'medium',  -- 'easy', 'medium', 'hard'
  points INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- MCQ answer options
CREATE TABLE question_options (
  id SERIAL PRIMARY KEY,
  question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
  option_text TEXT NOT NULL,
  is_correct BOOLEAN DEFAULT FALSE,
  option_order INTEGER
);

-- Quizzes (built from questions)
CREATE TABLE quizzes (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  course_id INTEGER REFERENCES courses(id),
  created_by UUID REFERENCES profiles(id),
  time_limit_minutes INTEGER,
  total_points INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Quiz-Question mapping
CREATE TABLE quiz_questions (
  quiz_id INTEGER REFERENCES quizzes(id) ON DELETE CASCADE,
  question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
  question_order INTEGER,
  PRIMARY KEY (quiz_id, question_id)
);

-- Student quiz attempts
CREATE TABLE quiz_attempts (
  id SERIAL PRIMARY KEY,
  quiz_id INTEGER REFERENCES quizzes(id),
  user_id UUID REFERENCES profiles(id),
  score INTEGER,
  total_points INTEGER,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);
```

### Question Bank Features

**For Teachers:**
- Create questions (MCQ, true/false, short answer)
- Set difficulty level and points
- Organize by course and topic
- Build quizzes by selecting questions from the bank
- Set time limits for quizzes
- View quiz results and analytics

**For Students:**
- Browse questions by course/topic for self-study
- Take practice quizzes
- View past quiz results and correct answers
- Track performance per topic

---

## 6. Video Playback Plan

### Storage

```
Supabase Storage
  └── videos/
       └── {course_id}/
            └── {lesson_id}/
                 └── video.mp4
```

- Teachers upload videos through the teacher dashboard
- Max file size: 500MB per video
- Accepted formats: MP4, WebM
- Supabase generates a signed URL (time-limited, secure)

### Player

Using **Plyr** (lightweight, customizable HTML5 video player):

```jsx
// components/VideoPlayer.jsx
import Plyr from 'plyr-react';
import 'plyr-react/plyr.css';

export default function VideoPlayer({ videoUrl }) {
  return (
    <div className="rounded-xl overflow-hidden bg-black">
      <Plyr
        source={{
          type: 'video',
          sources: [{ src: videoUrl, type: 'video/mp4' }],
        }}
        options={{
          controls: ['play', 'progress', 'current-time', 'duration',
                     'mute', 'volume', 'fullscreen', 'settings'],
          settings: ['quality', 'speed'],
          speed: { selected: 1, options: [0.5, 0.75, 1, 1.25, 1.5, 2] },
        }}
      />
    </div>
  );
}
```

### Video Progress Tracking

```sql
-- Track where user stopped watching
CREATE TABLE video_progress (
  user_id UUID REFERENCES profiles(id),
  lesson_id INTEGER REFERENCES lessons(id),
  watched_seconds INTEGER DEFAULT 0,
  total_seconds INTEGER,
  is_completed BOOLEAN DEFAULT FALSE,
  PRIMARY KEY (user_id, lesson_id)
);
```

- Frontend saves playback position every 10 seconds
- When user returns, video resumes from last position
- Mark as "completed" when user watches 90%+

---

## 7. PDF Storage & Viewing Plan

### Storage

```
Supabase Storage
  └── pdfs/
       └── {course_id}/
            └── {lesson_id}/
                 └── document.pdf
```

- Teachers upload PDFs through the teacher dashboard
- Max file size: 50MB per PDF
- Supabase generates signed URLs for secure access

### PDF Viewer

Using **react-pdf** for in-browser PDF viewing:

```jsx
// components/PdfViewer.jsx
import { Document, Page } from 'react-pdf';
import { useState } from 'react';

export default function PdfViewer({ pdfUrl }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-4">
      <Document file={pdfUrl} onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
        <Page pageNumber={pageNumber} />
      </Document>

      <div className="flex items-center justify-between mt-4">
        <button onClick={() => setPageNumber(p => Math.max(1, p - 1))}>السابق</button>
        <span>صفحة {pageNumber} من {numPages}</span>
        <button onClick={() => setPageNumber(p => Math.min(numPages, p + 1))}>التالي</button>
      </div>

      <a href={pdfUrl} download className="block mt-2 text-brand-500">
        تحميل PDF
      </a>
    </div>
  );
}
```

### PDF Features
- In-browser viewing (no download required)
- Page navigation (next/previous/jump to page)
- Download button for offline access
- Zoom controls
- Teachers can upload multiple PDFs per lesson

---

## 8. Updated Database Schema (Complete)

```sql
-- Core tables
profiles, categories, courses, enrollments, deadlines, weekly_tasks
-- (same as v2 plan, with role column added to profiles)

ALTER TABLE profiles ADD COLUMN role TEXT DEFAULT 'student'
  CHECK (role IN ('student', 'teacher', 'admin'));

-- Lessons within courses
CREATE TABLE lessons (
  id SERIAL PRIMARY KEY,
  course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  lesson_order INTEGER,
  video_url TEXT,           -- Supabase Storage path
  pdf_url TEXT,             -- Supabase Storage path
  duration_minutes INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Video progress tracking
-- (defined in section 6 above)

-- Question bank tables
-- (defined in section 5 above)
```

---

## 9. Updated FastAPI Endpoints

### Auth
| Method | Endpoint | Access |
|--------|----------|--------|
| `POST` | `/api/auth/login` | Public |
| `POST` | `/api/auth/signup` | Public |
| `POST` | `/api/auth/refresh` | Public |
| `GET` | `/api/auth/me` | All authenticated |

### Student
| Method | Endpoint | Access |
|--------|----------|--------|
| `GET` | `/api/stats/{user_id}` | Student, Admin |
| `GET` | `/api/enrollments/{user_id}` | Student, Admin |
| `POST` | `/api/enrollments` | Student |
| `PATCH` | `/api/enrollments/{id}/progress` | Student |
| `GET` | `/api/deadlines/{user_id}` | Student, Admin |
| `GET` | `/api/weekly-tasks/{user_id}` | Student |

### Courses & Content
| Method | Endpoint | Access |
|--------|----------|--------|
| `GET` | `/api/courses` | All authenticated |
| `GET` | `/api/courses/{id}` | All authenticated |
| `POST` | `/api/courses` | Teacher, Admin |
| `PUT` | `/api/courses/{id}` | Teacher (own), Admin |
| `DELETE` | `/api/courses/{id}` | Teacher (own), Admin |
| `GET` | `/api/courses/{id}/lessons` | All authenticated |
| `POST` | `/api/courses/{id}/lessons` | Teacher, Admin |
| `POST` | `/api/upload/video` | Teacher, Admin |
| `POST` | `/api/upload/pdf` | Teacher, Admin |
| `PATCH` | `/api/video-progress` | Student |

### Question Bank
| Method | Endpoint | Access |
|--------|----------|--------|
| `GET` | `/api/questions?course_id=X` | All authenticated |
| `POST` | `/api/questions` | Teacher, Admin |
| `PUT` | `/api/questions/{id}` | Teacher (own), Admin |
| `DELETE` | `/api/questions/{id}` | Teacher (own), Admin |
| `GET` | `/api/quizzes?course_id=X` | All authenticated |
| `POST` | `/api/quizzes` | Teacher, Admin |
| `POST` | `/api/quizzes/{id}/attempt` | Student |
| `GET` | `/api/quizzes/{id}/results` | Student (own), Teacher, Admin |

### Admin
| Method | Endpoint | Access |
|--------|----------|--------|
| `GET` | `/api/admin/users` | Admin |
| `PATCH` | `/api/admin/users/{id}/role` | Admin |
| `PATCH` | `/api/admin/users/{id}/status` | Admin |
| `GET` | `/api/admin/analytics` | Admin |
| `GET` | `/api/admin/courses/pending` | Admin |
| `PATCH` | `/api/admin/courses/{id}/approve` | Admin |

---

## 10. Updated Project Structure

```
al-waha-edu/
├── backend/
│   ├── main.py
│   ├── config.py
│   ├── database.py
│   ├── middleware/
│   │   ├── auth.py              # JWT validation
│   │   └── rate_limit.py        # Rate limiting
│   ├── routers/
│   │   ├── auth.py
│   │   ├── courses.py
│   │   ├── lessons.py
│   │   ├── progress.py
│   │   ├── deadlines.py
│   │   ├── stats.py
│   │   ├── questions.py         # Question bank
│   │   ├── quizzes.py           # Quiz management
│   │   ├── upload.py            # Video/PDF upload
│   │   └── admin.py             # Admin endpoints
│   └── models/
│       ├── user.py
│       ├── course.py
│       ├── lesson.py
│       ├── question.py
│       ├── quiz.py
│       └── ...
│
├── frontend/
│   └── src/
│       ├── app/
│       │   ├── auth/
│       │   │   ├── login/page.jsx
│       │   │   ├── signup/page.jsx
│       │   │   ├── forgot-password/page.jsx
│       │   │   └── reset-password/page.jsx
│       │   ├── dashboard/              # Student pages
│       │   │   ├── layout.jsx
│       │   │   ├── page.jsx
│       │   │   ├── courses/page.jsx
│       │   │   ├── question-bank/page.jsx
│       │   │   ├── tasks/page.jsx
│       │   │   ├── explore/page.jsx
│       │   │   └── course/[id]/page.jsx
│       │   ├── teacher/                # Teacher pages
│       │   │   ├── layout.jsx
│       │   │   ├── page.jsx
│       │   │   ├── courses/page.jsx
│       │   │   ├── courses/new/page.jsx
│       │   │   ├── students/page.jsx
│       │   │   ├── question-bank/page.jsx
│       │   │   ├── content/page.jsx
│       │   │   └── grades/page.jsx
│       │   └── admin/                  # Admin pages
│       │       ├── layout.jsx
│       │       ├── page.jsx
│       │       ├── users/page.jsx
│       │       ├── courses/page.jsx
│       │       ├── categories/page.jsx
│       │       ├── reports/page.jsx
│       │       └── settings/page.jsx
│       ├── components/
│       │   ├── layout/
│       │   ├── stats/
│       │   ├── course/
│       │   ├── deadlines/
│       │   ├── questions/              # Question bank components
│       │   │   ├── QuestionCard.jsx
│       │   │   ├── QuestionForm.jsx
│       │   │   ├── QuizPlayer.jsx
│       │   │   └── QuizResults.jsx
│       │   ├── media/
│       │   │   ├── VideoPlayer.jsx
│       │   │   └── PdfViewer.jsx
│       │   └── ui/
│       └── lib/
│           ├── api.js
│           └── supabase.js
```

---

## 11. Implementation Phases (Updated)

### Phase 1 — Project Setup
- Scaffold Next.js + FastAPI projects
- Configure Tailwind (RTL, dark mode, color palette)
- Set up Supabase project + create all database tables
- Configure Supabase Auth + RLS policies
- Seed mock data

### Phase 2 — Auth Pages
- Login page (email/password + Google OAuth)
- Signup page (with role selection: student/teacher)
- Forgot password + reset password pages
- Next.js middleware for route protection
- FastAPI auth middleware (JWT validation)

### Phase 3 — Student Dashboard
- Dashboard layout (sidebar + topbar + theme toggle)
- Stats cards grid
- Featured course card with progress ring
- Deadlines widget + weekly plan
- Course cards grid with category filter tabs

### Phase 4 — Course Detail + Media
- Course detail page (lesson list, description)
- Video player component (Plyr) with progress tracking
- PDF viewer component (react-pdf) with download
- Teacher: upload video/PDF interface

### Phase 5 — Question Bank
- Student: browse questions, take practice quizzes, view results
- Teacher: create/edit questions (MCQ, true/false, short answer)
- Teacher: build quizzes from question bank
- Quiz player with timer and auto-submit

### Phase 6 — Teacher Dashboard
- Teacher overview (stats, courses, students)
- Course management (create/edit courses + lessons)
- Student progress table
- Assignment/grade management

### Phase 7 — Admin Dashboard
- Platform analytics overview
- User management (search, filter, activate/deactivate)
- Course approval workflow
- Category management
- Site settings

### Phase 8 — Polish
- Framer Motion page transitions and animations
- Responsive design (mobile sidebar collapse)
- Dark mode fine-tuning
- Loading skeletons, empty states, error handling
- Cross-browser testing

---

## 12. Updated Feature List

| # | Feature | Status |
|---|---------|--------|
| 1 | Dark/Light Mode | Included in base build |
| 2 | Question Bank (بنك الأسئلة) | Included in base build |
| 3 | Video Playback with Progress | Included in base build |
| 4 | PDF Viewer with Download | Included in base build |
| 5 | Role-Based Dashboards (3 roles) | Included in base build |
| 6 | Achievement System (نظام الإنجازات) | Future enhancement |
| 7 | Performance Reports (تقارير الأداء) | Future enhancement |
| 8 | Discussion Forum (منتدى النقاش) | Future enhancement |
| 9 | My Notes (ملاحظاتي) | Future enhancement |
| 10 | Smart Notifications (تنبيهات ذكية) | Future enhancement |
| 11 | Learning Calendar (تقويم تعليمي) | Future enhancement |
| 12 | Learning Goals (أهداف التعلم) | Future enhancement |
| 13 | Advanced Search (بحث متقدم) | Future enhancement |

---

## Verification Plan

### Automated
- `npm run build` — Next.js compiles without errors
- `uvicorn main:app` — FastAPI starts without errors
- FastAPI Swagger UI (`/docs`) for API testing
- Supabase dashboard to verify RLS policies

### Manual
- RTL layout correct in Chrome/Edge
- Dark/Light mode toggle works smoothly
- Login/Signup flow works end-to-end
- Role-based redirects work correctly
- Video plays and tracks progress
- PDF renders and downloads
- Question bank CRUD works for teachers
- Quiz taking works for students
- Responsive on mobile/tablet/desktop
