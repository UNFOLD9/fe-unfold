import { ReactNode } from "react";
import Image from "next/image";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row" style={{ backgroundColor: "#F8F7FC" }}>

      {/* ── Left Hero Panel ── */}
      <div
        className="hidden lg:flex lg:w-[42%] xl:w-[40%] flex-col justify-between p-10 xl:p-12 relative overflow-hidden gap-8"
        style={{ backgroundColor: "#EDE9FA" }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image
            src="/unfold-logo.png"
            alt="UNFOLD Logo"
            width={26}
            height={26}
            className="object-contain"
          />
          <span className="font-bold text-base tracking-widest" style={{ color: "#25233A", letterSpacing: "0.18em" }}>
            UNFOLD
          </span>
        </div>

        {/* Headline — centered */}
        <div className="flex-1 flex flex-col items-start justify-center">
          <h1
            className="text-3xl xl:text-4xl font-bold leading-tight mb-4"
            style={{ color: "#25233A" }}
          >
            Kamu tidak harus<br />
            menyelesaikan<br />
            semuanya hari ini.
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "#6F6B80" }}>
            Masuk untuk melanjutkan check-in, membaca refleksi<br />
            pribadi, dan mengingat kemajuan kecilmu.
          </p>
        </div>


      </div>

      {/* ── Right Form Panel ── */}
      <div
        className="flex-1 flex flex-col items-center justify-center px-6 py-10 lg:px-12 xl:px-20"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        {/* Mobile logo */}
        <div className="lg:hidden mb-8 flex items-center gap-2">
          <Image
            src="/unfold-logo.png"
            alt="UNFOLD Logo"
            width={28}
            height={28}
            className="object-contain"
          />
          <span className="font-bold text-lg tracking-widest" style={{ color: "#25233A" }}>
            UNFOLD
          </span>
        </div>

        <div className="w-full max-w-[400px]">
          {children}
        </div>
      </div>
    </div>
  );
}
