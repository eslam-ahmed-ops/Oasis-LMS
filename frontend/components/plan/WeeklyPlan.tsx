'use client';

import React from 'react';
import { mockWeeklyTasks } from '@/lib/mockData';
import { toArabicNumerals } from '@/lib/arabicNumbers';
import { Check } from 'lucide-react';

export default function WeeklyPlan() {
  const completedCount = mockWeeklyTasks.filter((t) => t.is_completed).length;
  const totalCount = mockWeeklyTasks.length;

  return (
    <div className="bg-[var(--card)] rounded-2xl p-5 shadow-sm border border-[var(--border)]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg text-[var(--foreground)]">خطتك لهذا الأسبوع</h3>
        <span className="bg-slate-100 dark:bg-slate-800 text-[var(--muted)] text-xs px-2 py-1 rounded-md">تفاصيل التعلم</span>
      </div>
      
      <div className="flex flex-col gap-3">
        {mockWeeklyTasks.map((task) => (
          <div key={task.id} className="flex items-center gap-3">
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors
              ${task.is_completed 
                ? 'bg-green-500 border-green-500 text-white' 
                : 'border-slate-300 dark:border-slate-600'}`}
            >
              {task.is_completed && <Check className="w-3 h-3" />}
            </div>
            <span className={`text-sm ${task.is_completed ? 'line-through text-[var(--muted)]' : 'text-[var(--foreground)]'}`}>
              {task.title}
            </span>
          </div>
        ))}
      </div>
      
      <div className="mt-5 pt-4 border-t border-[var(--border)]">
        <p className="text-sm text-[var(--muted)]">
          {toArabicNumerals(completedCount)} من {toArabicNumerals(totalCount)} مكتمل
        </p>
      </div>
    </div>
  );
}
