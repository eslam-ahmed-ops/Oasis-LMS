'use client';

import React from 'react';
import { Clock, BookOpen, TrendingUp, Calendar } from 'lucide-react';
import StatCard from './StatCard';
import ProgressBar from '@/components/ui/ProgressBar';

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
      <StatCard
        icon={<Clock className="w-5 h-5" />}
        value={48}
        label="ساعات التعلم"
        sublabel="ساعة و ٢٠ دقيقة"
        iconBgColor="bg-orange-100 dark:bg-orange-950"
        iconColor="text-orange-500"
      />
      <StatCard
        icon={<BookOpen className="w-5 h-5" />}
        value={12}
        label="دورات مكتملة"
        sublabel="الفصل الدراسي"
        iconBgColor="bg-green-100 dark:bg-green-950"
        iconColor="text-green-500"
        extra={<ProgressBar percent={75} color="bg-green-500" />}
      />
      <StatCard
        icon={<TrendingUp className="w-5 h-5" />}
        value={860}
        label="نقاط التقدم"
        sublabel="▲ ١٢٪ هذا الأسبوع"
        iconBgColor="bg-blue-100 dark:bg-blue-950"
        iconColor="text-blue-500"
      />
      <StatCard
        icon={<Calendar className="w-5 h-5" />}
        value={4}
        label="جلسات هذا الأسبوع"
        sublabel="٢ جلسة متبقية"
        iconBgColor="bg-yellow-100 dark:bg-yellow-950"
        iconColor="text-yellow-500"
      />
    </div>
  );
}
