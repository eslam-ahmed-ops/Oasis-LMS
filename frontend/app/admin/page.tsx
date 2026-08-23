"use client";

import React from "react";
import Link from "next/link";
import {
  Users,
  BookOpen,
  TrendingUp,
  ShieldCheck,
  Server,
  Activity,
  AlertTriangle,
  ArrowLeft,
} from "lucide-react";
import { toArabicNumerals } from "@/lib/arabicNumbers";

export default function AdminOverviewPage() {
  return (
    <div className="p-6 md:p-8 flex flex-col gap-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--foreground)]">لوحة الإدارة والتحليلات العامة</h1>
          <p className="text-sm text-[var(--muted)] mt-1">
            مؤشرات الأداء اللحظية، نشاط المستخدمين، واستقرار الخوادم
          </p>
        </div>

        <div className="flex items-center gap-2 bg-green-50 dark:bg-green-950/40 text-green-600 dark:text-green-400 px-3.5 py-1.5 rounded-full text-xs font-bold self-start md:self-auto">
          <Activity className="w-4 h-4 animate-pulse" />
          <span>النظام يعمل بكفاءة ٩٩.٩%</span>
        </div>
      </div>

      {/* Main KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[var(--muted)]">إجمالي المسجلين</span>
            <div className="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-950/40 text-brand-500 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-[var(--foreground)]">{toArabicNumerals(1420)}</h3>
          <span className="text-[11px] text-green-500 font-bold block">▲ +٤٥ مستخدم اليوم</span>
        </div>

        <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[var(--muted)]">إجمالي الدورات</span>
            <div className="w-9 h-9 rounded-lg bg-purple-100 dark:bg-purple-950/40 text-purple-500 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-[var(--foreground)]">{toArabicNumerals(42)}</h3>
          <span className="text-[11px] text-brand-500 font-bold block">٣ دورات بانتظار الاعتماد</span>
        </div>

        <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[var(--muted)]">الجلسات النشطة الآن</span>
            <div className="w-9 h-9 rounded-lg bg-green-100 dark:bg-green-950/40 text-green-500 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-[var(--foreground)]">{toArabicNumerals(186)}</h3>
          <span className="text-[11px] text-slate-400 block">طلاب ومعلمون متصلون</span>
        </div>

        <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[var(--muted)]">أمان ومطابقة RLS</span>
            <div className="w-9 h-9 rounded-lg bg-red-100 dark:bg-red-950/40 text-red-500 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-green-500">مفعل ١٠٠%</h3>
          <span className="text-[11px] text-slate-400 block">قواعد Supabase آمنة</span>
        </div>
      </div>

      {/* Row 2: Pending Approvals & Recent Audit Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Pending Courses Approval */}
        <div className="lg:col-span-7 bg-[var(--card)] rounded-2xl border border-[var(--border)] p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
            <h3 className="font-bold text-base text-[var(--foreground)]">دورات جديدة بانتظار الاعتماد</h3>
            <Link href="/admin/courses" className="text-xs text-brand-500 font-bold hover:underline flex items-center gap-1">
              <span>إدارة الاعتمادات</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {[
              { id: 101, title: "مقدمة في الأمن السيبراني واختبار الاختراق", instructor: "د. طارق السعيد", category: "البرمجة", date: "اليوم" },
              { id: 102, title: "تصميم واجهات الهواتف الذكية بنظام iOS", instructor: "م. لمياء عمر", category: "التصميم", date: "أمس" },
            ].map((item) => (
              <div key={item.id} className="p-4 rounded-xl bg-[var(--input)] flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-brand-500">{item.category}</span>
                  <h4 className="font-bold text-sm text-[var(--foreground)]">{item.title}</h4>
                  <p className="text-xs text-[var(--muted)]">المدرب: {item.instructor} • تم الإرسال {item.date}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 rounded-lg bg-green-600 hover:bg-green-700 text-white text-xs font-bold transition-colors">
                    اعتماد ونشر
                  </button>
                  <button className="px-3 py-1.5 rounded-lg border border-[var(--border)] text-xs font-bold hover:bg-[var(--input)] text-[var(--muted)]">
                    مراجعة
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Server Health / Audit */}
        <div className="lg:col-span-5 bg-[var(--card)] rounded-2xl border border-[var(--border)] p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
            <h3 className="font-bold text-base text-[var(--foreground)]">حالة الخدمات التقنية</h3>
            <span className="text-xs text-green-500 font-bold">كل الأنظمة تعمل</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-[var(--input)] flex items-center justify-between">
              <span className="font-bold text-[var(--foreground)]">Next.js Frontend Engine</span>
              <span className="text-green-500 font-bold">متصل (Port 3000)</span>
            </div>
            <div className="p-3 rounded-xl bg-[var(--input)] flex items-center justify-between">
              <span className="font-bold text-[var(--foreground)]">FastAPI Python Backend</span>
              <span className="text-green-500 font-bold">متصل (Port 8000)</span>
            </div>
            <div className="p-3 rounded-xl bg-[var(--input)] flex items-center justify-between">
              <span className="font-bold text-[var(--foreground)]">Supabase Auth & Storage</span>
              <span className="text-green-500 font-bold">مستقر وسريع</span>
            </div>
            <div className="p-3 rounded-xl bg-[var(--input)] flex items-center justify-between">
              <span className="font-bold text-[var(--foreground)]">PostgreSQL Database</span>
              <span className="text-green-500 font-bold">زمن الاستجابة ١٤ms</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
