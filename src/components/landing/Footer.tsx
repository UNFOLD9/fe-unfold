import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#E8E5F0] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-[#E8E5F0]/70">
          {/* Brand info */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-8 h-8">
                <Image
                  src="/unfold-logo.png"
                  alt="UNFOLD"
                  fill
                  sizes="32px"
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold tracking-[0.18em] text-[#25233A]">
                UNFOLD
              </span>
            </Link>
            <p className="text-sm text-[#6F6B80] max-w-sm leading-relaxed">
              Teman refleksi mandiri dan kesehatan mental untuk membantumu
              berhenti sejenak, mengurai perasaan, dan merawat diri tanpa beban.
            </p>
            <div className="pt-2 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#7DD3B0]" />
              <span className="text-xs text-[#6F6B80] font-medium">
                Dibuat dengan cinta untuk kesehatan mental
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-[#25233A]">
              Eksplorasi
            </h4>
            <ul className="space-y-2 text-sm text-[#6F6B80]">
              <li>
                <a href="#fitur" className="hover:text-[#5B8DEF] transition-colors">
                  Fitur Utama
                </a>
              </li>
              <li>
                <a href="#keunggulan" className="hover:text-[#5B8DEF] transition-colors">
                  Filosofi Kami
                </a>
              </li>
              <li>
                <a href="#cara-kerja" className="hover:text-[#5B8DEF] transition-colors">
                  Cara Kerja
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#5B8DEF] transition-colors">
                  Tanya Jawab (FAQ)
                </a>
              </li>
            </ul>
          </div>

          {/* Akses Cepat */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-sm font-bold text-[#25233A]">
              Mulai Langkahmu
            </h4>
            <p className="text-xs text-[#6F6B80] leading-relaxed">
              Siap meluangkan 3 menit untuk dirimu sendiri hari ini?
            </p>
            <div className="flex flex-col sm:flex-row gap-2 pt-1">
              <Link
                href="/register"
                className="px-5 py-2.5 text-xs font-semibold text-center rounded-xl bg-[#5B8DEF] hover:bg-[#4a7de0] text-white transition-all shadow-xs"
              >
                Daftar Akun Baru
              </Link>
              <Link
                href="/login"
                className="px-5 py-2.5 text-xs font-semibold text-center rounded-xl border border-[#E8E5F0] hover:bg-[#F8F7FC] text-[#25233A] transition-colors"
              >
                Masuk ke Akun
              </Link>
            </div>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 space-y-4">
          <div className="p-4 rounded-2xl bg-[#F8F7FC] border border-[#E8E5F0] text-xs text-[#6F6B80] leading-relaxed">
            <strong className="text-[#25233A] font-semibold">
              Catatan Penting:{" "}
            </strong>
            UNFOLD dirancang sebagai alat bantu refleksi mandiri harian, bukan
            pengganti penanganan medis klinis, diagnosis psikiatris, maupun terapi
            profesional. Jika kamu sedang mengalami kondisi krisis darurat, segera
            hubungi layanan konseling atau rumah sakit terdekat.
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#6F6B80] gap-4">
            <p>© {new Date().getFullYear()} UNFOLD. Hak cipta dilindungi.</p>
            <div className="flex items-center gap-6">
              <span className="hover:text-[#25233A] cursor-pointer">
                Privasi Terjamin
              </span>
              <span className="hover:text-[#25233A] cursor-pointer">
                Syarat & Ketentuan
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
