'use client';

import Link from 'next/link';
import HomeNavbar from '@/components/home/HomeNavbar';

const sections = [
  {
    id: '01',
    title: 'Ringkasan',
    content:
      'UNFOLD menyimpan data minimum yang dibutuhkan agar akun, check-in emosional, Mind Unload, dan Small Wins bisa bekerja. Kami tidak menggunakan catatan pribadimu untuk iklan.',
  },
  {
    id: '02',
    title: 'Data yang disimpan',
    content:
      'Data akun meliputi nama, email, password yang sudah di-hash, peran, serta waktu akun dibuat. Data aktivitas dapat meliputi emosi, intensitas, catatan pemicu, isi Mind Unload, status simpan, judul dan deskripsi Small Wins, kategori, serta tanggal kemenangan.',
  },
  {
    id: '03',
    title: 'Cara data digunakan',
    content:
      'Data dipakai untuk autentikasi, menampilkan riwayat milikmu, menjaga sesi tetap aktif, dan menjalankan fitur yang kamu pilih. Catatan refleksi tidak dipakai sebagai diagnosis medis atau penilaian kesehatan.',
  },
  {
    id: '04',
    title: 'Sesi dan keamanan',
    content:
      'UNFOLD menggunakan cookie sesi agar akun tetap terautentikasi. Password mentah tidak disimpan. Kamu tetap perlu menjaga akses perangkat dan tidak membagikan kredensial akun.',
  },
  {
    id: '05',
    title: 'Kontrol yang kamu punya',
    content:
      'Kamu dapat keluar dari sesi kapan saja. Permintaan akses, koreksi, atau penghapusan data dapat diajukan melalui kanal dukungan UNFOLD. Beberapa data mungkin perlu disimpan bila diwajibkan oleh hukum yang berlaku.',
  },
  {
    id: '06',
    title: 'Perubahan kebijakan',
    content:
      'Kebijakan ini dapat diperbarui saat fitur atau cara pengolahan data berubah. Tanggal pembaruan akan ditampilkan di bagian atas halaman ini.',
  },
];

export default function PrivacyPolicyPage() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(`section-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9FD] text-[#25233A]">
      <HomeNavbar />

      {/* ── Hero Banner (Lavender Purple) ── */}
      <section className="w-full bg-[#EDE9FA] border-b border-[#DDD8F5]">
        <div className="mx-auto max-w-5xl px-5 py-7 sm:px-8 sm:py-9">
          <p className="text-[11px] sm:text-xs font-bold tracking-[0.18em] uppercase text-[#6C52C7] mb-1.5">
            KEBIJAKAN PRIVASI
          </p>
          <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#25233A] tracking-[-0.02em] mb-1.5">
            Cerita kamu tetap milikmu
          </h1>
          <p className="text-xs sm:text-sm text-[#6F6B80] leading-relaxed max-w-2xl mb-2">
            Dokumen singkat tentang data yang UNFOLD simpan, alasan penggunaannya, dan pilihan yang kamu punya.
          </p>
          <p className="text-xs text-[#9A94AA]">
            Terakhir diperbarui 26 September 2026
          </p>
        </div>
      </section>

      {/* ── Main Content Container ── */}
      <main className="flex-1 mx-auto w-full max-w-5xl px-5 py-6 sm:px-8 sm:py-8">
        {/* Mobile Summary Callout ("Intinya") */}
        <div className="lg:hidden rounded-[22px] bg-[#EDFAF4] border border-[#DCF4EA] p-5 mb-6">
          <h2 className="text-sm font-bold text-[#25233A] mb-1">Intinya</h2>
          <p className="text-xs sm:text-sm text-[#5C7A6A] leading-relaxed">
            Data dipakai untuk menjalankan fitur yang kamu pilih. Catatan pribadi tidak digunakan untuk iklan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8 items-start">
          {/* Left Sticky Sidebar (Desktop only) */}
          <aside className="hidden lg:block sticky top-24 rounded-[24px] bg-white p-5 border border-[#E8E5F0] shadow-sm">
            <h2 className="text-xs font-bold text-[#25233A] uppercase tracking-wider mb-3">
              Di halaman ini
            </h2>
            <nav className="space-y-1.5" aria-label="Daftar isi kebijakan">
              {sections.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => scrollToSection(s.id)}
                  className="flex items-center gap-2.5 w-full text-left py-1 text-xs text-[#6F6B80] hover:text-[#5B8DEF] font-medium transition-colors"
                >
                  <span className="text-[#9A94AA] font-mono text-[11px]">{s.id}</span>
                  <span className="truncate">{s.title}</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Right Main Content Card */}
          <div className="rounded-[28px] bg-white p-6 sm:p-10 border border-[#E8E5F0] shadow-sm space-y-8">
            {sections.map((s) => (
              <section key={s.id} id={`section-${s.id}`} className="space-y-2.5">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#EDE9FA] text-[#6C52C7] font-bold text-xs flex items-center justify-center shrink-0">
                    {s.id}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-[#25233A]">
                    {s.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#6F6B80] leading-relaxed pl-10">
                  {s.content}
                </p>
              </section>
            ))}
          </div>
        </div>

        {/* ── Footer ── */}
        <footer className="pt-8 pb-4 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-[#E8E5F0]/60 text-xs text-[#9A94AA] mt-8">
          <p className="text-center sm:text-left">
            UNFOLD bukan layanan diagnosis atau terapi.
          </p>
          <Link
            href="/profile"
            className="text-[#5B8DEF] font-semibold hover:underline transition-colors"
          >
            Kembali ke akun
          </Link>
        </footer>
      </main>
    </div>
  );
}
