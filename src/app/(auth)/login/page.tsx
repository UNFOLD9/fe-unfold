"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Eye, EyeClosed, CircleNotch } from "@phosphor-icons/react";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ email?: string[]; password?: string[] }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setFieldErrors({});

    // Client-side validation
    let hasError = false;
    const newFieldErrors: { email?: string[]; password?: string[] } = {};

    if (!email) {
      newFieldErrors.email = ["Email tidak boleh kosong"];
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newFieldErrors.email = ["Format email tidak valid"];
      hasError = true;
    }

    if (!password) {
      newFieldErrors.password = ["Kata sandi tidak boleh kosong"];
      hasError = true;
    }

    if (hasError) {
      setFieldErrors(newFieldErrors);
      setIsLoading(false);
      return;
    }

    try {
      const response = await login({ email, password });
      if (response.success) {
        router.push("/home");
      } else {
        if ('errors' in response) {
          setFieldErrors(response.errors as any);
        }
        if (response.message) {
          setError(response.message);
        }
      }
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan saat masuk. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-1.5" style={{ color: "#25233A" }}>
          Selamat datang kembali
        </h2>
        <p className="text-sm" style={{ color: "#6F6B80" }}>
          Masuk untuk melanjutkan ruang refleksi pribadimu.
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm flex items-start gap-2">
          <span>⚠️</span>
          <p>{error}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-text-main" htmlFor="login-email">
            Email
          </label>
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nama@email.com"
            disabled={isLoading}
            className={`w-full px-4 py-3 rounded-xl border bg-white text-text-main placeholder-text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 ${
              fieldErrors.email ? "border-red-300 focus:ring-red-500/20 focus:border-red-500" : "border-border-main"
            }`}
          />
          {fieldErrors.email && (
            <p className="text-xs text-red-500 mt-1">{fieldErrors.email[0]}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-text-main" htmlFor="login-password">
            Kata sandi
          </label>
          <div className="relative">
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan kata sandi"
              disabled={isLoading}
              className={`w-full px-4 py-3 rounded-xl border bg-white text-text-main placeholder-text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 pr-12 ${
                fieldErrors.password ? "border-red-300 focus:ring-red-500/20 focus:border-red-500" : "border-border-main"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main transition-colors p-1"
              aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
            >
              {showPassword ? (
                <EyeClosed size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>
          {fieldErrors.password && (
            <p className="text-xs text-red-500 mt-1">{fieldErrors.password[0]}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-xl transition-all duration-200 active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none flex items-center justify-center gap-2 mt-2"
        >
          {isLoading ? (
            <>
              <CircleNotch size={18} weight="bold" className="animate-spin text-white" />
              Memproses...
            </>
          ) : (
            "Masuk"
          )}
        </button>
      </form>

      {/* Footer Link */}
      <div className="mt-8 text-center">
        <p className="text-sm text-text-muted">
          Belum punya akun?{" "}
          <Link href="/register" className="font-medium text-primary hover:underline hover:text-primary/80 transition-colors">
            Buat akun
          </Link>
        </p>
      </div>
    </div>
  );
}
