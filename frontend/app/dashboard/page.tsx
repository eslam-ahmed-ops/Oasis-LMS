'use client';

import React from 'react';
import StatsGrid from '@/components/stats/StatsGrid';
import CurrentCourseCard from '@/components/course/CurrentCourseCard';
import DeadlinesList from '@/components/deadlines/DeadlinesList';
import WeeklyPlan from '@/components/plan/WeeklyPlan';
import CourseList from '@/components/course/CourseList';
import { formatArabicDate } from '@/lib/dateFormatter';

export default function DashboardPage() {
  const currentDate = new Date().toISOString();

  return (
    <div className="p-6 md:p-8 flex flex-col gap-8 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="flex flex-col gap-1">
        <div className="text-sm text-[var(--muted)]">{formatArabicDate(new Date())}</div>
        <h1 className="text-3xl font-bold text-brand-500">مرحباً بك، أحمد !</h1>
        <p className="text-[var(--foreground)] mt-1">نحن سعداء برؤيتك مجدداً. استمر في رحلة تعلمك.</p>
      </div>

      {/* Stats and Current Course Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 xl:col-span-4">
          <StatsGrid />
        </div>
        <div className="lg:col-span-7 xl:col-span-8">
          <CurrentCourseCard />
        </div>
      </div>

      {/* Lower Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar Widgets */}
        <div className="lg:col-span-4 xl:col-span-3 flex flex-col gap-6">
          <DeadlinesList />
          <WeeklyPlan />
        </div>
        
        {/* Main Content Area */}
        <div className="lg:col-span-8 xl:col-span-9">
          <CourseList />
        </div>
      </div>
    </div>
  );
}
