"use client";

import React, { useState } from "react";
import { HelpCircle, BookOpen, Award, CheckCircle, Clock, Play, Sparkles } from "lucide-react";
import QuizPlayer, { Question } from "@/components/questions/QuizPlayer";
import QuizResults from "@/components/questions/QuizResults";
import { mockCourses } from "@/lib/mockData";
import { toArabicNumerals } from "@/lib/arabicNumbers";

const mockBankQuestions: Record<number, Question[]> = {
  1: [
    {
      id: 1,
      question_text: "ما هو نوع البيانات المستخدم لتخزين النصوص في Python؟",
      question_type: "mcq",
      difficulty: "easy",
      points: 2,
      options: [
        { id: 11, option_text: "int", is_correct: false },
        { id: 12, option_text: "str", is_correct: true },
        { id: 13, option_text: "float", is_correct: false },
        { id: 14, option_text: "bool", is_correct: false },
      ],
    },
    {
      id: 2,
      question_text: "تعتبر Python لغة برمجة مفسرة وليست مترجمة.",
      question_type: "true_false",
      difficulty: "easy",
      points: 2,
      options: [
        { id: 21, option_text: "صح", is_correct: true },
        { id: 22, option_text: "خطأ", is_correct: false },
      ],
    },
    {
      id: 3,
      question_text: "أي من الكلمات المفتاحية التالية تستخدم لإنشاء دالة جديدة في Python؟",
      question_type: "mcq",
      difficulty: "medium",
      points: 3,
      options: [
        { id: 31, option_text: "function", is_correct: false },
        { id: 32, option_text: "def", is_correct: true },
        { id: 33, option_text: "func", is_correct: false },
        { id: 34, option_text: "lambda_fun", is_correct: false },
      ],
    },
    {
      id: 4,
      question_text: "ما هو ناتج تنفيذ: len(['a', 'b', 'c'])؟",
      question_type: "mcq",
      difficulty: "easy",
      points: 3,
      options: [
        { id: 41, option_text: "2", is_correct: false },
        { id: 42, option_text: "3", is_correct: true },
        { id: 43, option_text: "4", is_correct: false },
      ],
    },
  ],
  2: [
    {
      id: 101,
      question_text: "ما هو الهدف الرئيسي من بناء شخصيات المستخدم (Personas)؟",
      question_type: "mcq",
      difficulty: "medium",
      points: 2,
      options: [
        { id: 1011, option_text: "تحديد الألوان والخطوط", is_correct: false },
        { id: 1012, option_text: "تمثيل الفئات المستهدفة وفهم احتياجاتها", is_correct: true },
        { id: 1013, option_text: "كتابة شيفرات الواجهة", is_correct: false },
      ],
    },
    {
      id: 102,
      question_text: "الإطارات السلكية (Wireframes) تركز على التنسيق البصري الدقيق بدلاً من التخطيط الهيكلي.",
      question_type: "true_false",
      difficulty: "easy",
      points: 2,
      options: [
        { id: 1021, option_text: "صح", is_correct: false },
        { id: 1022, option_text: "خطأ", is_correct: true },
      ],
    },
  ],
};

export default function QuestionBankPage() {
  const [selectedCourseId, setSelectedCourseId] = useState<number>(1);
  const [quizState, setQuizState] = useState<"idle" | "playing" | "results">("idle");
  const [quizResultData, setQuizResultData] = useState<any>(null);

  const activeCourse = mockCourses.find((c) => c.id === selectedCourseId) || mockCourses[0];
  const questions = mockBankQuestions[selectedCourseId] || mockBankQuestions[1];

  const handleStartQuiz = () => {
    setQuizState("playing");
  };

  const handleCompleteQuiz = (results: any) => {
    setQuizResultData(results);
    setQuizState("results");
  };

  if (quizState === "playing") {
    return (
      <div className="p-6 md:p-8 max-w-7xl mx-auto">
        <QuizPlayer
          quizTitle={`اختبار تجريبي: ${activeCourse.title}`}
          courseTitle={activeCourse.title}
          timeLimitMinutes={10}
          questions={questions}
          onCompleteQuiz={handleCompleteQuiz}
          onExit={() => setQuizState("idle")}
        />
      </div>
    );
  }

  if (quizState === "results" && quizResultData) {
    return (
      <div className="p-6 md:p-8 max-w-7xl mx-auto">
        <QuizResults
          quizTitle={`اختبار تجريبي: ${activeCourse.title}`}
          courseTitle={activeCourse.title}
          score={quizResultData.score}
          totalPoints={quizResultData.totalPoints}
          timeSpentSeconds={quizResultData.timeSpentSeconds}
          questions={questions}
          userAnswers={quizResultData.userAnswers}
          onRetry={() => setQuizState("playing")}
          onExit={() => setQuizState("idle")}
        />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 flex flex-col gap-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--foreground)]">بنك الأسئلة والاختبارات</h1>
          <p className="text-sm text-[var(--muted)] mt-1">
            اختبر معلوماتك، تدرب على نماذج الأسئلة المتنوعة، وقس مستوى تحصيلك
          </p>
        </div>

        <button
          onClick={handleStartQuiz}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm shadow-md transition-all self-start md:self-auto hover:scale-105"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>بدء اختبار تجريبي فوري</span>
        </button>
      </div>

      {/* Course Selector Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {mockCourses.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCourseId(c.id)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
              selectedCourseId === c.id
                ? "bg-brand-500 text-white shadow-sm"
                : "bg-[var(--card)] border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{c.title}</span>
          </button>
        ))}
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950/40 text-brand-500 flex items-center justify-center">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-[var(--muted)]">إجمالي الأسئلة المتاحة</span>
            <h4 className="text-xl font-bold text-[var(--foreground)]">
              {toArabicNumerals(questions.length)} سؤالاً
            </h4>
          </div>
        </div>

        <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-950/40 text-green-500 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-[var(--muted)]">مجموع النقاط المحتملة</span>
            <h4 className="text-xl font-bold text-[var(--foreground)]">
              {toArabicNumerals(questions.reduce((a, b) => a + b.points, 0))} نقطة
            </h4>
          </div>
        </div>

        <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-yellow-100 dark:bg-yellow-950/40 text-yellow-500 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-[var(--muted)]">الوقت الموصى به</span>
            <h4 className="text-xl font-bold text-[var(--foreground)]">
              {toArabicNumerals(10)} دقائق
            </h4>
          </div>
        </div>
      </div>

      {/* Available Questions List Preview */}
      <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
          <h3 className="font-bold text-lg text-[var(--foreground)]">نماذج الأسئلة المتوفرة لهذه الدورة</h3>
          <span className="text-xs text-brand-500 font-semibold">تحديث مستمر</span>
        </div>

        <div className="space-y-3">
          {questions.map((q, idx) => (
            <div
              key={q.id}
              className="p-4 rounded-xl bg-[var(--input)] border border-[var(--border)] flex items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-brand-500">
                    السؤال {toArabicNumerals(idx + 1)}
                  </span>
                  <span className="text-[10px] bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded text-[var(--muted)] font-mono">
                    {q.question_type === "mcq" ? "اختيار من متعدد" : "صح/خطأ"}
                  </span>
                </div>
                <p className="text-sm font-semibold text-[var(--foreground)]">{q.question_text}</p>
              </div>

              <span className="text-xs font-bold text-[var(--muted)] whitespace-nowrap">
                {toArabicNumerals(q.points)} نقاط
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
