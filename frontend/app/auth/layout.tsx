'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[var(--background)] relative overflow-hidden" dir="rtl">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500 via-transparent to-transparent"></div>

      {/* Theme Toggle Corner */}
      <div className="absolute top-4 left-4 z-50">
        {mounted && (
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-[#334155] text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#0F172A] transition-colors shadow-sm"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        )}
      </div>

      <div className="w-full h-screen lg:h-auto lg:min-h-screen flex z-10">
        {/* Right side: Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 overflow-y-auto">
          {children}
        </div>

        {/* Left side: Decorative panel (Hidden on mobile) */}
        <div className="hidden lg:flex w-1/2 bg-[#0F2440] text-white flex-col items-center justify-center p-12 relative overflow-hidden">
          {/* Decorative shapes */}
          <div className="absolute top-10 right-10 w-32 h-32 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-blue-400 rounded-full opacity-20 blur-3xl"></div>
          
          <div className="z-10 text-center space-y-6">
            <h1 className="text-5xl font-bold tracking-tight text-white font-[Tajawal]">الواحة التعليمية</h1>
            <p className="text-xl text-blue-200">منصتك التعليمية العربية المتكاملة</p>
          </div>
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
}
