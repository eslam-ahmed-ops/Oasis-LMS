"use client";

import React, { useState } from "react";
import { PlusCircle, HelpCircle, Trash2, CheckCircle2, BookOpen } from "lucide-react";
import { mockCourses } from "@/lib/mockData";
import { toArabicNumerals } from "@/lib/arabicNumbers";

interface QuestionOption {
  id: number;
  text: string;
  isCorrect: boolean;
}

export default function TeacherQuestionBankPage() {
  const [selectedCourseId, setSelectedCourseId] = useState(mockCourses[0].id);
  const [questionText, setQuestionText] = useState("");
  const [questionType, setQuestionType] = useState<"mcq" | "true_false">("mcq");
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("medium");
  const [points, setPoints] = useState(2);
  const [options, setOptions] = useState<QuestionOption[]>([
    { id: 1, text: "", isCorrect: true },
    { id: 2, text: "", isCorrect: false },
    { id: 3, text: "", isCorrect: false },
    { id: 4, text: "", isCorrect: false },
  ]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleOptionTextChange = (id: number, text: string) => {
    setOptions((prev) => prev.map((o) => (o.id === id ? { ...o, text } : o)));
  };

  const handleSetCorrectOption = (id: number) => {
    setOptions((prev) => prev.map((o) => ({ ...o, isCorrect: o.id === id })));
  };

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText) return;

    setShowSuccess(true);
    setTimeout(() => {
      setQuestionText("");
      setOptions([
        { id: 1, text: "", isCorrect: true },
        { id: 2, text: "", isCorrect: false },
        { id: 3, text: "", isCorrect: false },
        { id: 4, text: "", isCorrect: false },
      ]);
      setShowSuccess(false);
    }, 2000);
  };

  return (
    <div className="p-6 md:p-8 flex flex-col gap-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-[var(--foreground)]">إدارة بنك الأسئلة</h1>
        <p className="text-sm text-[var(--muted)] mt-1">
          أضف أسئلة جديدة إلى بنك الأسئلة الموحد لبناء اختبارات وتقييمات تلقائية
        </p>
      </div>

      <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-6 md:p-8 shadow-sm space-y-6">
        {showSuccess && (
          <div className="p-4 rounded-xl bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 text-sm flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <span>تمت إضافة السؤال بنجاح إلى بنك الأسئلة!</span>
          </div>
        )}

        <form onSubmit={handleAddQuestion} className="space-y-5">
          {/* Choose Course */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-[var(--foreground)] mb-1.5">
                الدورة التعليمية
              </label>
              <select
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(Number(e.target.value))}
                className="w-full bg-[var(--input)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-sm text-[var(--foreground)] outline-none focus:ring-2 focus:ring-brand-500"
              >
                {mockCourses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-[var(--foreground)] mb-1.5">
                مستوى الصعوبة
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as any)}
                className="w-full bg-[var(--input)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-sm text-[var(--foreground)] outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="easy">سهل</option>
                <option value="medium">متوسط</option>
                <option value="hard">متقدم</option>
              </select>
            </div>
          </div>

          {/* Question text */}
          <div>
            <label className="block text-sm font-bold text-[var(--foreground)] mb-1.5">
              نص السؤال
            </label>
            <textarea
              rows={3}
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="اكتب نص السؤال هنا بدقة ووضوح..."
              required
              className="w-full bg-[var(--input)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--foreground)] outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {/* Points & Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-[var(--foreground)] mb-1.5">
                نوع السؤال
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setQuestionType("mcq")}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition-colors ${
                    questionType === "mcq"
                      ? "bg-brand-500 text-white border-brand-500"
                      : "bg-[var(--input)] border-[var(--border)] text-[var(--muted)]"
                  }`}
                >
                  اختيار من متعدد
                </button>
                <button
                  type="button"
                  onClick={() => setQuestionType("true_false")}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition-colors ${
                    questionType === "true_false"
                      ? "bg-brand-500 text-white border-brand-500"
                      : "bg-[var(--input)] border-[var(--border)] text-[var(--muted)]"
                  }`}
                >
                  صح أم خطأ
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-[var(--foreground)] mb-1.5">
                الدرجة / النقاط
              </label>
              <input
                type="number"
                min={1}
                max={20}
                value={points}
                onChange={(e) => setPoints(Number(e.target.value))}
                className="w-full bg-[var(--input)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-sm text-[var(--foreground)] outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          {/* Options Builder */}
          {questionType === "mcq" ? (
            <div className="space-y-3 pt-2">
              <label className="block text-sm font-bold text-[var(--foreground)]">
                الخيارات (حدد الخيار الصحيح عبر الزر الدائري):
              </label>
              {options.map((opt, idx) => (
                <div key={opt.id} className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleSetCorrectOption(opt.id)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      opt.isCorrect
                        ? "border-brand-500 bg-brand-500 text-white"
                        : "border-[var(--muted)] hover:border-brand-500"
                    }`}
                    title="تحديد كإجابة صحيحة"
                  >
                    {opt.isCorrect && <div className="w-2 h-2 rounded-full bg-white" />}
                  </button>

                  <input
                    type="text"
                    value={opt.text}
                    onChange={(e) => handleOptionTextChange(opt.id, e.target.value)}
                    placeholder={`الخيار ${toArabicNumerals(idx + 1)}`}
                    required
                    className="flex-1 bg-[var(--input)] border border-[var(--border)] rounded-xl px-4 py-2 text-sm text-[var(--foreground)] outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2 pt-2">
              <label className="block text-sm font-bold text-[var(--foreground)]">
                حدد الإجابة الصحيحة:
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="tf"
                    defaultChecked
                    className="accent-brand-500 w-4 h-4"
                  />
                  <span className="text-sm font-bold text-[var(--foreground)]">صح</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="tf" className="accent-brand-500 w-4 h-4" />
                  <span className="text-sm font-bold text-[var(--foreground)]">خطأ</span>
                </label>
              </div>
            </div>
          )}

          {/* Submit button */}
          <div className="pt-4 border-t border-[var(--border)] flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-8 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm shadow transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span>إضافة السؤال إلى البنك</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
