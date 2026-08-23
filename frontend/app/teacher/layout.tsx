"use client";

import React, { useState } from "react";
import Link from "next/navigation";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  HelpCircle,
  UploadCloud,
  FileCheck,
  PlusCircle,
  Menu,
  X,
  Bell,
  GraduationCap,
} from "lucide-react";
import ThemeToggle from "@/components/layout/ThemeToggle";

const teacherNavItems = [
  { name: "لوحة التحكم", href: "/teacher", icon: LayoutDashboard },
  { name: "إدارة الدورات", href: "/teacher/courses", icon: BookOpen },
  { name: "متابعة الطلاب", href: "/teacher/students", icon: Users },
  { name: "بنك الأسئلة", href: "/teacher/question-bank", icon: HelpCircle },
  { name: "رفع المحتوى والملفات", href: "/teacher/content", icon: UploadCloud },
  { name: "التقييمات والواجبات", href: "/teacher/grades", icon: FileCheck },
];

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[var(--background)] text-[var(--foreground)]" dir="rtl">
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
        />
      )}

      {/* Teacher Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-64 bg-[#0F2440] text-white z-50 flex flex-col justify-between transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-6 space-y-6">
          {/* Logo & Brand */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-500 flex items-center justify-center text-white">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-bold text-lg leading-none">الواحة التعليمية</h2>
                <span className="text-[11px] text-blue-300 font-medium">بوابة المعلم</span>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Create CTA */}
          <a
            href="/teacher/courses/new"
            className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-md transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>إنشاء دورة جديدة</span>
          </a>

          {/* Nav list */}
          <nav className="space-y-1 pt-2">
            {teacherNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-white/10 text-white shadow-sm"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </a>
              );
            })}
          </nav>
        </div>

        {/* Bottom profile info */}
        <div className="p-4 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-brand-500 text-white font-bold flex items-center justify-center text-xs">
              س أ
            </div>
            <div className="leading-tight">
              <span className="text-xs font-bold block">م. سارة أحمد</span>
              <span className="text-[10px] text-slate-400">معلم معتمد</span>
            </div>
          </div>

          <a
            href="/dashboard"
            className="text-[10px] text-brand-400 hover:underline"
            title="الانتقال إلى واجهة الطالب"
          >
            واجهة الطالب
          </a>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 lg:mr-64 flex flex-col min-h-screen">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 bg-[var(--card)]/80 backdrop-blur-md border-b border-[var(--border)] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-[var(--foreground)] rounded-lg hover:bg-[var(--input)]"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="text-xs font-semibold text-[var(--muted)]">
              لوحة تحكم المعلم • إدارة المحتوى والطلاب
            </span>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button className="p-2 rounded-lg text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--input)] relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
