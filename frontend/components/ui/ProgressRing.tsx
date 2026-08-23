'use client';

import React, { useEffect, useState } from 'react';
import { toArabicNumerals } from '@/lib/arabicNumbers';

interface ProgressRingProps {
  percent: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
}

export default function ProgressRing({
  percent,
  size = 100,
  strokeWidth = 8,
  color = '#D4A017',
}: ProgressRingProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress on mount
    const timer = setTimeout(() => {
      setProgress(percent);
    }, 100);
    return () => clearTimeout(timer);
  }, [percent]);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          className="text-slate-200 dark:text-slate-700 transition-colors duration-300"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: strokeDashoffset,
            transition: 'stroke-dashoffset 1s ease-in-out',
          }}
          strokeWidth={strokeWidth}
          stroke={color}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <div className="absolute flex items-center justify-center font-bold text-white text-lg">
        {toArabicNumerals(percent)}%
      </div>
    </div>
  );
}
