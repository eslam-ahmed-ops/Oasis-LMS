"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, BookOpen, Clock, FileText, CheckCircle2 } from "lucide-react";
import { mockCategories } from "@/lib/mockData";

export default function CreateCoursePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState(mockCategories[0].id);
  const [durationHours, setDurationHours] = useState(20);
  const [coverGradient, setCoverGradient] = useState("purple");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/teacher/courses");
    }, 800);
  };

  return (
    <div className="p-6 md:p-8 flex flex-col gap-6 max-w-4xl mx-auto">
      {/* Back button */}
      <Link
        href="/teacher/courses"
        className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-brand-500 font-medium transition-colors"
      >
        <ArrowRight className="w-4 h-4" />
        <span>العودة لإدارة الدورات</span>
      </Link>

      <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-6 md:p-8 shadow-sm space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">إنشاء دورة تعليمية جديدة</h1>
          <p className="text-sm text-[var(--muted)] mt-1">
            أدخل تفاصيل الدورة، التصنيف، ومعلومات المدرب
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Course Title */}
          <div>
            <label className="block text-sm font-bold text-[var(--foreground)] mb-1.5">
              عنوان الدورة التعليمية
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="مثال: مقدمة شاملة في الذكاء الاصطناعي وتطبيقاته"
              required
              className="w-full bg-[var(--input)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--foreground)] outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {/* Category & Duration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-[var(--foreground)] mb-1.5">
                التصنيف الدراسي
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(Number(e.target.value))}
                className="w-full bg-[var(--input)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--foreground)] outline-none focus:ring-2 focus:ring-brand-500"
              >
                {mockCategories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-[var(--foreground)] mb-1.5">
                الساعات التقديرية للدورة
              </label>
              <input
                type="number"
                min={1}
                max={200}
                value={durationHours}
                onChange={(e) => setDurationHours(Number(e.target.value))}
                required
                className="w-full bg-[var(--input)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--foreground)] outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-bold text-[var(--foreground)] mb-1.5">
              وصف الدورة والمخرجات التعليمية
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="اكتب نبذة توضيحية عما سيتعلمه الطالب في هذه الدورة..."
              className="w-full bg-[var(--input)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--foreground)] outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {/* Cover gradient selection */}
          <div>
            <label className="block text-sm font-bold text-[var(--foreground)] mb-2">
              لون بطاقة الدورة (Gradient)
            </label>
            <div className="flex gap-3">
              {[
                { id: "purple", name: "بنفسجي", class: "gradient-purple" },
                { id: "lavender", name: "خزامي", class: "gradient-lavender" },
                { id: "gold", name: "ذهبي", class: "gradient-gold" },
                { id: "blue", name: "أزرق", class: "gradient-blue" },
              ].map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setCoverGradient(g.id)}
                  className={`w-12 h-12 rounded-xl ${g.class} border-2 transition-transform ${
                    coverGradient === g.id ? "border-brand-500 scale-110 shadow-md" : "border-transparent"
                  }`}
                  title={g.name}
                />
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4 border-t border-[var(--border)] flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm shadow transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "جاري الحفظ..." : "حفظ وإنشاء الدورة"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
