import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';

const moods = [
  { name: 'Senang', src: '/images/Emotion/Senang.svg', selected: false },
  { name: 'Tenang', src: '/images/Emotion/Tenang/Tenang.svg', selected: false },
  { name: 'Cemas', src: '/images/Emotion/Cemas.svg', selected: false },
  { name: 'Lelah', src: '/images/Emotion/Lelah.svg', selected: true },
] as const;

function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link href="/" className="flex min-h-11 items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5B8DEF]" aria-label="UNFOLD">
      <Image src="/figma/unfold-mark.svg" alt="" width={34} height={34} />
      <span className={`text-xl font-extrabold tracking-[-0.03em] ${inverse ? 'text-white' : ''}`}>UNFOLD</span>
    </Link>
  );
}

export default function LandingPage() {
  return (
    <main className="bg-[#F8F7FC] text-[#25233A]">
      <header className="bg-white/70">
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 sm:h-24 sm:px-10 lg:px-[88px]">
          <Logo />
          <nav className="flex items-center gap-2 sm:gap-3" aria-label="Autentikasi">
            <Link href="/login" className="inline-flex min-h-11 items-center justify-center rounded-[14px] border border-[#E8E5F0] bg-white px-4 text-sm font-semibold hover:border-[#5B8DEF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B8DEF] sm:px-5">Masuk</Link>
            <Link href="/register" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[14px] border border-[#5B8DEF] bg-[#5B8DEF] px-4 text-sm font-semibold text-white hover:bg-[#4F80DF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B8DEF] sm:px-5">Mulai refleksi <ArrowRight size={16} weight="bold" /></Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto flex max-w-[1440px] flex-col items-center gap-12 px-5 py-14 sm:px-10 lg:min-h-[650px] lg:flex-row lg:justify-between lg:gap-16 lg:px-[88px] lg:py-16">
        <div className="w-full max-w-[610px]">
          <h1 className="text-[clamp(2.4rem,5vw,3.375rem)] font-extrabold leading-[1.22] tracking-[-0.045em]">Berhenti sejenak. Dengarkan diri. Lanjutkan dengan lebih ringan.</h1>
          <p className="mt-[22px] max-w-[575px] text-base leading-7 text-[#6F6B80] sm:text-lg sm:leading-[30px]">UNFOLD membantu kamu mengenali perasaan, menulis tanpa penilaian, dan mengingat kemajuan kecil yang sering terlewat.</p>
          <Link href="/register" className="mt-[22px] inline-flex min-h-12 items-center justify-center gap-2 rounded-[15px] bg-[#5B8DEF] px-6 text-base font-semibold text-white hover:bg-[#4F80DF] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#5B8DEF]">Mulai refleksi <ArrowRight size={18} weight="bold" /></Link>
          <p className="mt-[22px] text-[13px] leading-[22px] text-[#6F6B80]">Pribadi. Tanpa analisis AI. Bukan layanan diagnosis atau terapi.</p>
        </div>

        <div className="w-full max-w-[500px] rounded-[32px] bg-[#A78BFA] p-5 sm:p-[34px]">
          <p className="mb-5 text-sm font-semibold text-white">Check-in hari ini</p>
          <div className="rounded-[24px] bg-white p-5 sm:p-7">
            <h2 className="max-w-[360px] text-2xl font-bold leading-[34px]">Bagaimana perasaanmu sekarang?</h2>
            <div className="mt-5 grid grid-cols-4 gap-2" aria-label="Contoh pilihan emosi">
              {moods.map((item) => (
                <div key={item.name} className={`flex min-w-0 flex-col items-center rounded-[18px] border px-1 py-3 ${item.selected ? 'border-[#5B8DEF] bg-[#F2EDFF]' : 'border-transparent'}`}>
                  <Image src={item.src} alt="" width={50} height={50} />
                  <span className={`mt-2 text-xs ${item.selected ? 'font-bold' : 'font-normal'}`}>{item.name}</span>
                </div>
              ))}
            </div>
            <p className="mt-5 text-[13px] text-[#6F6B80]">Intensitas perasaan</p>
            <div className="mt-3" aria-hidden="true">
              <div className="relative h-6">
                <div className="absolute top-2.5 h-2 w-full rounded-full bg-[#E8E5F0]" />
                <div className="absolute top-2.5 h-2 w-[55%] rounded-full bg-[#5B8DEF]" />
                <div className="absolute left-[55%] top-0 h-7 w-7 -translate-x-1/2 rounded-full border-2 border-[#5B8DEF] bg-white" />
              </div>
              <div className="mt-1 flex justify-between text-[11px] text-[#6F6B80]"><span>Ringan</span><span>Kuat</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-10 lg:px-[88px] lg:py-[72px]">
        <div className="mx-auto max-w-[1264px]">
          <h2 className="max-w-[760px] text-[clamp(2rem,4vw,2.25rem)] font-bold leading-[1.28] tracking-[-0.035em]">Satu ruang, tiga cara untuk kembali ke diri sendiri.</h2>
          <p className="mt-5 max-w-[720px] text-base leading-[26px] text-[#6F6B80]">Pilih langkah yang paling ringan hari ini. Tidak ada target, streak, atau penilaian.</p>
          <div className="mt-7 grid gap-6 lg:grid-cols-[608fr_632fr]">
            <Link href="/pause/check-in" className="flex min-h-[390px] flex-col overflow-hidden rounded-[24px] bg-[#A78BFA] px-7 py-8 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#5B8DEF] sm:px-9">
              <h3 className="text-3xl font-bold tracking-[-0.035em]">Kenali perasaanmu</h3>
              <p className="mt-[18px] max-w-[480px] text-base leading-[25px]">Pilih emosi, beri intensitas, lalu tambahkan catatan singkat bila kamu mau.</p>
              <Image src="/figma/emotional-path.svg" alt="" width={500} height={120} className="mt-auto h-auto max-w-full" />
              <span className="mt-3 text-[15px] font-semibold">Mulai check-in</span>
            </Link>
            <div className="grid gap-6">
              <Link href="/pause/unload" className="flex min-h-[183px] flex-col rounded-[24px] bg-[#FFB38A] px-7 py-7 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#5B8DEF] sm:px-[30px]">
                <h3 className="text-2xl font-bold">Tuangkan isi pikiran</h3>
                <p className="mt-3 text-sm leading-[21px]">Tulis pribadi, simpan bila perlu, atau buang tanpa jejak.</p>
              </Link>
              <Link href="/discover/small-wins" className="flex min-h-[183px] flex-col rounded-[24px] bg-[#F6D66B] px-7 py-7 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#5B8DEF] sm:px-[30px]">
                <h3 className="text-2xl font-bold">Catat kemenangan kecil</h3>
                <p className="mt-3 text-sm leading-[21px]">Simpan langkah kecil yang berhasil kamu lakukan, sesederhana apa pun.</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#7DD3B0] px-5 py-14 sm:px-10 lg:px-[88px]">
        <div className="mx-auto flex max-w-[1264px] flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-[clamp(2rem,4vw,2.25rem)] font-bold tracking-[-0.035em]">Cerita kamu tetap milikmu.</h2>
            <p className="mt-4 max-w-[650px] text-base leading-[26px]">Catatanmu bersifat pribadi dan hanya bisa diakses melalui akunmu.</p>
          </div>
          <Image src="/figma/private-reflection.svg" alt="" width={100} height={100} />
        </div>
      </section>

      <footer className="bg-[#25233A] px-5 py-12 text-white sm:px-10 lg:px-[88px] lg:py-14">
        <div className="mx-auto max-w-[1264px]">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-sm">
              <Logo inverse />
              <p className="mt-4 text-sm leading-6 text-white/65">Ruang pribadi untuk mengenali perasaan, menulis isi pikiran, dan menyimpan kemajuan kecil.</p>
            </div>
            <nav className="flex flex-wrap gap-x-7 gap-y-2 text-sm" aria-label="Tautan footer">
              <Link href="/login" className="inline-flex min-h-11 items-center font-semibold text-white/80 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7DD3B0]">Masuk</Link>
              <Link href="/register" className="inline-flex min-h-11 items-center font-semibold text-white/80 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7DD3B0]">Buat akun</Link>
              <Link href="/support" className="inline-flex min-h-11 items-center font-semibold text-white/80 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7DD3B0]">Dukungan</Link>
              <button type="button" disabled className="inline-flex min-h-11 cursor-not-allowed items-center font-semibold text-white/40">Kebijakan Privasi</button>
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
