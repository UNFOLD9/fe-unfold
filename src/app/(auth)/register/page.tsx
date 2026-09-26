"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { CircleNotch, Eye, EyeClosed } from "@phosphor-icons/react";
import FormError from "@/app/_components/form-error";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ name?: string[]; email?: string[]; password?: string[] }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setFieldErrors({});

    // Client-side validation
    let hasError = false;
    const newFieldErrors: { name?: string[]; email?: string[]; password?: string[] } = {};

    if (!name.trim()) {
      newFieldErrors.name = ["Nama tidak boleh kosong"];
      hasError = true;
    }

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
    } else if (password.length < 8) {
      newFieldErrors.password = ["Kata sandi minimal 8 karakter"];
      hasError = true;
    }

    if (hasError) {
      setFieldErrors(newFieldErrors);
      setIsLoading(false);
      return;
    }

    try {
      const response = await register({ name, email, password });
      if (response.success) {
        router.push("/home");
      } else {
        if ('errors' in response) {
          setFieldErrors(response.errors);
        }
        if (response.message) {
          setError(response.message);
        }
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan saat mendaftar. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-1.5" style={{ color: "#25233A" }}>
          Buat ruang pribadimu
        </h2>
        <p className="text-sm" style={{ color: "#6F6B80" }}>
          Buat akun untuk menyimpan refleksi yang hanya kamu yang bisa akses.
        </p>
      </div>

      {/* Error Alert */}
      {error && <FormError message={error} />}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-text-main" htmlFor="register-name">
            Nama
          </label>
          <input
            id="register-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama lengkapmu"
            disabled={isLoading}
            className={`w-full px-4 py-3 rounded-xl border bg-white text-text-main placeholder-text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 ${
              fieldErrors.name ? "border-red-300 focus:ring-red-500/20 focus:border-red-500" : "border-border-main"
            }`}
          />
          {fieldErrors.name && (
            <p className="text-xs text-red-500 mt-1">{fieldErrors.name[0]}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-text-main" htmlFor="register-email">
            Email
          </label>
          <input
            id="register-email"
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
          <label className="text-sm font-medium text-text-main" htmlFor="register-password">
            Kata sandi
          </label>
          <div className="relative">
            <input
              id="register-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimal 8 karakter"
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
            "Buat akun"
          )}
        </button>
      </form>

      {/* Footer Link */}
      <div className="mt-8 text-center">
        <p className="text-sm text-text-muted">
          Sudah punya akun?{" "}
          <Link href="/login" className="font-medium text-primary hover:underline hover:text-primary/80 transition-colors">
            Masuk
          </Link>
        </p>
      </div>
    </div>
  );
}
