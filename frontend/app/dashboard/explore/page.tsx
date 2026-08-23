"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Sparkles, Filter, Star, Clock, BookOpen, User } from "lucide-react";
import { mockCourses, mockCategories } from "@/lib/mockData";
import { toArabicNumerals } from "@/lib/arabicNumbers";

export default function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = mockCourses.filter((course) => {
    const matchesCategory = selectedCategory === "all" || course.category.slug === selectedCategory;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor_name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="p-6 md:p-8 flex flex-col gap-6 max-w-7xl mx-auto">
      {/* Hero explore banner */}
      <div className="gradient-navy rounded-2xl p-8 text-white relative overflow-hidden shadow-lg">
        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            <span>استكشف الدورات المميزة</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-bold">تعلم مهارات المستقبل باللغة العربية</h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            تصفح مكتبة الدورات الاحترافية في البرمجة، التصميم، تحليل البيانات وإدارة الأعمال مع نخبة من الخبراء.
          </p>
        </div>
      </div>

      {/* Category Pills & Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              selectedCategory === "all"
                ? "bg-brand-500 text-white shadow-sm"
                : "bg-[var(--card)] border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            جميع التصنيفات
          </button>
          {mockCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat.slug
                  ? "bg-brand-500 text-white shadow-sm"
                  : "bg-[var(--card)] border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث عن دورة أو تخصص..."
            className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl pr-10 pl-4 py-2 text-sm text-[var(--foreground)] outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>
      </div>

      {/* Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="bg-[var(--card)] rounded-2xl border border-[var(--border)] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className={`h-36 p-4 gradient-${course.cover_gradient} flex items-end justify-between`}>
                <span className="bg-white/90 dark:bg-slate-900/90 text-xs font-bold px-3 py-1 rounded-full text-[var(--foreground)] shadow">
                  {course.category.name}
                </span>
                <span className="bg-black/30 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  <span>٤.٩</span>
                </span>
              </div>

              <div className="p-5 space-y-3">
                <h3 className="font-bold text-lg text-[var(--foreground)] leading-snug">{course.title}</h3>
                <div className="flex items-center gap-4 text-xs text-[var(--muted)]">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5" />
                    {course.instructor_name}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {toArabicNumerals(course.duration_hours)} ساعة
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    {toArabicNumerals(course.total_lessons)} درساً
                  </span>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-[var(--border)] mt-4">
              <div className="flex items-center justify-between pt-4">
                <span className="text-xs font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/40 px-2.5 py-1 rounded-lg">
                  متاح مجاناً
                </span>
                <Link
                  href={`/dashboard/course/${course.id}`}
                  className="px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold transition-colors"
                >
                  بدء التعلم الآن
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
