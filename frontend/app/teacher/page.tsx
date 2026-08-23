"use client";

import React from "react";
import Link from "next/link";
import { Users, BookOpen, Clock, TrendingUp, PlusCircle, CheckCircle2, ArrowLeft } from "lucide-react";
import { mockCourses } from "@/lib/mockData";
import { toArabicNumerals } from "@/lib/arabicNumbers";

const mockTeacherStudents = [
  { id: 1, name: "أحمد محمد", course: "أساسيات البرمجة بلغة Python", progress: 65, lastActive: "منذ ساعتين" },
  { id: 2, name: "عمر خالد", course: "أساسيات البرمجة بلغة Python", progress: 85, lastActive: "منذ ٥ ساعات" },
  { id: 3, name: "ريم العبدالله", course: "أساسيات البرمجة بلغة Python", progress: 40, lastActive: "اليوم" },
  { id: 4, name: "يوسف حسن", course: "تطوير تطبيقات الويب", progress: 95, lastActive: "أمس" },
];

export default function TeacherOverviewPage() {
  return (
    <div className="p-6 md:p-8 flex flex-col gap-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--foreground)]">مرحباً بك، م. سارة أحمد</h1>
          <p className="text-sm text-[var(--muted)] mt-1">
            إليك نظرة شاملة على أداء دوراتك والطلاب المسجلين معك هذا الأسبوع
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/teacher/courses/new"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>إضافة دورة جديدة</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-5 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-[var(--muted)]">إجمالي الطلاب المسجلين</span>
            <h3 className="text-2xl font-bold text-[var(--foreground)]">{toArabicNumerals(248)}</h3>
            <span className="text-[11px] text-green-500 font-bold">▲ +١٤ طالب هذا الأسبوع</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950/40 text-brand-500 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-5 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-[var(--muted)]">الدورات النشطة</span>
            <h3 className="text-2xl font-bold text-[var(--foreground)]">{toArabicNumerals(4)}</h3>
            <span className="text-[11px] text-slate-400">منشورة ومتاحة</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-950/40 text-green-500 flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-5 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-[var(--muted)]">متوسط معدل الإكمال</span>
            <h3 className="text-2xl font-bold text-[var(--foreground)]">٧٢%</h3>
            <span className="text-[11px] text-green-500 font-bold">أداء متميز للطلاب</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-yellow-100 dark:bg-yellow-950/40 text-yellow-500 flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-5 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-[var(--muted)]">الواجبات بانتظار التقييم</span>
            <h3 className="text-2xl font-bold text-[var(--foreground)]">{toArabicNumerals(8)}</h3>
            <span className="text-[11px] text-brand-500 font-bold">يتطلب تدخلك</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-950/40 text-purple-500 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Grid (Active Courses & Recent Activity) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Active Courses (8 cols) */}
        <div className="lg:col-span-8 bg-[var(--card)] rounded-2xl border border-[var(--border)] p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
            <h3 className="font-bold text-lg text-[var(--foreground)]">الدورات التابعة لك</h3>
            <Link
              href="/teacher/courses"
              className="text-xs font-bold text-brand-500 hover:underline flex items-center gap-1"
            >
              <span>عرض الكل</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {mockCourses.slice(0, 3).map((course) => (
              <div
                key={course.id}
                className="p-4 rounded-xl bg-[var(--input)] flex items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <span className="text-xs font-bold text-brand-500">{course.category.name}</span>
                  <h4 className="font-bold text-sm text-[var(--foreground)]">{course.title}</h4>
                  <p className="text-xs text-[var(--muted)]">
                    {toArabicNumerals(course.total_lessons)} درساً • {toArabicNumerals(84)} طالباً مسجلاً
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/teacher/content?course=${course.id}`}
                    className="px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--card)] text-xs font-bold hover:bg-[var(--input)] transition-colors"
                  >
                    إضافة محتوى
                  </Link>
                  <Link
                    href={`/dashboard/course/${course.id}`}
                    className="px-3 py-1.5 rounded-lg bg-brand-500 text-white text-xs font-bold hover:bg-brand-600 transition-colors"
                  >
                    معاينة
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Student Recent Progress (4 cols) */}
        <div className="lg:col-span-4 bg-[var(--card)] rounded-2xl border border-[var(--border)] p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
            <h3 className="font-bold text-base text-[var(--foreground)]">أحدث نشاط الطلاب</h3>
            <Link href="/teacher/students" className="text-xs text-brand-500 font-bold hover:underline">
              الطلاب
            </Link>
          </div>

          <div className="space-y-3">
            {mockTeacherStudents.map((student) => (
              <div key={student.id} className="p-3 rounded-xl bg-[var(--input)] space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[var(--foreground)]">{student.name}</span>
                  <span className="text-brand-500 font-bold">{toArabicNumerals(student.progress)}%</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[var(--muted)]">
                  <span className="truncate max-w-[140px]">{student.course}</span>
                  <span>{student.lastActive}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
