"use client";

import React, { useState } from "react";
import { FileCheck, Search, CheckCircle2, Clock, Award } from "lucide-react";
import { toArabicNumerals } from "@/lib/arabicNumbers";

const mockSubmissions = [
  { id: 1, studentName: "أحمد محمد", assignment: "تسليم واجب الدوال والقوائم", course: "أساسيات البرمجة بلغة Python", date: "اليوم 02:15 م", status: "pending", score: null },
  { id: 2, studentName: "عمر خالد", assignment: "تسليم واجب الدوال والقوائم", course: "أساسيات البرمجة بلغة Python", date: "أمس 11:30 ص", status: "graded", score: 95 },
  { id: 3, studentName: "ريم العبدالله", assignment: "واجب تحليل تجربة المستخدم", course: "تصميم تجربة المستخدم UX/UI", date: "منذ يومين", status: "graded", score: 88 },
  { id: 4, studentName: "يوسف حسن", assignment: "مشروع الويب الأول", course: "تطوير تطبيقات الويب", date: "اليوم 09:00 ص", status: "pending", score: null },
];

export default function TeacherGradesPage() {
  const [submissions, setSubmissions] = useState(mockSubmissions);
  const [selectedSubmission, setSelectedSubmission] = useState<any | null>(null);
  const [gradeInput, setGradeInput] = useState<number>(90);

  const handleSaveGrade = () => {
    if (!selectedSubmission) return;
    setSubmissions((prev) =>
      prev.map((s) => (s.id === selectedSubmission.id ? { ...s, status: "graded", score: gradeInput } : s))
    );
    setSelectedSubmission(null);
  };

  return (
    <div className="p-6 md:p-8 flex flex-col gap-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-[var(--foreground)]">تقييم الواجبات والتكليفات</h1>
        <p className="text-sm text-[var(--muted)] mt-1">
          راجع حلول الطلاب، قدم التغذية الراجعة، وسجل الدرجات
        </p>
      </div>

      <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="bg-[var(--input)] text-[var(--muted)] text-xs border-b border-[var(--border)]">
              <tr>
                <th className="p-4 font-bold">اسم الطالب</th>
                <th className="p-4 font-bold">الواجب / التكليف</th>
                <th className="p-4 font-bold">الدورة</th>
                <th className="p-4 font-bold">تاريخ التسليم</th>
                <th className="p-4 font-bold">الدرجة</th>
                <th className="p-4 font-bold text-center">الإجراء</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {submissions.map((sub) => (
                <tr key={sub.id} className="hover:bg-[var(--input)]/50 transition-colors">
                  <td className="p-4 font-bold text-[var(--foreground)]">{sub.studentName}</td>
                  <td className="p-4 text-[var(--foreground)]">{sub.assignment}</td>
                  <td className="p-4 text-xs text-[var(--muted)]">{sub.course}</td>
                  <td className="p-4 text-xs text-[var(--muted)]">{sub.date}</td>
                  <td className="p-4">
                    {sub.status === "graded" ? (
                      <span className="text-xs font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/40 px-2.5 py-1 rounded-full">
                        {toArabicNumerals(sub.score!)} / ١٠٠
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-950/40 px-2.5 py-1 rounded-full">
                        بانتظار التقييم
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => {
                        setSelectedSubmission(sub);
                        setGradeInput(sub.score || 90);
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold transition-colors"
                    >
                      {sub.status === "graded" ? "تعديل الدرجة" : "تقييم الآن"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Grading Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-[var(--foreground)]">
              تقييم: {selectedSubmission.studentName}
            </h3>
            <p className="text-xs text-[var(--muted)]">{selectedSubmission.assignment}</p>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-[var(--foreground)]">
                الدرجة المستحقة (من 100)
              </label>
              <input
                type="number"
                min={0}
                max={100}
                value={gradeInput}
                onChange={(e) => setGradeInput(Number(e.target.value))}
                className="w-full bg-[var(--input)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-sm text-[var(--foreground)] outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-4 border-t border-[var(--border)]">
              <button
                onClick={() => setSelectedSubmission(null)}
                className="px-4 py-2 rounded-xl border border-[var(--border)] text-xs font-bold text-[var(--muted)] hover:bg-[var(--input)]"
              >
                إلغاء
              </button>
              <button
                onClick={handleSaveGrade}
                className="px-5 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold shadow"
              >
                حفظ التقييم
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
