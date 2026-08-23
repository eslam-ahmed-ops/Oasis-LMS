"use client";

import React from "react";
import { PlayCircle, CheckCircle2, FileText, Lock, Clock } from "lucide-react";
import { toArabicNumerals } from "@/lib/arabicNumbers";

export interface Lesson {
  id: number;
  title: string;
  duration_minutes: number;
  is_completed?: boolean;
  is_locked?: boolean;
  video_url?: string;
  pdf_url?: string;
  unit_name?: string;
}

interface LessonListProps {
  lessons: Lesson[];
  activeLessonId: number;
  onSelectLesson: (lesson: Lesson) => void;
}

export default function LessonList({ lessons, activeLessonId, onSelectLesson }: LessonListProps) {
  return (
    <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-5 shadow-sm">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--border)]">
        <h3 className="font-bold text-lg text-[var(--foreground)]">محتوى الدورة</h3>
        <span className="text-xs text-[var(--muted)] bg-[var(--input)] px-2.5 py-1 rounded-full">
          {toArabicNumerals(lessons.length)} دروس
        </span>
      </div>

      <div className="space-y-2">
        {lessons.map((lesson, idx) => {
          const isActive = lesson.id === activeLessonId;
          return (
            <button
              key={lesson.id}
              onClick={() => !lesson.is_locked && onSelectLesson(lesson)}
              disabled={lesson.is_locked}
              className={`w-full text-right p-3.5 rounded-xl transition-all flex items-center justify-between gap-3 border ${
                isActive
                  ? "bg-brand-50/80 dark:bg-brand-900/30 border-brand-500 shadow-sm"
                  : lesson.is_locked
                  ? "opacity-50 cursor-not-allowed border-transparent bg-transparent"
                  : "hover:bg-[var(--input)] border-transparent"
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    lesson.is_completed
                      ? "bg-green-100 dark:bg-green-950/40 text-green-600 dark:text-green-400"
                      : isActive
                      ? "bg-brand-500 text-white"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                  }`}
                >
                  {lesson.is_locked ? (
                    <Lock className="w-4 h-4" />
                  ) : lesson.is_completed ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <PlayCircle className="w-4 h-4" />
                  )}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[var(--muted)] font-medium">
                      الدرس {toArabicNumerals(idx + 1)}
                    </span>
                    {lesson.pdf_url && (
                      <span className="text-[10px] bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 px-1.5 py-0.5 rounded">
                        PDF
                      </span>
                    )}
                  </div>
                  <h4
                    className={`text-sm font-semibold truncate ${
                      isActive ? "text-brand-600 dark:text-brand-400" : "text-[var(--foreground)]"
                    }`}
                  >
                    {lesson.title}
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs text-[var(--muted)] flex-shrink-0">
                <Clock className="w-3.5 h-3.5" />
                <span>{toArabicNumerals(lesson.duration_minutes)} دقيقة</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
