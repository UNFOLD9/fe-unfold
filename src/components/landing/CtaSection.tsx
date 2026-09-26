import Link from "next/link";
import Image from "next/image";

export default function CtaSection() {
  return (
    <section className="py-20 lg:py-28 bg-[#F8F7FC] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[2.5rem] bg-gradient-to-br from-[#EDE9FA] via-[#F4EFFC] to-[#E5EDFB] p-8 sm:p-14 lg:p-20 border border-[#E8E5F0] overflow-hidden text-center shadow-xl shadow-[#A78BFA]/10">
          {/* Subtle background glow */}
          <div className="absolute -top-24 -left-24 w-80 h-80 bg-[#5B8DEF]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-[#FFB38A]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            {/* Center Logo */}
            <div className="w-16 h-16 mx-auto relative mb-4">
              <Image
                src="/unfold-logo.png"
                alt="UNFOLD"
                fill
                sizes="64px"
                className="object-contain"
              />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#25233A] tracking-tight leading-tight">
              Beri dirimu izin untuk beristirahat dan bertumbuh perlahan.
            </h2>

            <p className="text-base sm:text-lg text-[#6F6B80] leading-relaxed">
              Mulai refleksimu hari ini. Tidak ada ekspektasi yang harus dipenuhi,
              hanya kamu dan pikiranmu yang berharga.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/register"
                className="w-full sm:w-auto px-9 py-4 rounded-full bg-[#5B8DEF] hover:bg-[#4a7de0] text-white font-semibold text-base shadow-lg shadow-[#5B8DEF]/25 hover:shadow-xl transition-all duration-200 active:scale-95"
              >
                Mulai Gratis Hari Ini
              </Link>
              <Link
                href="/login"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/80 hover:bg-white text-[#25233A] font-semibold text-base border border-[#E8E5F0] transition-all duration-200"
              >
                Masuk ke Akun
              </Link>
            </div>

            <p className="text-xs text-[#6F6B80] pt-2">
              ✨ 100% Gratis • Tanpa Kartu Kredit • Privasi Terjamin
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
