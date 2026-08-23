"use client";

import React, { useState, useEffect } from "react";
import { Clock, AlertCircle, CheckCircle2, ChevronLeft, ChevronRight, HelpCircle } from "lucide-react";
import { toArabicNumerals } from "@/lib/arabicNumbers";

export interface Question {
  id: number;
  question_text: string;
  question_type: "mcq" | "true_false" | "short_answer";
  difficulty: "easy" | "medium" | "hard";
  points: number;
  options?: { id: number; option_text: string; is_correct: boolean }[];
  correct_answer?: string;
  explanation?: string;
}

interface QuizPlayerProps {
  quizTitle: string;
  courseTitle: string;
  timeLimitMinutes?: number;
  questions: Question[];
  onCompleteQuiz: (results: {
    score: number;
    totalPoints: number;
    userAnswers: Record<number, any>;
    timeSpentSeconds: number;
  }) => void;
  onExit: () => void;
}

export default function QuizPlayer({
  quizTitle,
  courseTitle,
  timeLimitMinutes = 15,
  questions,
  onCompleteQuiz,
  onExit,
}: QuizPlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, any>>({});
  const [secondsRemaining, setSecondsRemaining] = useState(timeLimitMinutes * 60);

  const currentQ = questions[currentIndex];

  useEffect(() => {
    if (secondsRemaining <= 0) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsRemaining]);

  const handleSelectOption = (questionId: number, optionId: number | string) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleSubmit = () => {
    let score = 0;
    const totalPoints = questions.reduce((acc, q) => acc + q.points, 0);

    questions.forEach((q) => {
      const selected = userAnswers[q.id];
      if (q.question_type === "mcq") {
        const correctOpt = q.options?.find((o) => o.is_correct);
        if (correctOpt && selected === correctOpt.id) {
          score += q.points;
        }
      } else if (q.question_type === "true_false") {
        const correctOpt = q.options?.find((o) => o.is_correct);
        if (correctOpt && selected === correctOpt.id) {
          score += q.points;
        }
      }
    });

    const timeSpentSeconds = timeLimitMinutes * 60 - secondsRemaining;
    onCompleteQuiz({ score, totalPoints, userAnswers, timeSpentSeconds });
  };

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${toArabicNumerals(mins)}:${toArabicNumerals(rem < 10 ? "0" + rem : rem)}`;
  };

  return (
    <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-6 md:p-8 shadow-md max-w-3xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[var(--border)]">
        <div>
          <span className="text-xs text-[var(--muted)]">{courseTitle}</span>
          <h2 className="text-xl font-bold text-[var(--foreground)]">{quizTitle}</h2>
        </div>

        {/* Timer */}
        <div
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold font-mono ${
            secondsRemaining < 120
              ? "bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 animate-pulse"
              : "bg-[var(--input)] text-[var(--foreground)]"
          }`}
        >
          <Clock className="w-4 h-4 text-brand-500" />
          <span>{formatTimer(secondsRemaining)}</span>
        </div>
      </div>

      {/* Progress index bar */}
      <div className="flex items-center justify-between text-xs text-[var(--muted)]">
        <span>
          السؤال <strong className="text-[var(--foreground)]">{toArabicNumerals(currentIndex + 1)}</strong> من{" "}
          <strong className="text-[var(--foreground)]">{toArabicNumerals(questions.length)}</strong>
        </span>
        <span className="bg-brand-50 dark:bg-brand-900/30 text-brand-500 px-2 py-0.5 rounded font-medium">
          {toArabicNumerals(currentQ.points)} نقاط
        </span>
      </div>

      {/* Question Text Box */}
      <div className="p-5 rounded-2xl bg-[var(--input)] border border-[var(--border)] space-y-2">
        <span className="text-xs font-bold text-brand-500 block">
          {currentQ.question_type === "mcq"
            ? "اختر الإجابة الصحيحة:"
            : currentQ.question_type === "true_false"
            ? "صح أم خطأ:"
            : "سؤال قصير:"}
        </span>
        <h3 className="text-base md:text-lg font-bold text-[var(--foreground)] leading-relaxed">
          {currentQ.question_text}
        </h3>
      </div>

      {/* Options List */}
      <div className="space-y-3">
        {currentQ.options?.map((option) => {
          const isSelected = userAnswers[currentQ.id] === option.id;
          return (
            <button
              key={option.id}
              onClick={() => handleSelectOption(currentQ.id, option.id)}
              className={`w-full text-right p-4 rounded-xl border-2 transition-all flex items-center justify-between ${
                isSelected
                  ? "border-brand-500 bg-brand-50/70 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 font-bold shadow-sm"
                  : "border-[var(--border)] bg-[var(--card)] hover:border-slate-300 text-[var(--foreground)]"
              }`}
            >
              <span className="text-sm md:text-base">{option.option_text}</span>
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 ${
                  isSelected ? "border-brand-500 bg-brand-500 text-white" : "border-[var(--muted)]"
                }`}
              >
                {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
        <button
          onClick={() => setCurrentIndex((idx) => Math.max(0, idx - 1))}
          disabled={currentIndex === 0}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[var(--border)] text-xs font-bold text-[var(--foreground)] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--input)] transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
          <span>السؤال السابق</span>
        </button>

        {currentIndex < questions.length - 1 ? (
          <button
            onClick={() => setCurrentIndex((idx) => Math.min(questions.length - 1, idx + 1))}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold transition-colors"
          >
            <span>السؤال التالي</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white text-xs font-bold shadow-sm transition-colors"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>تسليم الاختبار</span>
          </button>
        )}
      </div>
    </div>
  );
}
