"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowRight, BookOpen, Clock, User, Award, HelpCircle, FileText, Play } from "lucide-react";
import VideoPlayer from "@/components/media/VideoPlayer";
import PdfViewer from "@/components/media/PdfViewer";
import LessonList, { Lesson } from "@/components/course/LessonList";
import ProgressBar from "@/components/ui/ProgressBar";
import { mockCourses } from "@/lib/mockData";
import { toArabicNumerals } from "@/lib/arabicNumbers";

const mockCourseLessons: Record<number, Lesson[]> = {
  1: [
    { id: 101, title: "مقدمة في لغة Python وتثبيت البيئة", duration_minutes: 25, is_completed: true },
    { id: 102, title: "المتغيرات وأنواع البيانات الأساسية", duration_minutes: 35, is_completed: true },
    { id: 103, title: "العمليات الحسابية والمنطقية", duration_minutes: 40, is_completed: true, pdf_url: "/docs/python-basics.pdf" },
    { id: 104, title: "الجمل الشرطية والتحكم في التدفق", duration_minutes: 45, is_completed: false },
    { id: 105, title: "الحلقات التكرارية (For & While)", duration_minutes: 50, is_completed: false },
    { id: 106, title: "الدوال (Functions) وتنظيم الكود", duration_minutes: 40, is_completed: false, is_locked: true },
    { id: 107, title: "القوائم والمجموعات والقواميس", duration_minutes: 55, is_completed: false, is_locked: true },
  ],
  2: [
    { id: 201, title: "مقدمة في تجربة المستخدم UX والتصميم التفاعلي", duration_minutes: 30, is_completed: true },
    { id: 202, title: "أبحاث المستخدم وإنشاء الشخصيات (Personas)", duration_minutes: 45, is_completed: true },
    { id: 203, title: "رسم الإطارات السلكية Wireframes", duration_minutes: 50, is_completed: false, pdf_url: "/docs/ux-wireframes.pdf" },
    { id: 204, title: "تصميم النماذج التفاعلية في Figma", duration_minutes: 60, is_completed: false },
  ],
};

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = Number(params?.id) || 1;
  const course = mockCourses.find((c) => c.id === courseId) || mockCourses[0];
  const lessons = mockCourseLessons[course.id] || mockCourseLessons[1];

  const [activeLesson, setActiveLesson] = useState<Lesson>(lessons[0]);
  const [activeTab, setActiveTab] = useState<"video" | "pdf" | "overview">("video");

  const completedCount = lessons.filter((l) => l.is_completed).length;
  const progressPercent = Math.round((completedCount / lessons.length) * 100);

  return (
    <div className="p-6 md:p-8 flex flex-col gap-6 max-w-7xl mx-auto">
      {/* Top breadcrumb & back nav */}
      <div className="flex items-center justify-between">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--muted)] hover:text-brand-500 transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة إلى لوحة التحكم</span>
        </Link>

        <Link
          href="/dashboard/question-bank"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-50 dark:bg-brand-900/20 text-brand-500 hover:bg-brand-100 text-xs font-bold transition-colors"
        >
          <HelpCircle className="w-4 h-4" />
          <span>اختبر نفسك في بنك الأسئلة</span>
        </Link>
      </div>

      {/* Course Header Banner */}
      <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-900/30 text-brand-500">
              {course.category.name}
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-[var(--foreground)]">{course.title}</h1>
            <div className="flex items-center gap-5 text-sm text-[var(--muted)] flex-wrap pt-2">
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                <span>{course.instructor_name}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{toArabicNumerals(course.duration_hours)} ساعة تعليمية</span>
              </div>
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" />
                <span>{toArabicNumerals(lessons.length)} درساً</span>
              </div>
            </div>
          </div>

          {/* Progress widget in banner */}
          <div className="bg-[var(--input)] rounded-xl p-4 min-w-[240px] space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-[var(--foreground)]">نسبة إنجاز الدورة</span>
              <span className="text-brand-500">{toArabicNumerals(progressPercent)}%</span>
            </div>
            <ProgressBar percent={progressPercent} />
            <p className="text-[11px] text-[var(--muted)] text-left" dir="rtl">
              أكملت {toArabicNumerals(completedCount)} من {toArabicNumerals(lessons.length)} دروس
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Layout (Left: Media Player, Right: Lessons) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Media & Details Area */}
        <div className="lg:col-span-8 space-y-6">
          {/* Tabs bar */}
          <div className="flex items-center gap-2 bg-[var(--card)] p-1.5 rounded-xl border border-[var(--border)]">
            <button
              onClick={() => setActiveTab("video")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === "video"
                  ? "bg-brand-500 text-white"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              <Play className="w-4 h-4" />
              <span>فيديو الدرس</span>
            </button>

            <button
              onClick={() => setActiveTab("pdf")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === "pdf"
                  ? "bg-brand-500 text-white"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>المذكرة والمراجع PDF</span>
            </button>

            <button
              onClick={() => setActiveTab("overview")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === "overview"
                  ? "bg-brand-500 text-white"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>وصف الدرس والمهام</span>
            </button>
          </div>

          {/* Active Tab View */}
          {activeTab === "video" && (
            <VideoPlayer
              lessonTitle={activeLesson.title}
              onProgressUpdate={(secs, completed) => {
                if (completed) {
                  activeLesson.is_completed = true;
                }
              }}
            />
          )}

          {activeTab === "pdf" && (
            <PdfViewer
              title={`مذكرة: ${activeLesson.title}`}
              pdfUrl={activeLesson.pdf_url}
              totalPages={12}
            />
          )}

          {activeTab === "overview" && (
            <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-6 space-y-4">
              <h3 className="text-xl font-bold text-[var(--foreground)]">{activeLesson.title}</h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed">
                في هذا الدرس سنغوص في التفاصيل الهامة التي تمكنك من استيعاب التطبيقات العملية والتطبيق خطوة بخطوة. يشتمل هذا الدرس على أمثلة كود تفاعلية وتمارين عملية تهدف إلى قياس الفهم الفوري.
              </p>

              <div className="pt-4 border-t border-[var(--border)]">
                <h4 className="font-bold text-sm text-[var(--foreground)] mb-3">المخرجات التعليمية لهذا الدرس:</h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-[var(--muted)]">
                  <li>فهم البنية الأساسية وكيفية استخدام الأدوات المناسبة.</li>
                  <li>تنفيذ أمثلة تطبيقية وكتابة تعليمات برمجية خالية من الأخطاء.</li>
                  <li>الاستعداد للاختبار التجريبي في بنك الأسئلة المخصص لهذه الوحدة.</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Lessons List */}
        <div className="lg:col-span-4">
          <LessonList
            lessons={lessons}
            activeLessonId={activeLesson.id}
            onSelectLesson={(lesson) => setActiveLesson(lesson)}
          />
        </div>
      </div>
    </div>
  );
}
