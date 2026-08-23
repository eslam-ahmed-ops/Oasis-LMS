# Task List — الواحة التعليمية

## Phase 1: Project Setup
- `[x]` Scaffold Next.js frontend project
- `[x]` Install frontend dependencies (Tailwind, next-themes, framer-motion, lucide-react, etc.)
- `[x]` Configure Tailwind CSS (RTL, dark mode, color palette, Tajawal font)
- `[x]` Create root layout (RTL, lang=ar, theme provider)
- `[x]` Scaffold FastAPI backend project
- `[x]` Create Supabase database schema SQL file (13 tables, RLS policies)
- `[x]` Create mock/seed data with Arabic content
- `[x]` Set up FastAPI config and Supabase client
- `[x]` Create utility files (Arabic numbers, date formatter)
- `[x]` Create API client (`lib/api.ts`) & Supabase client (`lib/supabase.ts`)
- `[x]` Create ThemeProvider component

## Phase 2: Auth Pages
- `[x]` Login page (`/auth/login`)
- `[x]` Signup page with role selector (`/auth/signup`)
- `[x]` Forgot password page (`/auth/forgot-password`)
- `[x]` Auth API routes in FastAPI
- `[x]` Route protection middleware
- `[x]` Role-based security policies

## Phase 3: Student Dashboard
- `[x]` Dashboard layout (Sidebar + TopBar + ThemeToggle)
- `[x]` TopBar (search, avatar, breadcrumb, notifications)
- `[x]` ThemeToggle (Dark/Light mode switch)
- `[x]` StatCard & 2x2 StatsGrid
- `[x]` ProgressRing (SVG circular animated ring)
- `[x]` CurrentCourseCard (featured course with progress)
- `[x]` DeadlinesList widget
- `[x]` WeeklyPlan widget
- `[x]` CategoryTabs filter
- `[x]` CourseCard & CourseList
- `[x]` Main student dashboard page (`/dashboard`)

## Phase 4: Course Detail + Media
- `[x]` Course detail page (`/dashboard/course/[id]`)
- `[x]` Custom VideoPlayer component with progress tracking & speed
- `[x]` Custom PdfViewer component with zoom & download
- `[x]` LessonList component with lock & completion indicators
- `[x]` My Courses page (`/dashboard/courses`)
- `[x]` Explore catalog page (`/dashboard/explore`)
- `[x]` Tasks & assignments page (`/dashboard/tasks`)

## Phase 5: Question Bank (بنك الأسئلة)
- `[x]` Interactive Student Question Bank page (`/dashboard/question-bank`)
- `[x]` Timed QuizPlayer with auto-submission & navigation
- `[x]` QuizResults component with detailed answer breakdown
- `[x]` Question models & database schemas

## Phase 6: Teacher Dashboard
- `[x]` Teacher Layout & Sidebar (`/teacher`)
- `[x]` Teacher Overview & analytics page (`/teacher`)
- `[x]` Teacher Course Management (`/teacher/courses`)
- `[x]` Teacher Create Course form (`/teacher/courses/new`)
- `[x]` Student Progress tracking table (`/teacher/students`)
- `[x]` Media & PDF upload interface (`/teacher/content`)
- `[x]` Teacher Grading & Evaluation system (`/teacher/grades`)
- `[x]` Teacher Question Bank creator (`/teacher/question-bank`)

## Phase 7: Admin Dashboard
- `[x]` Admin Layout with administrative theme (`/admin`)
- `[x]` Admin Overview & system health metrics (`/admin`)
- `[x]` User & Role Management (`/admin/users`)
- `[x]` Course Moderation & Approval workflow (`/admin/courses`)
- `[x]` Category Management (`/admin/categories`)
- `[x]` Analytics & Platform Reports (`/admin/reports`)
- `[x]` Platform Configuration & Maintenance settings (`/admin/settings`)

## Phase 8: Verification & Live Execution
- `[x]` Full TypeScript compilation check (0 errors)
- `[x]` 25 routes built and verified
- `[x]` Live development server active at `http://localhost:3000`
