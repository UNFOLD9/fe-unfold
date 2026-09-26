import Link from 'next/link';
import {
  ArrowLeft,
  ArrowUpRight,
  CaretDown,
  House,
  LockKey,
} from '@phosphor-icons/react/dist/ssr';
import SupportHeader from '@/app/_components/support-header';

const questions = [
  {
    title: 'Apa fungsi UNFOLD?',
    answer:
      'UNFOLD membantu kamu mencatat check-in emosi, menulis isi pikiran, dan menyimpan small wins. Aplikasi ini bukan alat diagnosis atau pengganti tenaga profesional.',
  },
  {
    title: 'Kenapa aku kembali ke halaman masuk?',
    answer:
      'Sesi masuk bisa berakhir setelah waktu tertentu atau saat cookie dihapus. Masuk kembali untuk membuka data di My Space.',
  },
  {
    title: 'Siapa yang bisa melihat catatanku?',
    answer:
      'Catatan terhubung ke akunmu dan hanya dimuat setelah autentikasi. Jangan bagikan kata sandi atau token sesi kepada siapa pun.',
  },
  {
    title: 'Bagaimana menghapus catatan?',
    answer:
      'Buka My Space, pilih catatan yang ingin dihapus, lalu konfirmasi. Penghapusan bersifat permanen.',
  },
];

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-[#F8F7FC] text-[#25233A]">
      <SupportHeader />

      <section className="overflow-hidden border-b border-[#E8E5F0] bg-[#EEEAFB]">
        <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-10">
          <div>
            <h1 className="max-w-2xl text-3xl font-bold leading-tight tracking-[-0.03em] sm:text-4xl">
              Pelan-pelan, kita cari jalan keluarnya.
            </h1>
            <p className="mt-3 max-w-xl text-base leading-7 text-[#6F6B80] sm:text-lg">
              Jawaban untuk akun, catatan refleksi, dan perjalananmu di UNFOLD.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-5xl gap-8 px-5 py-8 sm:px-8 sm:py-10 lg:grid-cols-[.78fr_1.22fr]">
        <aside className="h-fit rounded-3xl border border-[#E8E5F0] bg-white p-5 sm:p-6 lg:sticky lg:top-6">
          <h2 className="text-lg font-bold">Bantuan cepat</h2>
          <nav className="mt-4 space-y-2" aria-label="Jalur cepat bantuan">
            <Link href="/home" className="group flex min-h-12 items-center justify-between rounded-2xl px-3 py-2 text-sm font-semibold transition-colors hover:bg-[#F0F4FF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B8DEF]">
              <span className="flex items-center gap-3"><House size={20} className="text-[#5B8DEF]" aria-hidden="true" />Mulai check-in</span>
              <ArrowUpRight size={18} className="text-[#9A94AA] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
            <Link href="/my-space" className="group flex min-h-12 items-center justify-between rounded-2xl px-3 py-2 text-sm font-semibold transition-colors hover:bg-[#EEF9F5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B8DEF]">
              <span className="flex items-center gap-3"><LockKey size={20} className="text-[#4A8C6F]" aria-hidden="true" />Buka My Space</span>
              <ArrowUpRight size={18} className="text-[#9A94AA] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
            <Link href="/login" className="group flex min-h-12 items-center justify-between rounded-2xl px-3 py-2 text-sm font-semibold transition-colors hover:bg-[#FFF4EE] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B8DEF]">
              <span className="flex items-center gap-3"><ArrowLeft size={20} className="text-[#E28D5E]" aria-hidden="true" />Kembali masuk</span>
              <ArrowUpRight size={18} className="text-[#9A94AA] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </nav>
          <div className="mt-6 border-t border-[#E8E5F0] pt-5">
            <p className="text-sm leading-6 text-[#6F6B80]">UNFOLD adalah ruang refleksi. Untuk kondisi darurat, hubungi layanan darurat resmi di wilayahmu.</p>
          </div>
        </aside>

        <section aria-labelledby="faq-title">
          <h2 id="faq-title" className="text-2xl font-bold tracking-[-0.02em] sm:text-3xl">Pertanyaan umum</h2>
          <div className="mt-6 divide-y divide-[#E8E5F0] overflow-hidden rounded-3xl border border-[#E8E5F0] bg-white">
            {questions.map((question) => (
              <details key={question.title} className="group px-5 sm:px-6">
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-4 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B8DEF] [&::-webkit-details-marker]:hidden">
                  {question.title}
                  <CaretDown size={19} className="shrink-0 text-[#9A94AA] transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <p className="max-w-2xl pb-5 pr-7 text-sm leading-6 text-[#6F6B80]">{question.answer}</p>
              </details>
            ))}
          </div>
          <div className="mt-6 rounded-3xl border border-[#C5EBE0] bg-[#EAF8F3] p-5 sm:p-6">
            <p className="text-sm font-semibold text-[#28684E]">Masih belum menemukan yang kamu cari?</p>
            <p className="mt-2 text-sm leading-6 text-[#3E6758]">Catat halaman dan langkah terakhir yang kamu lakukan. Detail itu membantu saat masalah perlu ditelusuri lebih lanjut.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
