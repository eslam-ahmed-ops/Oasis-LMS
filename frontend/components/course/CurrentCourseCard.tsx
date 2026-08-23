'use client';

import React from 'react';
import ProgressRing from '@/components/ui/ProgressRing';
import { Play } from 'lucide-react';
import { mockCurrentCourse } from '@/lib/mockData';

export default function CurrentCourseCard() {
  return (
    <div className="gradient-navy rounded-2xl overflow-hidden text-white p-6 relative flex flex-col md:flex-row items-center justify-between gap-6 h-full shadow-md">
      <div className="flex-1 text-right flex flex-col justify-center items-start">
        <span className="bg-white/20 text-white rounded-full px-3 py-1 text-xs mb-4 inline-block">
          الدورة الحالية
        </span>
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          {mockCurrentCourse.title}
        </h2>
        <p className="text-slate-300 mb-6">
          {mockCurrentCourse.current_unit}
        </p>
        <button className="bg-brand-500 hover:bg-brand-600 text-white rounded-xl px-6 py-3 flex items-center gap-2 transition-colors font-medium">
          <Play className="w-5 h-5" />
          <span>ابدأ الدرس التالي</span>
        </button>
      </div>
      
      <div className="flex-shrink-0 flex items-center justify-center p-4">
        <ProgressRing percent={mockCurrentCourse.progress_percent} size={140} strokeWidth={10} color="#D4A017" />
      </div>
    </div>
  );
}
