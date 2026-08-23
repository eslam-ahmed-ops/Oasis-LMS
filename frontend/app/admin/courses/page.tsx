"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BookOpen, Check, X, Eye, Clock, User, ShieldCheck } from "lucide-react";
import { mockCourses } from "@/lib/mockData";
import { toArabicNumerals } from "@/lib/arabicNumbers";

const mockPendingCourses = [
  {
    id: 101,
    title: "مقدمة في الأمن السيبراني واختبار الاختراق",
    instructor_name: "د. طارق السعيد",
    duration_hours: 32,
    total_lessons: 22,
    category: { name: "البرمجة" },
    submitted_date: "اليوم",
    status: "pending",
  },
  {
    id: 102,
    title: "تصميم واجهات الهواتف الذكية بنظام iOS",
    instructor_name: "م. لمياء عمر",
    duration_hours: 16,
    total_lessons: 14,
    category: { name: "التصميم" },
    submitted_date: "أمس",
    status: "pending",
  },
];

export default function AdminCoursesPage() {
  const [pendingList, setPendingList] = useState(mockPendingCourses);

  const handleApprove = (id: number) => {
    setPendingList((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="p-6 md:p-8 flex flex-col gap-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-[var(--foreground)]">اعتماد ومراجعة الدورات</h1>
        <p className="text-sm text-[var(--muted)] mt-1">
          مراجعة الدورات الجديدة المقدمة من المعلمين واعتماد نشرها على المنصة
        </p>
      </div>

      {/* Pending Approvals */}
      <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-6 shadow-sm space-y-4">
        <h3 className="font-bold text-base text-[var(--foreground)]">
          طلبات الاعتماد المعلقة ({toArabicNumerals(pendingList.length)})
        </h3>

        {pendingList.length > 0 ? (
          <div className="space-y-3">
            {pendingList.map((course) => (
              <div
                key={course.id}
                className="p-4 rounded-xl bg-[var(--input)] border border-[var(--border)] flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <span className="text-xs font-bold text-brand-500">{course.category.name}</span>
                  <h4 className="font-bold text-base text-[var(--foreground)]">{course.title}</h4>
                  <div className="flex items-center gap-4 text-xs text-[var(--muted)]">
                    <span>المدرب: {course.instructor_name}</span>
                    <span>{toArabicNumerals(course.total_lessons)} درساً</span>
                    <span>{toArabicNumerals(course.duration_hours)} ساعة</span>
                    <span>تاريخ التقديم: {course.submitted_date}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleApprove(course.id)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white text-xs font-bold shadow transition-colors"
                  >
                    <Check className="w-4 h-4" />
                    <span>اعتماد ونشر للطلاب</span>
                  </button>
                  <button
                    onClick={() => setPendingList((p) => p.filter((c) => c.id !== course.id))}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-red-200 dark:border-red-800 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 text-xs font-bold transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span>رفض</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-[var(--input)] rounded-xl">
            <ShieldCheck className="w-10 h-10 text-green-500 mx-auto mb-2" />
            <p className="text-sm font-bold text-[var(--foreground)]">تمت مراجعة واعتماد جميع الدورات المعلقة!</p>
          </div>
        )}
      </div>

      {/* Published Courses Overview */}
      <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-6 shadow-sm space-y-4">
        <h3 className="font-bold text-base text-[var(--foreground)]">الدورات المنشورة الحالية</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockCourses.map((c) => (
            <div key={c.id} className="p-4 rounded-xl bg-[var(--input)] space-y-2">
              <span className="text-xs font-bold text-brand-500">{c.category.name}</span>
              <h4 className="font-bold text-sm text-[var(--foreground)] line-clamp-1">{c.title}</h4>
              <p className="text-xs text-[var(--muted)]">{c.instructor_name}</p>
              <div className="pt-2 flex justify-between items-center text-xs">
                <span className="text-green-500 font-bold">منشورة ومتاحة</span>
                <Link href={`/dashboard/course/${c.id}`} className="text-brand-500 font-bold hover:underline">
                  معاينة
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
