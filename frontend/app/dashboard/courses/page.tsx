"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BookOpen, Search, Filter, Play } from "lucide-react";
import CourseCard from "@/components/course/CourseCard";
import { mockCourses } from "@/lib/mockData";
import { toArabicNumerals } from "@/lib/arabicNumbers";

export default function MyCoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "in_progress" | "completed">("all");

  const filtered = mockCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor_name.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (filterStatus === "in_progress") return course.progress_percent < 100;
    if (filterStatus === "completed") return course.progress_percent === 100;
    return true;
  });

  return (
    <div className="p-6 md:p-8 flex flex-col gap-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--foreground)]">دوراتي التعليمية</h1>
          <p className="text-sm text-[var(--muted)] mt-1">
            تابع تقدمك في الدورات المسجل بها وواصل رحلة التعلم
          </p>
        </div>

        <Link
          href="/dashboard/explore"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-medium text-sm transition-colors self-start md:self-auto"
        >
          <BookOpen className="w-4 h-4" />
          <span>استكشف دورات جديدة</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-4 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث في دوراتك..."
            className="w-full bg-[var(--input)] border border-[var(--border)] rounded-xl pr-10 pl-4 py-2 text-sm text-[var(--foreground)] outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => setFilterStatus("all")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
              filterStatus === "all"
                ? "bg-brand-500 text-white"
                : "bg-[var(--input)] text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            الكل ({toArabicNumerals(mockCourses.length)})
          </button>
          <button
            onClick={() => setFilterStatus("in_progress")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
              filterStatus === "in_progress"
                ? "bg-brand-500 text-white"
                : "bg-[var(--input)] text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            قيد التقدم ({toArabicNumerals(mockCourses.filter((c) => c.progress_percent < 100).length)})
          </button>
          <button
            onClick={() => setFilterStatus("completed")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
              filterStatus === "completed"
                ? "bg-brand-500 text-white"
                : "bg-[var(--input)] text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            مكتملة ({toArabicNumerals(mockCourses.filter((c) => c.progress_percent === 100).length)})
          </button>
        </div>
      </div>

      {/* Courses Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((course) => (
            <Link key={course.id} href={`/dashboard/course/${course.id}`} className="block h-full">
              <CourseCard course={course} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-[var(--card)] rounded-2xl border border-[var(--border)] p-8">
          <BookOpen className="w-12 h-12 text-[var(--muted)] mx-auto mb-3 opacity-50" />
          <h3 className="text-lg font-bold text-[var(--foreground)]">لا توجد دورات مطابقة للبحث</h3>
          <p className="text-sm text-[var(--muted)] mt-1">جرب البحث بكلمات أخرى أو تصفح الدورات المتاحة</p>
        </div>
      )}
    </div>
  );
}
