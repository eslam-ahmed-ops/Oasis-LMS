'use client';

import React from 'react';
import { formatDaysRemaining } from '@/lib/dateFormatter';

interface DeadlineItemProps {
  title: string;
  courseName: string;
  dueDate: string;
  isCompleted: boolean;
}

export default function DeadlineItem({
  title,
  courseName,
  dueDate,
  isCompleted,
}: DeadlineItemProps) {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-[var(--border)] last:border-0">
      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${isCompleted ? 'bg-green-500' : 'bg-brand-500'}`} />
      
      <div className="flex-1">
        <div className="font-medium text-[var(--foreground)]">{title}</div>
        <div className="text-sm text-[var(--muted)]">{courseName}</div>
      </div>
      
      <div className="flex-shrink-0">
        <span className="bg-brand-50 dark:bg-brand-900/30 text-brand-500 rounded-full px-3 py-1 text-sm inline-block">
          {formatDaysRemaining(dueDate)}
        </span>
      </div>
    </div>
  );
}
