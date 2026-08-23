"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShieldAlert,
  LayoutDashboard,
  Users,
  BookOpen,
  FolderTree,
  BarChart3,
  Settings,
  Menu,
  X,
  Bell,
  ShieldCheck,
} from "lucide-react";
import ThemeToggle from "@/components/layout/ThemeToggle";

const adminNavItems = [
  { name: "لوحة التحكم والتحليلات", href: "/admin", icon: LayoutDashboard },
  { name: "إدارة المستخدمين", href: "/admin/users", icon: Users },
  { name: "اعتماد ومراقبة الدورات", href: "/admin/courses", icon: BookOpen },
  { name: "التصنيفات الدراسية", href: "/admin/categories", icon: FolderTree },
  { name: "التقارير والإحصائيات", href: "/admin/reports", icon: BarChart3 },
  { name: "إعدادات المنصة", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
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

      {/* Admin Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-64 bg-[#020617] text-white z-50 flex flex-col justify-between transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-6 space-y-6">
          {/* Logo & Brand */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-lg">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-bold text-lg leading-none">الواحة التعليمية</h2>
                <span className="text-[11px] text-red-400 font-medium">لوحة إدارة النظام</span>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Admin badge banner */}
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2 text-xs text-slate-300">
            <ShieldCheck className="w-4 h-4 text-green-400" />
            <span>صلاحية وصول كاملة (مدير)</span>
          </div>

          {/* Nav list */}
          <nav className="space-y-1">
            {adminNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-red-600/20 text-red-400 border border-red-500/30"
                      : "text-slate-400 hover:text-white hover:bg-slate-900"
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
            <div className="w-9 h-9 rounded-full bg-red-600 text-white font-bold flex items-center justify-center text-xs">
              م
            </div>
            <div className="leading-tight">
              <span className="text-xs font-bold block">المدير العام</span>
              <span className="text-[10px] text-slate-400">مسؤول النظام</span>
            </div>
          </div>

          <div className="flex gap-2">
            <a
              href="/dashboard"
              className="text-[10px] text-slate-400 hover:text-white"
              title="واجهة الطالب"
            >
              الطالب
            </a>
            <span className="text-slate-600">|</span>
            <a
              href="/teacher"
              className="text-[10px] text-slate-400 hover:text-white"
              title="واجهة المعلم"
            >
              المعلم
            </a>
          </div>
        </div>
      </aside>

      {/* Main Content */}
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
              لوحة إدارة النظام • مركز التحكم الموحد
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
