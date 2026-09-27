"use client";

import Link from "next/link";

interface CheckInSuccessProps {
  emotionLabel: string;
  intensity: number;
}

export default function CheckInSuccess({
  emotionLabel,
  intensity,
}: CheckInSuccessProps) {
  return (
    <div className="w-full max-w-xl mx-auto bg-[#F0ECFA] border border-[#E8E5F0] rounded-[2.5rem] p-8 sm:p-14 text-center shadow-sm animate-in fade-in zoom-in-95 duration-200">
      {/* Mint Circle with Blue Checkmark */}
      <div className="w-20 h-20 rounded-full bg-[#E8F8F1] flex items-center justify-center mx-auto mb-6 shadow-xs">
        <svg
          className="w-10 h-10 text-[#5B8DEF]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      {/* Heading */}
      <h2 className="text-2xl sm:text-3xl font-extrabold text-[#25233A] mb-2">
        Check-in tersimpan
      </h2>

      {/* Description */}
      <p className="text-sm sm:text-base text-[#6F6B80] max-w-sm mx-auto mb-8 leading-relaxed">
        Terima kasih sudah berhenti sejenak dan mendengarkan dirimu.
      </p>

      {/* Mood & Intensity Badge Pill */}
      <div className="inline-block bg-white px-6 py-2.5 rounded-full border border-[#E8E5F0] shadow-xs text-sm font-bold text-[#25233A] mb-8">
        {emotionLabel} • Intensitas {intensity}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
        <Link
          href="/my-space"
          className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#5B8DEF] hover:bg-[#4a7de0] text-white font-semibold text-sm sm:text-base shadow-sm transition-all active:scale-95 text-center"
        >
          Lihat di My Space
        </Link>
        <Link
          href="/home"
          className="w-full sm:w-auto px-6 py-3.5 text-sm sm:text-base font-semibold text-[#5B8DEF] hover:underline text-center transition-colors"
        >
          Kembali ke Home
        </Link>
      </div>
    </div>
  );
}
