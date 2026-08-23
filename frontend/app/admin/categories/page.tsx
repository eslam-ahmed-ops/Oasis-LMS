"use client";

import React, { useState } from "react";
import { FolderTree, Plus, Trash2, Edit2, CheckCircle2 } from "lucide-react";
import { mockCategories } from "@/lib/mockData";
import { toArabicNumerals } from "@/lib/arabicNumbers";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState(mockCategories);
  const [newCatName, setNewCatName] = useState("");
  const [newCatSlug, setNewCatSlug] = useState("");

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName || !newCatSlug) return;
    const newCat = {
      id: Date.now(),
      name: newCatName,
      slug: newCatSlug,
      icon: "folder",
    };
    setCategories([...categories, newCat]);
    setNewCatName("");
    setNewCatSlug("");
  };

  const handleDelete = (id: number) => {
    setCategories(categories.filter((c) => c.id !== id));
  };

  return (
    <div className="p-6 md:p-8 flex flex-col gap-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-[var(--foreground)]">إدارة التصنيفات الدراسية</h1>
        <p className="text-sm text-[var(--muted)] mt-1">
          إضافة وتعديل التصنيفات التي تنظم الدورات على مستوى المنصة
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Add Form (5 cols) */}
        <div className="lg:col-span-5 bg-[var(--card)] rounded-2xl border border-[var(--border)] p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-base text-[var(--foreground)]">إضافة تصنيف جديد</h3>

          <form onSubmit={handleAddCategory} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[var(--foreground)] mb-1">
                اسم التصنيف (بالعربية)
              </label>
              <input
                type="text"
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                placeholder="مثال: الذكاء الاصطناعي"
                required
                className="w-full bg-[var(--input)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-sm text-[var(--foreground)] outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[var(--foreground)] mb-1">
                المعرف الإنجليزي (Slug)
              </label>
              <input
                type="text"
                value={newCatSlug}
                onChange={(e) => setNewCatSlug(e.target.value)}
                placeholder="e.g. artificial-intelligence"
                required
                dir="ltr"
                className="w-full bg-[var(--input)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-sm text-[var(--foreground)] outline-none focus:ring-2 focus:ring-brand-500 text-left"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة التصنيف</span>
            </button>
          </form>
        </div>

        {/* Categories List (7 cols) */}
        <div className="lg:col-span-7 bg-[var(--card)] rounded-2xl border border-[var(--border)] p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-base text-[var(--foreground)]">
            التصنيفات الحالية ({toArabicNumerals(categories.length)})
          </h3>

          <div className="space-y-3">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="p-4 rounded-xl bg-[var(--input)] border border-[var(--border)] flex items-center justify-between gap-4"
              >
                <div>
                  <h4 className="font-bold text-sm text-[var(--foreground)]">{cat.name}</h4>
                  <span className="text-xs text-[var(--muted)] font-mono" dir="ltr">
                    /{cat.slug}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-[var(--card)] transition-colors"
                    title="حذف"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
