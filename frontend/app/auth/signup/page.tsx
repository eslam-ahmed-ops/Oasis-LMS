"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, User, GraduationCap, UserCog } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState<"student" | "teacher">("student");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("كلمات المرور غير متطابقة");
      return;
    }

    if (password.length < 6) {
      setError("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
      return;
    }

    setLoading(true);
    // Mock signup - redirect to dashboard
    setTimeout(() => {
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-[var(--card)] rounded-2xl p-8 shadow-lg border border-[var(--border)]">
        <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">
          إنشاء حساب جديد
        </h1>
        <p className="text-[var(--muted)] mb-6">
          انضم إلى الواحة التعليمية وابدأ رحلة التعلم
        </p>

        {error && (
          <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-xl px-4 py-3 mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
              الاسم الكامل
            </label>
            <div className="relative">
              <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted)]" />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="أدخل اسمك الكامل"
                required
                className="w-full bg-[var(--input)] border border-[var(--border)] rounded-xl px-4 py-3 pr-10 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]"
              />
            </div>
          </div>

          {/* Email */}
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

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
              كلمة المرور
            </label>
            <div className="relative">
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted)]" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="أدخل كلمة المرور"
                required
                className="w-full bg-[var(--input)] border border-[var(--border)] rounded-xl px-4 py-3 pr-10 pl-10 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-[var(--foreground)]"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
              تأكيد كلمة المرور
            </label>
            <div className="relative">
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted)]" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="أعد إدخال كلمة المرور"
                required
                className="w-full bg-[var(--input)] border border-[var(--border)] rounded-xl px-4 py-3 pr-10 pl-10 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-[var(--foreground)]"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
              نوع الحساب
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole("student")}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                  role === "student"
                    ? "border-brand-500 bg-blue-50 dark:bg-brand-900/20"
                    : "border-[var(--border)] bg-[var(--card)] hover:border-[var(--muted)]"
                }`}
              >
                <GraduationCap
                  className={`w-6 h-6 ${role === "student" ? "text-brand-500" : "text-[var(--muted)]"}`}
                />
                <span
                  className={`text-sm font-medium ${
                    role === "student" ? "text-brand-500" : "text-[var(--foreground)]"
                  }`}
                >
                  طالب
                </span>
              </button>

              <button
                type="button"
                onClick={() => setRole("teacher")}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                  role === "teacher"
                    ? "border-brand-500 bg-blue-50 dark:bg-brand-900/20"
                    : "border-[var(--border)] bg-[var(--card)] hover:border-[var(--muted)]"
                }`}
              >
                <UserCog
                  className={`w-6 h-6 ${role === "teacher" ? "text-brand-500" : "text-[var(--muted)]"}`}
                />
                <span
                  className={`text-sm font-medium ${
                    role === "teacher" ? "text-brand-500" : "text-[var(--foreground)]"
                  }`}
                >
                  معلم
                </span>
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-500 hover:bg-brand-600 text-white rounded-xl py-3 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "جاري إنشاء الحساب..." : "إنشاء الحساب"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-[var(--border)]" />
          <span className="text-sm text-[var(--muted)]">أو</span>
          <div className="flex-1 h-px bg-[var(--border)]" />
        </div>

        {/* Google Signup */}
        <button className="w-full border border-[var(--border)] rounded-xl py-3 font-medium hover:bg-[var(--input)] transition-colors text-[var(--foreground)] flex items-center justify-center gap-2">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          التسجيل عبر Google
        </button>

        {/* Login Link */}
        <p className="text-center text-sm text-[var(--muted)] mt-5">
          لديك حساب بالفعل؟{" "}
          <Link href="/auth/login" className="text-brand-500 hover:text-brand-600 font-medium">
            تسجيل الدخول
          </Link>
        </p>
      </div>
    </div>
  );
}
