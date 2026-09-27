import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";

const sections = [
  {
    number: "01",
    title: "Ringkasan",
    text: "UNFOLD menyimpan data minimum yang dibutuhkan agar akun, check-in emosional, Mind Unload, dan Small Wins bisa bekerja. Kami tidak menggunakan catatan pribadimu untuk iklan.",
  },
  {
    number: "02",
    title: "Data yang disimpan",
    text: "Data akun meliputi nama, email, password yang sudah di-hash, peran, serta waktu akun dibuat. Data aktivitas dapat meliputi emosi, intensitas, catatan pemicu, isi Mind Unload, status simpan, judul dan deskripsi Small Wins, kategori, serta tanggal kemenangan.",
  },
  {
    number: "03",
    title: "Cara data digunakan",
    text: "Data dipakai untuk autentikasi, menampilkan riwayat milikmu, menjaga sesi tetap aktif, dan menjalankan fitur yang kamu pilih. Catatan refleksi tidak dipakai sebagai diagnosis medis atau penilaian kesehatan.",
  },
  {
    number: "04",
    title: "Sesi dan keamanan",
    text: "UNFOLD menggunakan cookie sesi agar akun tetap terautentikasi. Password mentah tidak disimpan. Kamu tetap perlu menjaga akses perangkat dan tidak membagikan kredensial akun.",
  },
  {
    number: "05",
    title: "Kontrol yang kamu punya",
    text: "Kamu dapat keluar dari sesi kapan saja. Permintaan akses, koreksi, atau penghapusan data dapat diajukan melalui kanal dukungan UNFOLD. Beberapa data mungkin perlu disimpan bila diwajibkan oleh hukum yang berlaku.",
  },
  {
    number: "06",
    title: "Perubahan kebijakan",
    text: "Kebijakan ini dapat diperbarui saat fitur atau cara pengolahan data berubah. Tanggal pembaruan akan ditampilkan di bagian atas halaman ini.",
  },
] as const;

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#F8F7FC] text-[#25233A]">
      <header className="bg-white/70">
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 sm:h-24 sm:px-10 lg:px-[88px]">
          <Link href="/" className="flex min-h-11 items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5B8DEF]" aria-label="UNFOLD">
            <Image src="/figma/unfold-mark.svg" alt="" width={34} height={34} />
            <span className="text-xl font-extrabold tracking-[-0.03em]">UNFOLD</span>
          </Link>
          <nav className="flex items-center gap-2 sm:gap-3" aria-label="Autentikasi">
            <Link href="/login" className="inline-flex min-h-11 items-center justify-center rounded-[14px] border border-[#E8E5F0] bg-white px-4 text-sm font-semibold hover:border-[#5B8DEF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B8DEF] sm:px-5">Masuk</Link>
            <Link href="/register" className="inline-flex min-h-11 items-center justify-center rounded-[14px] border border-[#5B8DEF] bg-[#5B8DEF] px-4 text-sm font-semibold text-white hover:bg-[#4F80DF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B8DEF] sm:px-5">Buat akun</Link>
          </nav>
        </div>
      </header>

      <section className="bg-[#EEE9FF] px-5 py-12 sm:px-10 sm:py-14 lg:px-[88px]">
        <div className="mx-auto max-w-[1440px]">
          <h1 className="text-[clamp(2rem,4vw,2.125rem)] font-extrabold leading-[1.24] tracking-[-0.04em]">Cerita kamu tetap milikmu</h1>
          <p className="mt-2 max-w-[700px] text-[15px] leading-6 text-[#6F6B80]">Dokumen singkat tentang data yang UNFOLD simpan, alasan penggunaannya, dan pilihan yang kamu punya.</p>
          <p className="mt-2 text-xs leading-[18px] text-[#6F6B80]">Terakhir diperbarui 26 September 2026</p>
          <Link href="/" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-[14px] border border-[#DAD4F2] bg-white/70 px-4 text-sm font-semibold text-[#3E6FCB] hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B8DEF]">
            <ArrowLeft size={16} weight="bold" />
            Kembali ke beranda
          </Link>
        </div>
      </section>

      <section className="px-5 py-10 sm:px-10 sm:py-12 lg:px-[88px] lg:py-12">
        <div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[280px_minmax(0,944px)] lg:gap-10">
          <aside className="h-fit rounded-[24px] border border-[#E8E5F0] bg-white p-6 lg:sticky lg:top-6">
            <h2 className="text-xl font-bold leading-7 tracking-[-0.02em]">Di halaman ini</h2>
            <nav className="mt-5" aria-label="Daftar isi kebijakan privasi">
              <ol className="divide-y divide-[#E8E5F0]">
                {sections.map((section) => (
                  <li key={section.number}>
                    <a href={`#section-${section.number}`} className="group flex min-h-12 items-center gap-3 py-2 text-[15px] leading-6 text-[#6F6B80] transition-colors hover:text-[#25233A]">
                      <span className="text-xs font-semibold tabular-nums text-[#3E6FCB]">{section.number}</span>
                      <span className="transition-transform group-hover:translate-x-0.5">{section.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <article className="flex flex-col gap-9 rounded-[24px] border border-[#E8E5F0] bg-white p-6 sm:p-8 lg:p-10">
            {sections.map((section) => (
              <section key={section.number} id={`section-${section.number}`} className="scroll-mt-8">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EEE9FF] text-[13px] font-semibold leading-[18px] text-[#3E6FCB]">{section.number}</span>
                  <h2 className="text-2xl font-bold leading-8 tracking-[-0.02em]">{section.title}</h2>
                </div>
                <p className="mt-2.5 text-[15px] leading-6 text-[#6F6B80]">{section.text}</p>
              </section>
            ))}
          </article>
        </div>
      </section>

      <footer className="bg-[#25233A] px-5 py-12 text-white sm:px-10 lg:px-[88px] lg:py-14">
        <div className="mx-auto max-w-[1264px]">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-sm">
              <Link href="/" className="flex min-h-11 items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7DD3B0]" aria-label="UNFOLD">
                <Image src="/figma/unfold-mark.svg" alt="" width={34} height={34} />
                <span className="text-xl font-extrabold tracking-[-0.03em] text-white">UNFOLD</span>
              </Link>
              <p className="mt-4 text-sm leading-6 text-white/65">Ruang pribadi untuk mengenali perasaan, menulis isi pikiran, dan menyimpan kemajuan kecil.</p>
            </div>
            <nav className="flex flex-wrap gap-x-7 gap-y-2 text-sm" aria-label="Tautan footer">
              <Link href="/login" className="inline-flex min-h-11 items-center font-semibold text-white/80 hover:text-white">Masuk</Link>
              <Link href="/register" className="inline-flex min-h-11 items-center font-semibold text-white/80 hover:text-white">Buat akun</Link>
              <Link href="/support" className="inline-flex min-h-11 items-center font-semibold text-white/80 hover:text-white">Dukungan</Link>
              <Link href="/privacy-policy" className="inline-flex min-h-11 items-center font-semibold text-white/80 hover:text-white">Kebijakan Privasi</Link>
            </nav>
          </div>
          <div className="mt-10 flex flex-col gap-3 border-t border-white/15 pt-6 text-xs leading-5 text-white/50 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 UNFOLD</p>
            <p>UNFOLD bukan layanan diagnosis atau terapi.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
