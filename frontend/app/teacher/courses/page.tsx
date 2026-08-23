"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BookOpen, PlusCircle, Edit3, Trash2, Eye, Users, Clock } from "lucide-react";
import { mockCourses } from "@/lib/mockData";
import { toArabicNumerals } from "@/lib/arabicNumbers";

export default function TeacherCoursesPage() {
  const [courses, setCourses] = useState(mockCourses);

  const handleDelete = (id: number) => {
    if (confirm("هل أنت متأكد من رغبتك في حذف هذه الدورة؟")) {
      setCourses(courses.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="p-6 md:p-8 flex flex-col gap-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--foreground)]">إدارة الدورات التدريبية</h1>
          <p className="text-sm text-[var(--muted)] mt-1">
            أدر محتوى دوراتك، أضف دروساً جديدة، وعدّل التفاصيل
          </p>
        </div>

        <Link
          href="/teacher/courses/new"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow transition-all self-start md:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>إضافة دورة جديدة</span>
        </Link>
      </div>

      {/* Courses Table / Cards */}
      <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="bg-[var(--input)] text-[var(--muted)] text-xs border-b border-[var(--border)]">
              <tr>
                <th className="p-4 font-bold">اسم الدورة</th>
                <th className="p-4 font-bold">التصنيف</th>
                <th className="p-4 font-bold">عدد الدروس</th>
                <th className="p-4 font-bold">المدة</th>
                <th className="p-4 font-bold">الحالة</th>
                <th className="p-4 font-bold text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {courses.map((course) => (
                <tr key={course.id} className="hover:bg-[var(--input)]/50 transition-colors">
                  <td className="p-4 font-bold text-[var(--foreground)]">{course.title}</td>
                  <td className="p-4">
                    <span className="bg-brand-50 dark:bg-brand-900/30 text-brand-500 text-xs px-2.5 py-1 rounded-full font-semibold">
                      {course.category.name}
                    </span>
                  </td>
                  <td className="p-4 text-[var(--muted)]">{toArabicNumerals(course.total_lessons)} درساً</td>
                  <td className="p-4 text-[var(--muted)]">{toArabicNumerals(course.duration_hours)} ساعة</td>
                  <td className="p-4">
                    <span className="bg-green-100 dark:bg-green-950/40 text-green-600 dark:text-green-400 text-xs px-2.5 py-1 rounded-full font-bold">
                      منشورة
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        href={`/dashboard/course/${course.id}`}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-brand-500 hover:bg-[var(--input)] transition-colors"
                        title="معاينة"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/teacher/content?course=${course.id}`}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-green-500 hover:bg-[var(--input)] transition-colors"
                        title="إدارة المحتوى"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(course.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-red-500 hover:bg-[var(--input)] transition-colors"
                        title="حذف"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
