"use client";

import React, { useState } from "react";
import { Download, FileText, ChevronRight, ChevronLeft, ZoomIn, ZoomOut, ExternalLink } from "lucide-react";
import { toArabicNumerals } from "@/lib/arabicNumbers";

interface PdfViewerProps {
  pdfUrl?: string;
  title: string;
  totalPages?: number;
}

export default function PdfViewer({ pdfUrl, title, totalPages = 14 }: PdfViewerProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(100);

  return (
    <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-6 shadow-sm flex flex-col gap-4">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[var(--border)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-[var(--foreground)]">{title}</h3>
            <p className="text-xs text-[var(--muted)]">مذكرة دراسية بصيغة PDF</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Zoom */}
          <div className="flex items-center bg-[var(--input)] rounded-lg border border-[var(--border)] p-1 text-xs">
            <button
              onClick={() => setZoom((z) => Math.max(70, z - 10))}
              className="p-1 text-[var(--muted)] hover:text-[var(--foreground)]"
              title="تصغير"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 font-medium">{toArabicNumerals(zoom)}%</span>
            <button
              onClick={() => setZoom((z) => Math.min(150, z + 10))}
              className="p-1 text-[var(--muted)] hover:text-[var(--foreground)]"
              title="تكبير"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Download button */}
          <a
            href={pdfUrl || "#"}
            download
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-50 dark:bg-brand-900/20 text-brand-500 hover:bg-brand-100 dark:hover:bg-brand-900/40 text-xs font-semibold transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>تحميل PDF</span>
          </a>
        </div>
      </div>

      {/* PDF View Canvas / Container */}
      <div className="relative w-full min-h-[420px] bg-slate-100 dark:bg-slate-900/60 rounded-xl border border-[var(--border)] overflow-auto flex items-center justify-center p-6">
        <div
          className="bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-lg shadow-lg border border-[var(--border)] p-8 max-w-2xl w-full min-h-[380px] flex flex-col justify-between transition-transform duration-200"
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top center" }}
        >
          <div>
            <div className="flex items-center justify-between border-b pb-4 mb-6 border-slate-200 dark:border-slate-700">
              <span className="text-xs font-bold text-brand-500">الواحة التعليمية • ملخص الدرس</span>
              <span className="text-xs text-slate-400">صفحة {toArabicNumerals(currentPage)} من {toArabicNumerals(totalPages)}</span>
            </div>

            <h4 className="text-lg font-bold mb-3">{title}</h4>
            <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>
                في هذا القسم نتعرف على المفاهيم الجوهرية والأساسية التي تبنى عليها بقية أجزاء الوحدة الدراسية. يوصى بمراجعة الأمثلة العملية وتطبيقها مباشرة في بيئة العمل.
              </p>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 font-mono text-xs text-brand-600 dark:text-brand-400">
                # مثال توضيحي للمفاهيم المشروحة في الصفحة {toArabicNumerals(currentPage)}<br />
                data = {"{"}"lesson": "{title}", "page": {currentPage}{"}"}
              </div>
              <p>
                تأكد من تدوين الملاحظات وحل التمارين التفاعلية المرفقة في بنك الأسئلة قبل الانتقال إلى الدرس اللاحق.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-400 text-center">
            حقوق المحتوى محفوظة © الواحة التعليمية
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[var(--border)] text-xs font-medium text-[var(--foreground)] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--input)] transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
          <span>الصفحة السابقة</span>
        </button>

        <span className="text-xs text-[var(--muted)]">
          صفحة <strong className="text-[var(--foreground)]">{toArabicNumerals(currentPage)}</strong> من {toArabicNumerals(totalPages)}
        </span>

        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[var(--border)] text-xs font-medium text-[var(--foreground)] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--input)] transition-colors"
        >
          <span>الصفحة التالية</span>
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
