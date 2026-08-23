'use client';

import React, { useState } from 'react';
import CourseCard from './CourseCard';
import CategoryTabs from './CategoryTabs';
import { mockCourses } from '@/lib/mockData';

export default function CourseList() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredCourses = activeCategory === 'all'
    ? mockCourses
    : mockCourses.filter(course => course.category.slug === activeCategory);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold text-[var(--foreground)] mb-1">دوراتك التعليمية</h2>
        <p className="text-[var(--muted)]">تصفح الكل واكتشف ما يناسب أهدافك</p>
      </div>
      
      <CategoryTabs activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
