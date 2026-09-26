'use client';

import Link from 'next/link';

// Data kartu dukungan — masing-masing punya warna & background sendiri
const supportCards = [
  {
    dot:       '#7DD3B0',   // hijau solid
    bg:        '#E6F7F1',   // mint hijau terang (sesuai Figma card 1 & 3)
    border:    '#C5EBE0',
    title:     'Layanan kampus',
    desc:      'Cari informasi konseling atau pendampingan resmi dari kampusmu.',
    cta:       'Lihat informasi kampus',
    ctaBg:     '#FFFFFF',
    ctaBorder: '#C5EBE0',
  },
  {
    dot:       '#A78BFA',   // ungu/lavender solid
    bg:        '#EDE9FA',   // lavender terang (sesuai Figma card 2)
    border:    '#D4CCEF',
    title:     'Profesional terverifikasi',
    desc:      'Pertimbangkan psikolog atau konselor melalui layanan kesehatan jiwa yang aman.',
    cta:       'Cari layanan resmi',
    ctaBg:     '#FFFFFF',
    ctaBorder: '#D4CCEF',
  },
  {
    dot:       '#7DD3B0',   // hijau solid (sama dengan card 1)
    bg:        '#E6F7F1',   // mint hijau terang (sama dengan card 1)
    border:    '#C5EBE0',
    title:     'Orang yang kamu percaya',
    desc:      'Bicarakan kondisimu dengan teman, keluarga, atau dosen yang aman.',
    cta:       'Rencanakan percakapan',
    ctaBg:     '#FFFFFF',
    ctaBorder: '#C5EBE0',
  },
];


const smallSteps = [
  'Tarik napas perlahan dan duduk di tempat yang terasa aman.',
  'Kirim pesan singkat kepada satu orang yang kamu percaya.',
  'Tunda keputusan besar sampai kondisimu lebih stabil.',
];

export default function SupportPage() {
  return (
    <div style={{ backgroundColor: '#F8F7FC', minHeight: '100vh' }}>

      {/* ── Hero — lavender ── */}
      <div style={{ backgroundColor: '#EDE9FA' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10 relative overflow-hidden">
          {/* Lingkaran hijau dekorasi — kanan atas */}
          <div
            className="absolute rounded-full"
            style={{
              width: 80, height: 80,
              backgroundColor: '#7DD3B0',
              right: 40, top: 24,
            }}
          />
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: '#7B6FAA' }}>
            SUPPORT
          </p>
          <h1
            className="text-2xl sm:text-3xl font-bold leading-snug mb-2"
            style={{ color: '#25233A', maxWidth: 440 }}
          >
            Kamu tidak harus menghadapi semuanya sendiri.
          </h1>
          <p className="text-sm" style={{ color: '#6F6B80' }}>
            Temukan pilihan dukungan yang aman dan sesuai kebutuhanmu.
          </p>
        </div>
      </div>

      {/* ── Konten utama ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* ── Disclaimer ── */}
        <div
          className="rounded-2xl p-4 sm:p-5"
          style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E5F0', display: 'flex', gap: 16, alignItems: 'flex-start' }}
        >
          {/* Dot biru — 20px sesuai Figma */}
          <span
            className="shrink-0"
            style={{ width: 20, height: 20, borderRadius: '50%', backgroundColor: '#5B8DEF', marginTop: 2, display: 'block' }}
          />
          <div>
            <p className="font-semibold text-sm mb-1" style={{ color: '#25233A' }}>
              UNFOLD adalah ruang refleksi, bukan layanan terapi
            </p>
            <p className="text-sm leading-relaxed" style={{ color: '#6F6B80' }}>
              UNFOLD tidak memberikan diagnosis atau menyarankan tindakan profesional.
              Gunakan aplikasi ini untuk memahami dan memperkuat perasaan dan perkembangan pribadimu.
            </p>
          </div>
        </div>

        {/* ── Pilih dukungan ── */}
        <div>
          <h2 className="font-semibold text-base mb-1" style={{ color: '#25233A' }}>
            Pilih dukungan yang terasa paling memungkinkan
          </h2>
          <p className="text-sm mb-4" style={{ color: '#6F6B80' }}>
            Kamu bisa memulai dari langkah yang paling ringan.
          </p>

          {/* 3 kartu — stacked mobile, row desktop */}
          <div className="flex flex-col sm:flex-row gap-3">
            {supportCards.map(({ dot, bg, border, title, desc, cta, ctaBg, ctaBorder }) => (
              <div
                key={title}
                className="flex-1 rounded-2xl p-4 sm:p-5"
                style={{
                  backgroundColor: bg,
                  border: `1px solid ${border}`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                }}
              >
                {/* Dot — 20px solid circle sesuai Figma */}
                <span
                  style={{
                    width: 20, height: 20,
                    borderRadius: '50%',
                    backgroundColor: dot,
                    display: 'block',
                    flexShrink: 0,
                  }}
                />
                <h3 className="font-semibold text-sm" style={{ color: '#25233A' }}>{title}</h3>
                <p className="text-sm leading-relaxed flex-1" style={{ color: '#6F6B80', fontSize: 13 }}>{desc}</p>
                <button
                  className="text-xs font-medium rounded-xl transition-colors hover:opacity-80"
                  style={{
                    backgroundColor: ctaBg,
                    color: '#25233A',
                    border: `1px solid ${ctaBorder}`,
                    padding: '6px 12px',
                    textAlign: 'left',
                  }}
                >
                  {cta}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ── Emergency — merah muda ── */}
        <div
          className="rounded-2xl p-4 sm:p-5"
          style={{ backgroundColor: '#FFF0F0', border: '1px solid #FECDCD' }}
        >
          <h2 className="font-semibold text-sm mb-1.5" style={{ color: '#C53030' }}>
            Jika kamu merasa tidak aman sekarang
          </h2>
          <p className="text-sm leading-relaxed mb-3" style={{ color: '#4A1212' }}>
            Segera hubungi layanan darurat resmi di wilayahmu atau datangi fasilitas kesehatan
            terdekat. Jika memungkinkan, tetap bersama orang yang kamu percaya.
          </p>
          <a
            href="https://www.kemkes.go.id"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold transition-opacity hover:opacity-70"
            style={{ color: '#E53E3E' }}
          >
            Cari layanan darurat resmi
          </a>
        </div>

        {/* ── Langkah kecil ── */}
        <div>
          <h2 className="font-semibold text-base mb-3" style={{ color: '#25233A' }}>
            Langkah kecil untuk saat ini
          </h2>
          {/* 3 kotak — stacked mobile, row desktop */}
          <div className="flex flex-col sm:flex-row gap-3">
            {smallSteps.map((tip, i) => (
              <div
                key={i}
                className="flex-1 rounded-2xl p-4"
                style={{ backgroundColor: '#E6F7F1', border: '1px solid #C5EBE0' }}
              >
                <p className="text-sm leading-relaxed" style={{ color: '#25233A', fontSize: 13 }}>{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="flex items-center justify-between py-2">
          <p className="text-xs" style={{ color: '#9CA3AF' }}>
            UNFOLD bukan layanan diagnosis atau terapi
          </p>
          <Link href="/support" className="text-xs" style={{ color: '#5B8DEF' }}>
            Dukungan
          </Link>
        </div>

      </div>
    </div>
  );
}
