'use client';

import React from 'react';
import { Bookmark, User, Clock, BookOpen, ChevronLeft } from 'lucide-react';
import ProgressBar from '@/components/ui/ProgressBar';
import { toArabicNumerals } from '@/lib/arabicNumbers';

interface CourseCardProps {
  course: {
    id: number;
    title: string;
    instructor_name: string;
    duration_hours: number;
    total_lessons: number;
    progress_percent: number;
    cover_gradient: string;
    category: {
      name: string;
      slug: string;
    };
  };
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="bg-[var(--card)] rounded-2xl overflow-hidden shadow-sm border border-[var(--border)] hover:shadow-md transition-all flex flex-col h-full">
      <div className={`h-32 p-4 relative gradient-${course.cover_gradient}`}>
        <div className="absolute top-4 right-4 bg-white/30 p-2 rounded-full backdrop-blur-sm text-white">
          <Bookmark className="w-4 h-4" />
        </div>
        <div className="absolute bottom-4 right-4 bg-white text-slate-800 text-xs px-3 py-1 rounded-full font-medium">
          {course.category.name}
        </div>
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-bold text-lg mb-3 text-[var(--foreground)] line-clamp-2">
          {course.title}
        </h3>
        
        <div className="flex items-center gap-4 text-sm text-[var(--muted)] mb-4 flex-wrap">
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>{course.instructor_name}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{toArabicNumerals(course.duration_hours)} ساعات</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            <span>{toArabicNumerals(course.total_lessons)} درس</span>
          </div>
        </div>
        
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-2">
            <a href="#" className="flex items-center gap-1 text-brand-500 text-sm font-medium hover:text-brand-600 transition-colors">
              <span>متابعة التعلم</span>
              <ChevronLeft className="w-4 h-4" />
            </a>
            <span className="text-sm font-medium text-[var(--foreground)]">
              {toArabicNumerals(course.progress_percent)}%
            </span>
          </div>
          <ProgressBar percent={course.progress_percent} />
        </div>
      </div>
    </div>
  );
}
