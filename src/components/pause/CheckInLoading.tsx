"use client";

interface CheckInLoadingProps {
  title?: string;
  subtitle?: string;
}

export default function CheckInLoading({
  title = "Menyimpan refleksimu...",
  subtitle = "Tunggu sebentar. Jangan tutup halaman ini.",
}: CheckInLoadingProps) {
  return (
    <div className="w-full max-w-xl mx-auto bg-white border border-[#E8E5F0] rounded-[2.5rem] p-10 sm:p-16 text-center shadow-sm animate-in fade-in zoom-in-95 duration-200">
      {/* 3 Colorful Dots with Staggered Pulse Animation */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <span className="w-3.5 h-3.5 rounded-full bg-[#A78BFA] animate-bounce [animation-delay:-0.3s]" />
        <span className="w-3.5 h-3.5 rounded-full bg-[#7DD3B0] animate-bounce [animation-delay:-0.15s]" />
        <span className="w-3.5 h-3.5 rounded-full bg-[#F6D66B] animate-bounce" />
      </div>

      {/* Main Title */}
      <h3 className="text-xl sm:text-2xl font-extrabold text-[#25233A] tracking-tight mb-2">
        {title}
      </h3>

      {/* Subtitle Message */}
      <p className="text-sm sm:text-base text-[#6F6B80] leading-relaxed">
        {subtitle}
      </p>
    </div>
  );
}
