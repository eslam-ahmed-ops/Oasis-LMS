'use client';

import { Search, Bell, Menu } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface TopBarProps {
  onMenuClick: () => void;
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b border-slate-200 dark:border-slate-800">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Right side (visually) - RTL */}
        <div className="flex items-center gap-4">
          <button 
            onClick={onMenuClick}
            className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="hidden md:flex items-center text-sm text-slate-500 dark:text-slate-400 font-tajawal">
            <span>الرئيسية</span>
            <span className="mx-2">&gt;</span>
            <span>الرئيسية</span>
          </div>
        </div>

        {/* Center - Search */}
        <div className="flex-1 max-w-xl mx-4">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="ابحث عن دورة أو درس..." 
              className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-full py-2.5 pr-10 pl-4 text-sm focus:ring-2 focus:ring-[#2563EB] outline-none text-slate-800 dark:text-slate-200 font-tajawal placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Left side */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button className="p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 rounded-lg transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
          </button>
          
          <div className="flex items-center gap-3 mr-2 pl-2 border-r border-slate-200 dark:border-slate-700">
            <div className="flex flex-col items-end hidden sm:flex font-tajawal">
              <span className="text-sm font-medium text-slate-900 dark:text-slate-100">أحمد محمد</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">طالب</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#2563EB] text-white flex items-center justify-center font-bold font-tajawal text-lg">
              أ
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
