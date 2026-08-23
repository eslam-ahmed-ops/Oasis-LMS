"use client";

import React, { useState } from "react";
import { CheckSquare, Clock, AlertCircle, CheckCircle2, Plus, Calendar } from "lucide-react";
import { mockDeadlines, mockWeeklyTasks } from "@/lib/mockData";
import { toArabicNumerals } from "@/lib/arabicNumbers";
import { formatDaysRemaining } from "@/lib/dateFormatter";

export default function TasksPage() {
  const [tasks, setTasks] = useState(mockWeeklyTasks);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "completed">("all");

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, is_completed: !t.is_completed } : t))
    );
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const newTask = {
      id: Date.now(),
      title: newTaskTitle.trim(),
      is_completed: false,
    };
    setTasks([newTask, ...tasks]);
    setNewTaskTitle("");
  };

  const filteredTasks = tasks.filter((t) => {
    if (activeTab === "pending") return !t.is_completed;
    if (activeTab === "completed") return t.is_completed;
    return true;
  });

  const completedCount = tasks.filter((t) => t.is_completed).length;

  return (
    <div className="p-6 md:p-8 flex flex-col gap-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--foreground)]">المهام والتكليفات</h1>
          <p className="text-sm text-[var(--muted)] mt-1">
            نظم خطتك الدراسية وتابع تسليم الواجبات في مواعيدها
          </p>
        </div>

        <div className="flex items-center gap-3 bg-[var(--card)] border border-[var(--border)] px-4 py-2 rounded-xl text-xs font-bold shadow-sm">
          <CheckCircle2 className="w-4 h-4 text-green-500" />
          <span>
            تم إنجاز {toArabicNumerals(completedCount)} من {toArabicNumerals(tasks.length)} مهام
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Task List (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Add new task input */}
          <form onSubmit={handleAddTask} className="flex gap-2">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="أضف مهمة دراسية جديدة..."
              className="flex-1 bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--foreground)] outline-none focus:ring-2 focus:ring-brand-500"
            />
            <button
              type="submit"
              className="px-5 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة</span>
            </button>
          </form>

          {/* Filter tabs */}
          <div className="flex gap-2 border-b border-[var(--border)] pb-3">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                activeTab === "all"
                  ? "bg-brand-500 text-white"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              الكل ({toArabicNumerals(tasks.length)})
            </button>
            <button
              onClick={() => setActiveTab("pending")}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                activeTab === "pending"
                  ? "bg-brand-500 text-white"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              المتبقية ({toArabicNumerals(tasks.length - completedCount)})
            </button>
            <button
              onClick={() => setActiveTab("completed")}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                activeTab === "completed"
                  ? "bg-brand-500 text-white"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              المكتملة ({toArabicNumerals(completedCount)})
            </button>
          </div>

          {/* Tasks Container */}
          <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-4 divide-y divide-[var(--border)] shadow-sm">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className="py-3.5 px-3 flex items-center justify-between gap-4 cursor-pointer hover:bg-[var(--input)] rounded-xl transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                      task.is_completed
                        ? "bg-green-500 border-green-500 text-white"
                        : "border-[var(--muted)] bg-transparent"
                    }`}
                  >
                    {task.is_completed && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      task.is_completed ? "line-through text-[var(--muted)]" : "text-[var(--foreground)]"
                    }`}
                  >
                    {task.title}
                  </span>
                </div>

                <span className="text-xs text-[var(--muted)] font-mono">
                  {task.is_completed ? "مكتمل" : "قيد التنفيذ"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Side Deadlines Box (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-[var(--border)]">
              <Calendar className="w-5 h-5 text-brand-500" />
              <h3 className="font-bold text-base text-[var(--foreground)]">المواعيد النهائية القادمة</h3>
            </div>

            <div className="space-y-3">
              {mockDeadlines.map((dl) => (
                <div key={dl.id} className="p-3.5 rounded-xl bg-[var(--input)] space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[var(--foreground)]">{dl.title}</span>
                    <span className="text-brand-500 font-semibold bg-brand-50 dark:bg-brand-900/40 px-2 py-0.5 rounded">
                      {formatDaysRemaining(dl.due_date)}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--muted)]">{dl.course_title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
