'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Play, ChevronLeft, Home, BookOpen, HelpCircle, Compass, CheckSquare, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { name: 'الرئيسية', href: '/dashboard', icon: Home },
  { name: 'دوراتي', href: '/dashboard/courses', icon: BookOpen },
  { name: 'بنك الأسئلة', href: '/dashboard/question-bank', icon: HelpCircle },
  { name: 'استكشف', href: '/dashboard/explore', icon: Compass },
  { name: 'المهام', href: '/dashboard/tasks', icon: CheckSquare, notification: true },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed top-0 right-0 h-full w-64 bg-[#0F2440] text-white z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Mobile close button */}
        <button 
          className="lg:hidden absolute top-4 left-4 p-2 text-slate-400 hover:text-white"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </button>

        {/* Logo area */}
        <div className="p-6">
          <h1 className="text-2xl font-bold font-tajawal text-white">الواحة التعليمية</h1>
          <p className="text-slate-400 text-sm mt-1 font-tajawal">منصة تعلم</p>
        </div>

        {/* CTA Button */}
        <div className="px-6 pb-6">
          <button className="w-full flex items-center justify-between bg-[#2563EB] hover:bg-blue-700 text-white p-3 rounded-xl transition-colors">
            <div className="flex items-center gap-2">
              <Play className="w-5 h-5 fill-current" />
              <span className="font-medium font-tajawal">متابعة تعلم</span>
            </div>
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-tajawal ${
                  isActive 
                    ? 'bg-white/10 text-white' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
                onClick={() => {
                  if (window.innerWidth < 1024) onClose();
                }}
              >
                <Icon className="w-5 h-5" />
                <span className="flex-1 font-medium">{item.name}</span>
                {item.notification && (
                  <span className="w-2 h-2 rounded-full bg-red-500"></span>
                )}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
