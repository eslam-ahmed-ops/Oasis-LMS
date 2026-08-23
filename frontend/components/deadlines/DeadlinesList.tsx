'use client';

import React from 'react';
import DeadlineItem from './DeadlineItem';
import { mockDeadlines } from '@/lib/mockData';
import { ChevronLeft } from 'lucide-react';

export default function DeadlinesList() {
  return (
    <div className="bg-[var(--card)] rounded-2xl p-5 shadow-sm border border-[var(--border)]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg text-[var(--foreground)]">المواعيد النهائية</h3>
        <span className="bg-slate-100 dark:bg-slate-800 text-[var(--muted)] text-xs px-2 py-1 rounded-md">التالي القادم</span>
      </div>
      
      <div className="flex flex-col">
        {mockDeadlines.map((deadline) => (
          <DeadlineItem
            key={deadline.id}
            title={deadline.title}
            courseName={deadline.course_title}
            dueDate={deadline.due_date}
            isCompleted={deadline.is_completed}
          />
        ))}
      </div>
      
      <div className="mt-4 pt-2">
        <a href="#" className="flex items-center gap-1 text-brand-500 text-sm font-medium hover:text-brand-600 transition-colors">
          <span>عرض جميع المواعيد</span>
          <ChevronLeft className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
