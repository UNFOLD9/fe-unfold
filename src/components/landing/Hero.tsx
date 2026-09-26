"use client";

import Link from "next/link";
import InteractiveCheckin from "./InteractiveCheckin";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-8 pb-20 lg:pt-14 lg:pb-32 bg-gradient-to-b from-[#F8F7FC] via-[#F3F0FA] to-[#F8F7FC]">
      {/* Background ambient blurs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#A78BFA]/15 via-[#FFB38A]/15 to-[#7DD3B0]/15 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute -top-24 right-10 w-96 h-96 bg-[#5B8DEF]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copywriting & CTAs */}
          <div className="lg:col-span-6 xl:col-span-7 space-y-6 text-center lg:text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-[#E8E5F0] shadow-xs text-xs font-semibold text-[#25233A]">
              <span className="flex h-2 w-2 rounded-full bg-[#7DD3B0]" />
              <span>Ruang Refleksi & Kesejahteraan Jiwa</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold text-[#25233A] leading-[1.18] tracking-tight">
              Kamu tidak harus{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5B8DEF] via-[#A78BFA] to-[#FFB38A]">
                menyelesaikan
              </span>{" "}
              semuanya hari ini.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#6F6B80] max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              UNFOLD hadir sebagai ruang tenang untuk berhenti sejenak, mengurai
              benang kusut dalam pikiran, dan merawat kesehatan mentalmu dengan
              lembut—tanpa paksaan dan tanpa rasa bersalah.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/register"
                className="w-full sm:w-auto text-center px-8 py-4 rounded-full bg-[#5B8DEF] hover:bg-[#4a7de0] text-white font-semibold text-base shadow-lg shadow-[#5B8DEF]/25 hover:shadow-xl hover:shadow-[#5B8DEF]/30 transition-all duration-200 active:scale-95"
              >
                Mulai Jurnal Gratismu
              </Link>
              <a
                href="#cara-kerja"
                className="w-full sm:w-auto text-center px-7 py-4 rounded-full bg-white/80 hover:bg-white text-[#25233A] font-semibold text-base border border-[#E8E5F0] hover:border-[#6F6B80]/30 transition-all duration-200"
              >
                Pelajari Cara Kerja ↓
              </a>
            </div>

            {/* Small reassurance bullet points */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs sm:text-sm text-[#6F6B80]">
              <div className="flex items-center gap-1.5">
                <svg
                  className="w-4 h-4 text-[#7DD3B0]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>Privat & Terenkripsi</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg
                  className="w-4 h-4 text-[#7DD3B0]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>Bebas Tekanan Streak</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg
                  className="w-4 h-4 text-[#7DD3B0]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>Cukup 3-5 Menit Sehari</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Simulator Preview */}
          <div className="lg:col-span-6 xl:col-span-5 relative flex justify-center">
            <InteractiveCheckin />
          </div>
        </div>
      </div>
    </section>
  );
}
