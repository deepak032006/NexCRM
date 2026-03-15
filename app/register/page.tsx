"use client";
// src/app/register/page.tsx
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerAction } from "@/actions/authActions";
import toast from "react-hot-toast";
import { Eye, EyeOff, Loader2, Zap, Check } from "lucide-react";

function passwordStrength(pwd: string) {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  return score; // 0-4
}

const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"];
const strengthColor = ["", "bg-red-400", "bg-orange-400", "bg-yellow-400", "bg-green-500"];

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const [showPwd, setShowPwd] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const strength = passwordStrength(form.password);

  function set(field: string, value: string) {
    setForm((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((p) => { const n = { ...p }; delete n[field]; return n; });
  }

  function validate() {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Full name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Enter a valid email";
    if (!form.password) errs.password = "Password is required";
    else if (form.password.length < 6) errs.password = "Password must be at least 6 characters";
    if (!form.password2) errs.password2 = "Please confirm your password";
    else if (form.password !== form.password2) errs.password2 = "Passwords do not match";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  if (!validate()) return;

  setLoading(true);

  const result = await registerAction(
    form.email.trim(),
    form.name.trim(),
    form.password,
    form.password2
  );

  if (result.success) {
    toast.success("Account created! Welcome to NexCRM 🎉");

    router.push("/dashboard");
  } else {
    toast.error(result.message);
  }

  setLoading(false);
}

  const requirements = [
    { label: "At least 8 characters", met: form.password.length >= 8 },
    { label: "One uppercase letter", met: /[A-Z]/.test(form.password) },
    { label: "One number", met: /[0-9]/.test(form.password) },
  ];

  return (
    <div className="min-h-screen bg-crm-bg flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-ai/5 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
         <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">


            <img
              src="/logo/main.png"
              alt="Artizence Logo"
              className="w-10 h-10 object-contain drop-shadow-md"
            />


            <span className="text-2xl font-bold text-gray-900">
              rtizence<span className="text-primary"></span>
            </span>

          </div>

          <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
          <p className="text-gray-500 mt-1">
            Sign up to your account to continue
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-crm-border p-8">
          <form onSubmit={handleSubmit} noValidate className="space-y-5">

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Full name
              </label>
              <input
                type="text"
                autoComplete="name"
                placeholder="John Smith"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition
                  focus:ring-2 focus:ring-primary/20 focus:border-primary
                  ${errors.name ? "border-red-400 bg-red-50" : "border-crm-border"}`}
              />
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email address
              </label>
              <input
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition
                  focus:ring-2 focus:ring-primary/20 focus:border-primary
                  ${errors.email ? "border-red-400 bg-red-50" : "border-crm-border"}`}
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPwd ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Create a strong password"
                  value={form.password}
                  onChange={(e) => set("password", e.target.value)}
                  className={`w-full px-4 py-2.5 pr-11 rounded-xl border text-sm outline-none transition
                    focus:ring-2 focus:ring-primary/20 focus:border-primary
                    ${errors.password ? "border-red-400 bg-red-50" : "border-crm-border"}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}

              {/* Strength bar */}
              {form.password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all duration-300
                          ${i <= strength ? strengthColor[strength] : "bg-gray-200"}`}
                      />
                    ))}
                  </div>
                  <p className={`text-xs font-medium ${strength >= 3 ? "text-green-600" : strength === 2 ? "text-yellow-600" : "text-red-500"}`}>
                    {strengthLabel[strength]}
                  </p>
                  {/* Requirements */}
                  <div className="mt-2 space-y-1">
                    {requirements.map((r) => (
                      <div key={r.label} className="flex items-center gap-1.5">
                        <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center transition
                          ${r.met ? "bg-green-500" : "bg-gray-200"}`}>
                          {r.met && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
                        </div>
                        <span className={`text-xs ${r.met ? "text-green-600" : "text-gray-400"}`}>
                          {r.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Confirm password
              </label>
              <div className="relative">
                <input
                  type={showPwd2 ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Repeat your password"
                  value={form.password2}
                  onChange={(e) => set("password2", e.target.value)}
                  className={`w-full px-4 py-2.5 pr-11 rounded-xl border text-sm outline-none transition
                    focus:ring-2 focus:ring-primary/20 focus:border-primary
                    ${errors.password2 ? "border-red-400 bg-red-50" : "border-crm-border"}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd2((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPwd2 ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password2 && <p className="mt-1 text-xs text-red-500">{errors.password2}</p>}
              {!errors.password2 && form.password2 && form.password === form.password2 && (
                <p className="mt-1 text-xs text-green-600 flex items-center gap-1">
                  <Check className="w-3 h-3" /> Passwords match
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-primary hover:bg-primary/90 disabled:bg-primary/50
                text-black text-sm font-semibold rounded-xl transition flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating account…
                </>
              ) : (
                "Create account"
              )}
            </button>
          </form>

          {/* Divider + Login link */}
          <div className="mt-6 pt-6 border-t border-crm-border text-center">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link href="/login" className="text-primary font-semibold hover:text-primary/80">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-6">
          © {new Date().getFullYear()} NexCRM. All rights reserved.
        </p>
      </div>
    </div>
  );
}