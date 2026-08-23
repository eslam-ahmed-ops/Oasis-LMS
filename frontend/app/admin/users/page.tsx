"use client";

import React, { useState } from "react";
import { Users, Search, Shield, UserCheck, UserX, Filter } from "lucide-react";
import { toArabicNumerals } from "@/lib/arabicNumbers";

const mockAdminUsers = [
  { id: "u-1", name: "أحمد محمد", email: "ahmed@example.com", role: "student", status: "active", joinedDate: "١٢ يناير ٢٠٢٥" },
  { id: "u-2", name: "م. سارة أحمد", email: "sara@example.com", role: "teacher", status: "active", joinedDate: "٠٥ فبراير ٢٠٢٥" },
  { id: "u-3", name: "عمر خالد", email: "omar@example.com", role: "student", status: "active", joinedDate: "١٨ مارس ٢٠٢٥" },
  { id: "u-4", name: "د. خالد منصور", email: "khaled@example.com", role: "teacher", status: "active", joinedDate: "١٠ نوفمبر ٢٠٢٤" },
  { id: "u-5", name: "المدير العام", email: "admin@al-waha.edu", role: "admin", status: "active", joinedDate: "٠١ يناير ٢٠٢٤" },
  { id: "u-6", name: "طارق سليم", email: "tariq@example.com", role: "student", status: "suspended", joinedDate: "٠٢ أبريل ٢٠٢٥" },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState(mockAdminUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");

  const toggleUserStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: u.status === "active" ? "suspended" : "active" } : u
      )
    );
  };

  const changeUserRole = (id: string, newRole: string) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role: newRole } : u)));
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="p-6 md:p-8 flex flex-col gap-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--foreground)]">إدارة المستخدمين والأدوار</h1>
          <p className="text-sm text-[var(--muted)] mt-1">
            التحكم في حسابات الطلاب، المعلمين، وصلاحيات الإدارة في النظام
          </p>
        </div>

        <div className="flex gap-3">
          <div className="relative w-full md:w-64">
            <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="بحث بالاسم أو البريد..."
              className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl pr-10 pl-4 py-2 text-sm text-[var(--foreground)] outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-2 text-xs font-bold text-[var(--foreground)] outline-none"
          >
            <option value="all">جميع الأدوار</option>
            <option value="student">طالب</option>
            <option value="teacher">معلم</option>
            <option value="admin">مدير</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="bg-[var(--input)] text-[var(--muted)] text-xs border-b border-[var(--border)]">
              <tr>
                <th className="p-4 font-bold">المستخدم</th>
                <th className="p-4 font-bold">البريد الإلكتروني</th>
                <th className="p-4 font-bold">الدور والصلاحية</th>
                <th className="p-4 font-bold">الحالة</th>
                <th className="p-4 font-bold">تاريخ الانضمام</th>
                <th className="p-4 font-bold text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-[var(--input)]/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-full font-bold text-xs flex items-center justify-center ${
                          user.role === "admin"
                            ? "bg-red-600 text-white"
                            : user.role === "teacher"
                            ? "bg-purple-600 text-white"
                            : "bg-brand-500 text-white"
                        }`}
                      >
                        {user.name.charAt(0)}
                      </div>
                      <span className="font-bold text-[var(--foreground)]">{user.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-xs text-[var(--muted)]" dir="ltr">
                    {user.email}
                  </td>
                  <td className="p-4">
                    <select
                      value={user.role}
                      onChange={(e) => changeUserRole(user.id, e.target.value)}
                      className="bg-[var(--input)] border border-[var(--border)] rounded-lg px-2.5 py-1 text-xs font-bold text-[var(--foreground)] outline-none"
                    >
                      <option value="student">طالب</option>
                      <option value="teacher">معلم</option>
                      <option value="admin">مدير</option>
                    </select>
                  </td>
                  <td className="p-4">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                        user.status === "active"
                          ? "bg-green-100 dark:bg-green-950/40 text-green-600 dark:text-green-400"
                          : "bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400"
                      }`}
                    >
                      {user.status === "active" ? "نشط" : "موقوف"}
                    </span>
                  </td>
                  <td className="p-4 text-xs text-[var(--muted)]">{user.joinedDate}</td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => toggleUserStatus(user.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                        user.status === "active"
                          ? "border border-red-200 dark:border-red-800 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40"
                          : "border border-green-200 dark:border-green-800 text-green-500 hover:bg-green-50 dark:hover:bg-green-950/40"
                      }`}
                    >
                      {user.status === "active" ? "إيقاف الحساب" : "تفعيل الحساب"}
                    </button>
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
