export default function Features() {
  const features = [
    {
      title: "Daily Mood Check-in",
      tag: "Kesadaran Emosi",
      description:
        "Sederhanakan pemahaman tentang perasaanmu hari ini dengan spektrum emosi yang intuitif. Kenali ritme energi tubuh dan pikiranmu tanpa rumit.",
      color: "#5B8DEF",
      bgLight: "bg-[#5B8DEF]/10",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[#5B8DEF]"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
          <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="3" />
          <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="3" />
        </svg>
      ),
      previewUI: (
        <div className="bg-white rounded-2xl p-4 border border-[#E8E5F0] shadow-sm space-y-3">
          <div className="flex items-center justify-between text-xs text-[#6F6B80]">
            <span>Energi Hari Ini</span>
            <span className="font-semibold text-[#5B8DEF]">Tenang & Hadir</span>
          </div>
          <div className="w-full bg-[#F8F7FC] h-3 rounded-full overflow-hidden flex">
            <div className="bg-[#7DD3B0] w-[45%]" />
            <div className="bg-[#5B8DEF] w-[30%]" />
            <div className="bg-[#F6D66B] w-[25%]" />
          </div>
          <div className="flex justify-between text-[10px] text-[#6F6B80]">
            <span>🌿 Tenang 45%</span>
            <span>💧 Fokus 30%</span>
            <span>☀️ Senang 25%</span>
          </div>
        </div>
      ),
    },
    {
      title: "Refleksi Terpandu & Prompt Kurasi",
      tag: "Jurnal Mandiri",
      description:
        "Sering kali kita ingin menulis tapi terhalang oleh layar putih kosong. UNFOLD menyediakan pertanyaan terarah yang membuka percakapan bermakna dengan dirimu sendiri.",
      color: "#A78BFA",
      bgLight: "bg-[#A78BFA]/10",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[#A78BFA]"
        >
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
          <path d="M6 6h10" />
          <path d="M6 10h10" />
          <path d="M6 14h6" />
        </svg>
      ),
      previewUI: (
        <div className="bg-white rounded-2xl p-4 border border-[#E8E5F0] shadow-sm space-y-2.5">
          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#A78BFA]/15 text-[#A78BFA] font-semibold">
              Ketenangan Pikiran
            </span>
          </div>
          <p className="text-xs font-semibold text-[#25233A]">
            &ldquo;Apa hal yang sedang berada di luar kendalimu, dan bisakah kamu berdamai dengannya?&rdquo;
          </p>
          <div className="text-[11px] text-[#6F6B80] italic bg-[#F8F7FC] p-2 rounded-xl border border-[#E8E5F0]">
            Hari ini aku belajar bahwa tidak semua perkataan orang lain harus menjadi tanggung jawabku...
          </div>
        </div>
      ),
    },
    {
      title: "Small Wins & Gratitude Jar",
      tag: "Apresiasi Diri",
      description:
        "Di tengah hiruk pikuk hidup, kita sering lupa memberi selamat pada diri sendiri. Kumpulkan pencapaian kecil setiap hari untuk menumbuhkan rasa syukur yang kokoh.",
      color: "#F6D66B",
      bgLight: "bg-[#F6D66B]/15",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[#E5B520]"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
      previewUI: (
        <div className="bg-white rounded-2xl p-4 border border-[#E8E5F0] shadow-sm space-y-2">
          <div className="text-xs font-semibold text-[#25233A] flex items-center justify-between">
            <span>Kemenangan Kecil Hari Ini</span>
            <span className="text-xs">🌻</span>
          </div>
          <div className="space-y-1.5 text-xs text-[#25233A]">
            <div className="flex items-center gap-2 p-1.5 rounded-lg bg-[#F8F7FC]">
              <span className="text-xs text-[#7DD3B0]">✓</span>
              <span>Berani berkata tidak pada pekerjaan lembur</span>
            </div>
            <div className="flex items-center gap-2 p-1.5 rounded-lg bg-[#F8F7FC]">
              <span className="text-xs text-[#7DD3B0]">✓</span>
              <span>Minum 2 liter air dan jalan sore 15 menit</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Insight Emosi Lembut",
      tag: "Pemahaman Diri",
      description:
        "UNFOLD merangkum pola emosimu tanpa angka-angka dingin yang membuat stres. Lihat momen apa yang paling sering memberimu ketenangan atau kelelahan.",
      color: "#FFB38A",
      bgLight: "bg-[#FFB38A]/15",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[#FF8D50]"
        >
          <path d="M3 3v18h18" />
          <path d="m19 9-5 5-4-4-3 3" />
        </svg>
      ),
      previewUI: (
        <div className="bg-white rounded-2xl p-4 border border-[#E8E5F0] shadow-sm space-y-2">
          <div className="text-xs font-semibold text-[#25233A]">
            Rangkuman Minggu Ini
          </div>
          <p className="text-xs text-[#6F6B80] leading-relaxed">
            &ldquo;Kamu merasa paling rileks saat menghabiskan waktu di pagi hari tanpa gadget. Terus rawat ruang tenangmu ya!&rdquo;
          </p>
          <div className="pt-1 flex items-center gap-2 text-[10px] text-[#6F6B80]">
            <span className="px-2 py-0.5 rounded-full bg-[#7DD3B0]/15 text-[#25233A]">
              +30% Lebih Lapang
            </span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="fitur" className="py-20 lg:py-28 bg-[#F8F7FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#25233A] tracking-tight">
            Semua yang kamu butuhkan untuk <br className="hidden sm:inline" />
            mendengarkan suaramu sendiri.
          </h2>
          <p className="text-base sm:text-lg text-[#6F6B80]">
            Dirancang sederhana agar kamu tidak terbebani oleh fitur yang rumit.
            Fokus hanya pada apa yang penting: kesejahteraanmu.
          </p>
        </div>

        {/* 2x2 Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-[#E8E5F0] hover:border-[#6F6B80]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#25233A]/5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div
                    className={`w-14 h-14 rounded-2xl ${feature.bgLight} flex items-center justify-center`}
                  >
                    {feature.icon}
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#F8F7FC] text-[#6F6B80] border border-[#E8E5F0]">
                    {feature.tag}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#25233A] mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-[#6F6B80] leading-relaxed mb-6">
                  {feature.description}
                </p>
              </div>

              {/* In-Card Interactive/Visual Mockup */}
              <div className="pt-2">{feature.previewUI}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
