"use client";

import React from "react";
import { BarChart3, TrendingUp, Users, BookOpen, Clock, Download } from "lucide-react";
import { toArabicNumerals } from "@/lib/arabicNumbers";

export default function AdminReportsPage() {
  return (
    <div className="p-6 md:p-8 flex flex-col gap-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--foreground)]">التقارير والإحصائيات التحليلية</h1>
          <p className="text-sm text-[var(--muted)] mt-1">
            بيانات تفصيلية حول سلوك الطلاب، معدلات إكمال الدورات، والنمو الشهري
          </p>
        </div>

        <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow transition-colors self-start md:self-auto">
          <Download className="w-4 h-4" />
          <span>تصدير تقرير شامل (CSV)</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-6 shadow-sm space-y-2">
          <span className="text-xs text-[var(--muted)]">ساعات المشاهدة الإجمالية</span>
          <h3 className="text-3xl font-bold text-brand-500">{toArabicNumerals(4820)} ساعة</h3>
          <span className="text-xs text-green-500 font-bold">▲ +١٨% مقارنة بالشهر السابق</span>
        </div>

        <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-6 shadow-sm space-y-2">
          <span className="text-xs text-[var(--muted)]">معدل اجتياز الاختبارات</span>
          <h3 className="text-3xl font-bold text-green-500">٨٤.٦%</h3>
          <span className="text-xs text-green-500 font-bold">▲ +٤.٢% تحسن في الدرجات</span>
        </div>

        <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-6 shadow-sm space-y-2">
          <span className="text-xs text-[var(--muted)]">الدورات الأكثر تفاعلاً</span>
          <h3 className="text-xl font-bold text-[var(--foreground)] truncate">Python & UX/UI</h3>
          <span className="text-xs text-slate-400">تمثل ٦٢% من نشاط الطلاب</span>
        </div>
      </div>

      {/* Top Courses & Engagement Table */}
      <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-6 shadow-sm space-y-4">
        <h3 className="font-bold text-base text-[var(--foreground)]">إحصائيات إقبال الطلاب حسب التخصص</h3>

        <div className="space-y-4">
          {[
            { name: "البرمجة وتطوير البرمجيات", count: 680, percent: 48, color: "bg-indigo-500" },
            { name: "تصميم تجربة المستخدم UX/UI", count: 420, percent: 30, color: "bg-purple-500" },
            { name: "تحليل البيانات والذكاء الاصطناعي", count: 210, percent: 15, color: "bg-yellow-500" },
            { name: "إدارة الأعمال والتقنية", count: 110, percent: 7, color: "bg-blue-500" },
          ].map((item, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-[var(--foreground)]">{item.name}</span>
                <span className="text-[var(--muted)]">
                  {toArabicNumerals(item.count)} طالب ({toArabicNumerals(item.percent)}%)
                </span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-[var(--input)] overflow-hidden">
                <div
                  className={`h-full ${item.color} rounded-full transition-all duration-500`}
                  style={{ width: `${item.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
