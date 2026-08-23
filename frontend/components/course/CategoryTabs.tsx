'use client';

import React from 'react';

interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (slug: string) => void;
}

export default function CategoryTabs({ activeCategory, onCategoryChange }: CategoryTabsProps) {
  const categories = [
    { slug: 'all', label: 'الكل' },
    { slug: 'programming', label: 'البرمجة' },
    { slug: 'design', label: 'التصميم' },
    { slug: 'business', label: 'الأعمال' },
    { slug: 'data', label: 'البيانات' },
  ];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((cat) => (
        <button
          key={cat.slug}
          onClick={() => onCategoryChange(cat.slug)}
          className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeCategory === cat.slug
              ? 'bg-brand-500 text-white'
              : 'text-[var(--muted)] hover:text-[var(--foreground)] bg-slate-100 dark:bg-slate-800'
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
