"use client";

import React, { useState } from "react";
import { UploadCloud, Video, FileText, CheckCircle2, AlertCircle, Plus, BookOpen } from "lucide-react";
import { mockCourses } from "@/lib/mockData";
import { toArabicNumerals } from "@/lib/arabicNumbers";

export default function TeacherContentUploadPage() {
  const [selectedCourseId, setSelectedCourseId] = useState(mockCourses[0].id);
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonDuration, setLessonDuration] = useState(30);
  const [selectedVideoFile, setSelectedVideoFile] = useState<File | null>(null);
  const [selectedPdfFile, setSelectedPdfFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success">("idle");

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lessonTitle) return;

    setUploadStatus("uploading");
    setTimeout(() => {
      setUploadStatus("success");
      setTimeout(() => {
        setLessonTitle("");
        setSelectedVideoFile(null);
        setSelectedPdfFile(null);
        setUploadStatus("idle");
      }, 2500);
    }, 1500);
  };

  return (
    <div className="p-6 md:p-8 flex flex-col gap-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-[var(--foreground)]">رفع المواد والمحتوى التعليمي</h1>
        <p className="text-sm text-[var(--muted)] mt-1">
          أضف دروس فيديو ومذكرات PDF للدورات التابعة لك لتخزينها بأمان في Supabase Storage
        </p>
      </div>

      <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-6 md:p-8 shadow-sm space-y-6">
        {uploadStatus === "success" && (
          <div className="p-4 rounded-xl bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 text-sm flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <span>تم رفع الدرس والملفات المرفقة بنجاح إلى قاعدة البيانات!</span>
          </div>
        )}

        <form onSubmit={handleUpload} className="space-y-6">
          {/* Choose Course */}
          <div>
            <label className="block text-sm font-bold text-[var(--foreground)] mb-1.5">
              اختر الدورة التعليمية
            </label>
            <select
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(Number(e.target.value))}
              className="w-full bg-[var(--input)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--foreground)] outline-none focus:ring-2 focus:ring-brand-500"
            >
              {mockCourses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          {/* Lesson Title & Duration */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-[var(--foreground)] mb-1.5">
                عنوان الدرس الجديد
              </label>
              <input
                type="text"
                value={lessonTitle}
                onChange={(e) => setLessonTitle(e.target.value)}
                placeholder="مثال: التعرف على بيئة العمل وتطبيق أول كود"
                required
                className="w-full bg-[var(--input)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--foreground)] outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-[var(--foreground)] mb-1.5">
                مدة الفيديو (بالدقائق)
              </label>
              <input
                type="number"
                min={1}
                max={300}
                value={lessonDuration}
                onChange={(e) => setLessonDuration(Number(e.target.value))}
                className="w-full bg-[var(--input)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--foreground)] outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          {/* Video Dropzone */}
          <div>
            <label className="block text-sm font-bold text-[var(--foreground)] mb-1.5">
              فيديو الدرس (MP4, WebM - حتى 500 ميغابايت)
            </label>
            <label className="border-2 border-dashed border-[var(--border)] hover:border-brand-500 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer bg-[var(--input)]/50 transition-colors">
              <Video className="w-8 h-8 text-brand-500" />
              <span className="text-sm font-bold text-[var(--foreground)]">
                {selectedVideoFile ? selectedVideoFile.name : "انقر لاختيار ملف الفيديو أو اسحبه هنا"}
              </span>
              <span className="text-xs text-[var(--muted)]">سيتم تشغيله عبر مشغل الفيديو المدمج</span>
              <input
                type="file"
                accept="video/mp4,video/webm"
                className="hidden"
                onChange={(e) => setSelectedVideoFile(e.target.files?.[0] || null)}
              />
            </label>
          </div>

          {/* PDF Dropzone */}
          <div>
            <label className="block text-sm font-bold text-[var(--foreground)] mb-1.5">
              مذكرة الدرس بصيغة PDF (اختياري - حتى 50 ميغابايت)
            </label>
            <label className="border-2 border-dashed border-[var(--border)] hover:border-red-400 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer bg-[var(--input)]/50 transition-colors">
              <FileText className="w-8 h-8 text-red-500" />
              <span className="text-sm font-bold text-[var(--foreground)]">
                {selectedPdfFile ? selectedPdfFile.name : "انقر لاختيار ملف PDF أو اسحبه هنا"}
              </span>
              <span className="text-xs text-[var(--muted)]">سيتيح للطلاب قراءته مباشرة في المتصفح وتحميله</span>
              <input
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(e) => setSelectedPdfFile(e.target.files?.[0] || null)}
              />
            </label>
          </div>

          {/* Submit */}
          <div className="pt-4 border-t border-[var(--border)] flex justify-end">
            <button
              type="submit"
              disabled={uploadStatus === "uploading"}
              className="flex items-center gap-2 px-8 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm shadow transition-colors disabled:opacity-50"
            >
              <UploadCloud className="w-4 h-4" />
              <span>{uploadStatus === "uploading" ? "جاري الرفع والتخزين..." : "رفع ونشر الدرس"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
