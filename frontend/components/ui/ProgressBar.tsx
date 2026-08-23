'use client';

import React from 'react';

interface ProgressBarProps {
  percent: number;
  color?: string;
  height?: string;
}

export default function ProgressBar({
  percent,
  color = 'bg-brand-500',
  height = 'h-2',
}: ProgressBarProps) {
  return (
    <div className={`w-full ${height} bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden`}>
      <div
        className={`${height} ${color} rounded-full transition-all duration-500 ease-out`}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
