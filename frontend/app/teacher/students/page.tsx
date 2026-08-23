"use client";

import React, { useState } from "react";
import { Users, Search, Award, BookOpen, Clock, CheckCircle2 } from "lucide-react";
import ProgressBar from "@/components/ui/ProgressBar";
import { toArabicNumerals } from "@/lib/arabicNumbers";

const mockStudentsList = [
  { id: 1, name: "أحمد محمد", email: "ahmed@example.com", course: "أساسيات البرمجة بلغة Python", progress: 65, completedLessons: 15, totalLessons: 24, lastActivity: "اليوم" },
  { id: 2, name: "عمر خالد", email: "omar@example.com", course: "أساسيات البرمجة بلغة Python", progress: 85, completedLessons: 20, totalLessons: 24, lastActivity: "منذ ساعتين" },
  { id: 3, name: "ريم العبدالله", email: "reem@example.com", course: "تصميم تجربة المستخدم UX/UI", progress: 40, completedLessons: 7, totalLessons: 18, lastActivity: "أمس" },
  { id: 4, name: "يوسف حسن", email: "yousef@example.com", course: "تطوير تطبيقات الويب", progress: 95, completedLessons: 28, totalLessons: 30, lastActivity: "منذ ٣ أيام" },
  { id: 5, name: "فاطمة النجار", email: "fatima@example.com", course: "تحليل البيانات واتخاذ القرار", progress: 50, completedLessons: 10, totalLessons: 20, lastActivity: "اليوم" },
];

export default function TeacherStudentsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStudents = mockStudentsList.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 md:p-8 flex flex-col gap-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--foreground)]">متابعة أداء الطلاب</h1>
          <p className="text-sm text-[var(--muted)] mt-1">
            راقب تقدم الطلاب في دوراتك وتفاصيل إنجاز الدروس والواجبات
          </p>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث باسم الطالب أو الدورة..."
            className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl pr-10 pl-4 py-2.5 text-sm text-[var(--foreground)] outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="bg-[var(--input)] text-[var(--muted)] text-xs border-b border-[var(--border)]">
              <tr>
                <th className="p-4 font-bold">الطالب</th>
                <th className="p-4 font-bold">الدورة المسجل بها</th>
                <th className="p-4 font-bold">نسبة التقدم</th>
                <th className="p-4 font-bold">الدروس المكتملة</th>
                <th className="p-4 font-bold">آخر نشاط</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-[var(--input)]/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-500 text-white text-xs font-bold flex items-center justify-center">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <span className="font-bold text-[var(--foreground)] block">{student.name}</span>
                        <span className="text-xs text-[var(--muted)]" dir="ltr">{student.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-xs font-medium text-[var(--foreground)]">{student.course}</td>
                  <td className="p-4 w-48">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-bold text-brand-500">
                        <span>{toArabicNumerals(student.progress)}%</span>
                      </div>
                      <ProgressBar percent={student.progress} />
                    </div>
                  </td>
                  <td className="p-4 text-xs text-[var(--muted)]">
                    {toArabicNumerals(student.completedLessons)} من {toArabicNumerals(student.totalLessons)} درس
                  </td>
                  <td className="p-4 text-xs text-[var(--muted)]">{student.lastActivity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
