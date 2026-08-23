"use client";

import React, { useState } from "react";
import { Settings, Shield, Bell, Globe, Save, CheckCircle2, Lock } from "lucide-react";

export default function AdminSettingsPage() {
  const [siteName, setSiteName] = useState("الواحة التعليمية");
  const [siteDescription, setSiteDescription] = useState("منصة تعليمية عربية رائدة لتعليم مهارات المستقبل");
  const [allowRegistration, setAllowRegistration] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="p-6 md:p-8 flex flex-col gap-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-[var(--foreground)]">إعدادات المنصة والنظام</h1>
        <p className="text-sm text-[var(--muted)] mt-1">
          تخصيص الهوية البصرية، خيارات التسجيل، وضوابط الأمان العامة
        </p>
      </div>

      <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-6 md:p-8 shadow-sm space-y-6">
        {saved && (
          <div className="p-4 rounded-xl bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 text-sm flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <span>تم حفظ الإعدادات بنجاح!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          {/* General Settings */}
          <div className="space-y-4">
            <h3 className="font-bold text-base text-[var(--foreground)] border-b border-[var(--border)] pb-2">
              الإعدادات العامة
            </h3>

            <div>
              <label className="block text-xs font-bold text-[var(--foreground)] mb-1">
                اسم الموقع / المنصة
              </label>
              <input
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="w-full bg-[var(--input)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-sm text-[var(--foreground)] outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[var(--foreground)] mb-1">
                الوصف التعريفي
              </label>
              <input
                type="text"
                value={siteDescription}
                onChange={(e) => setSiteDescription(e.target.value)}
                className="w-full bg-[var(--input)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-sm text-[var(--foreground)] outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          {/* Access & Security Toggles */}
          <div className="space-y-4 pt-2">
            <h3 className="font-bold text-base text-[var(--foreground)] border-b border-[var(--border)] pb-2">
              ضوابط الأمان والتسجيل
            </h3>

            <div className="flex items-center justify-between p-4 rounded-xl bg-[var(--input)]">
              <div>
                <span className="font-bold text-sm text-[var(--foreground)] block">السماح بتسجيل مستخدمين جدد</span>
                <span className="text-xs text-[var(--muted)]">إمكانية إنشاء حسابات جديدة للطلاب والمعلمين عبر صفحة التسجيل</span>
              </div>
              <input
                type="checkbox"
                checked={allowRegistration}
                onChange={(e) => setAllowRegistration(e.target.checked)}
                className="w-5 h-5 accent-brand-500 rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-[var(--input)]">
              <div>
                <span className="font-bold text-sm text-[var(--foreground)] block">وضع الصيانة (Maintenance Mode)</span>
                <span className="text-xs text-[var(--muted)]">إيقاف الوصول للطلاب وعرض صفحة التحديث المؤقت</span>
              </div>
              <input
                type="checkbox"
                checked={maintenanceMode}
                onChange={(e) => setMaintenanceMode(e.target.checked)}
                className="w-5 h-5 accent-brand-500 rounded cursor-pointer"
              />
            </div>
          </div>

          {/* Submit button */}
          <div className="pt-4 border-t border-[var(--border)] flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-8 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm shadow transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>حفظ التغييرات</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
