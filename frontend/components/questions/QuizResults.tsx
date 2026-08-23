"use client";

import React from "react";
import { Award, CheckCircle2, XCircle, RotateCcw, ArrowRight, Clock } from "lucide-react";
import { toArabicNumerals } from "@/lib/arabicNumbers";
import { Question } from "./QuizPlayer";

interface QuizResultsProps {
  quizTitle: string;
  courseTitle: string;
  score: number;
  totalPoints: number;
  timeSpentSeconds: number;
  questions: Question[];
  userAnswers: Record<number, any>;
  onRetry: () => void;
  onExit: () => void;
}

export default function QuizResults({
  quizTitle,
  courseTitle,
  score,
  totalPoints,
  timeSpentSeconds,
  questions,
  userAnswers,
  onRetry,
  onExit,
}: QuizResultsProps) {
  const percentage = Math.round((score / (totalPoints || 1)) * 100);
  const isPassed = percentage >= 60;

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${toArabicNumerals(mins)} دقيقة و ${toArabicNumerals(rem)} ثانية`;
  };

  return (
    <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-6 md:p-8 shadow-md max-w-3xl mx-auto space-y-8">
      {/* Result Hero Header */}
      <div className="text-center space-y-3 pb-6 border-b border-[var(--border)]">
        <div
          className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center ${
            isPassed ? "bg-green-100 dark:bg-green-950/40 text-green-500" : "bg-red-100 dark:bg-red-950/40 text-red-500"
          }`}
        >
          {isPassed ? <Award className="w-10 h-10" /> : <XCircle className="w-10 h-10" />}
        </div>

        <h2 className="text-2xl font-bold text-[var(--foreground)]">
          {isPassed ? "أحسنت! لقد اجتزت الاختبار بنجاح" : "حاول مرة أخرى لتحسين نتيجتك"}
        </h2>
        <p className="text-sm text-[var(--muted)]">{quizTitle} • {courseTitle}</p>

        {/* Score Pill */}
        <div className="flex items-center justify-center gap-6 pt-2">
          <div className="text-center">
            <span className="text-xs text-[var(--muted)] block">الدرجة النهائية</span>
            <span className="text-2xl font-black text-brand-500">
              {toArabicNumerals(score)} / {toArabicNumerals(totalPoints)}
            </span>
          </div>
          <div className="h-8 w-px bg-[var(--border)]" />
          <div className="text-center">
            <span className="text-xs text-[var(--muted)] block">النسبة المئوية</span>
            <span className={`text-2xl font-black ${isPassed ? "text-green-500" : "text-red-500"}`}>
              {toArabicNumerals(percentage)}%
            </span>
          </div>
          <div className="h-8 w-px bg-[var(--border)]" />
          <div className="text-center">
            <span className="text-xs text-[var(--muted)] block">الوقت المستغرق</span>
            <span className="text-sm font-bold text-[var(--foreground)] mt-1 block">
              {formatTime(timeSpentSeconds)}
            </span>
          </div>
        </div>
      </div>

      {/* Questions Review Breakdown */}
      <div className="space-y-4">
        <h3 className="font-bold text-base text-[var(--foreground)]">مراجعة الإجابات:</h3>

        <div className="space-y-4">
          {questions.map((q, idx) => {
            const selectedOptId = userAnswers[q.id];
            const correctOpt = q.options?.find((o) => o.is_correct);
            const isCorrect = selectedOptId === correctOpt?.id;

            return (
              <div
                key={q.id}
                className={`p-4 rounded-xl border ${
                  isCorrect
                    ? "bg-green-50/40 dark:bg-green-950/20 border-green-200 dark:border-green-800"
                    : "bg-red-50/40 dark:bg-red-950/20 border-red-200 dark:border-red-800"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    )}
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[var(--muted)]">
                        السؤال {toArabicNumerals(idx + 1)} ({toArabicNumerals(q.points)} نقاط)
                      </span>
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded ${
                          isCorrect ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300" : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                        }`}
                      >
                        {isCorrect ? "إجابة صحيحة" : "إجابة خاطئة"}
                      </span>
                    </div>

                    <p className="text-sm font-bold text-[var(--foreground)]">{q.question_text}</p>

                    {/* Show selected & correct answers */}
                    <div className="text-xs space-y-1 pt-1">
                      {q.options?.map((opt) => (
                        <div
                          key={opt.id}
                          className={`p-2 rounded-lg flex items-center justify-between ${
                            opt.is_correct
                              ? "bg-green-100/70 dark:bg-green-900/40 text-green-800 dark:text-green-300 font-bold"
                              : opt.id === selectedOptId
                              ? "bg-red-100/70 dark:bg-red-900/40 text-red-800 dark:text-red-300 line-through"
                              : "text-[var(--muted)]"
                          }`}
                        >
                          <span>{opt.option_text}</span>
                          {opt.is_correct && <span className="text-[10px] font-bold">الإجابة النموذجية</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--border)] text-xs font-bold text-[var(--foreground)] hover:bg-[var(--input)] transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>إعادة المحاولة</span>
        </button>

        <button
          onClick={onExit}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold transition-colors"
        >
          <span>العودة إلى بنك الأسئلة</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
