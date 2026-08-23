"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowRight, CheckCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mock - simulate sending email
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1500);
  };

  if (sent) {
    return (
      <div className="w-full max-w-md">
        <div className="bg-[var(--card)] rounded-2xl p-8 shadow-lg border border-[var(--border)] text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-950/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">
            تم إرسال الرابط
          </h1>
          <p className="text-[var(--muted)] mb-6">
            تحقق من بريدك الإلكتروني. أرسلنا لك رابط إعادة تعيين كلمة المرور.
          </p>
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-2 text-brand-500 hover:text-brand-600 font-medium"
          >
            <ArrowRight className="w-4 h-4" />
            العودة لتسجيل الدخول
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-[var(--card)] rounded-2xl p-8 shadow-lg border border-[var(--border)]">
        <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">
          نسيت كلمة المرور؟
        </h1>
        <p className="text-[var(--muted)] mb-6">
          أدخل بريدك الإلكتروني وسنرسل لك رابط إعادة التعيين
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
              البريد الإلكتروني
            </label>
            <div className="relative">
              <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted)]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                required
                dir="ltr"
                className="w-full bg-[var(--input)] border border-[var(--border)] rounded-xl px-4 py-3 pr-10 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] text-left"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-500 hover:bg-brand-600 text-white rounded-xl py-3 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "جاري الإرسال..." : "إرسال رابط الإعادة"}
          </button>
        </form>

        <div className="mt-5 text-center">
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-2 text-sm text-brand-500 hover:text-brand-600 font-medium"
          >
            <ArrowRight className="w-4 h-4" />
            العودة لتسجيل الدخول
          </Link>
        </div>
      </div>
    </div>
  );
}
