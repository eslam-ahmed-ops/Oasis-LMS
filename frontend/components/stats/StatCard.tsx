'use client';

import React from 'react';
import { toArabicNumerals } from '@/lib/arabicNumbers';

interface StatCardProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  sublabel?: string;
  iconBgColor: string;
  iconColor: string;
  extra?: React.ReactNode;
}

export default function StatCard({
  icon,
  value,
  label,
  sublabel,
  iconBgColor,
  iconColor,
  extra,
}: StatCardProps) {
  return (
    <div className="bg-[var(--card)] rounded-2xl p-5 shadow-sm border border-[var(--border)] hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="text-3xl font-bold text-[var(--foreground)] mb-1">
            {toArabicNumerals(value)}
          </div>
          <div className="text-sm font-medium text-[var(--foreground)]">
            {label}
          </div>
        </div>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBgColor} ${iconColor}`}>
          {icon}
        </div>
      </div>
      
      {(sublabel || extra) && (
        <div className="mt-4">
          {sublabel && (
            <div className="text-sm text-[var(--muted)] mb-2">{sublabel}</div>
          )}
          {extra && <div>{extra}</div>}
        </div>
      )}
    </div>
  );
}
