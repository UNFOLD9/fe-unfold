export default function Philosophy() {
  const points = [
    {
      badge: "Kelembutan",
      badgeColor: "bg-[#A78BFA]/15 text-[#A78BFA] border-[#A78BFA]/30",
      title: "Tanpa Tekanan 'Streak'",
      description:
        "Jika kamu melewatkan satu hari atau satu minggu, tidak ada skor yang hilang. UNFOLD selalu menyambutmu kembali dengan hangat, kapan pun kamu siap.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[#A78BFA]"
        >
          <path d="M12 21a9 9 0 0 0 9-9 9 9 0 0 0-9-9 9 9 0 0 0-9 9 9 9 0 0 0 9 9Z" />
          <path d="M12 7v5l3 3" />
        </svg>
      ),
    },
    {
      badge: "Kejujuran",
      badgeColor: "bg-[#7DD3B0]/20 text-[#25233A] border-[#7DD3B0]/40",
      title: "Bebas dari Penghakiman",
      description:
        "Tidak ada emosi yang salah. Marah, cemas, atau lelah adalah manusiawi. UNFOLD membantumu menamai emosi tersebut tanpa menghakimi dirimu sendiri.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[#7DD3B0]"
        >
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      ),
    },
    {
      badge: "Privasi",
      badgeColor: "bg-[#5B8DEF]/15 text-[#5B8DEF] border-[#5B8DEF]/30",
      title: "Ruang Privat Sejati",
      description:
        "Cerita dan perasaanmu hanya milikmu. Data refleksi tersimpan dengan aman, bebas dari pelacak pihak ketiga atau dorongan validasi media sosial.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[#5B8DEF]"
        >
          <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      ),
    },
  ];

  return (
    <section id="keunggulan" className="py-20 lg:py-28 bg-white border-y border-[#E8E5F0]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#25233A] tracking-tight">
            Dunia bergerak terlalu cepat. <br className="hidden sm:inline" />
            Ambil jeda sejenak untuk dirimu.
          </h2>
          <p className="text-base sm:text-lg text-[#6F6B80] leading-relaxed">
            UNFOLD dirancang bukan untuk menuntut produktivitas lebih, melainkan
            membantumu memulihkan keharmonisan dengan diri sendiri setiap hari.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {points.map((pt, idx) => (
            <div
              key={idx}
              className="bg-[#F8F7FC] rounded-3xl p-8 border border-[#E8E5F0] hover:border-[#6F6B80]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#25233A]/5 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-xs flex items-center justify-center group-hover:scale-110 transition-transform">
                    {pt.icon}
                  </div>
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full border ${pt.badgeColor}`}
                  >
                    {pt.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#25233A] mb-3">
                  {pt.title}
                </h3>
                <p className="text-sm text-[#6F6B80] leading-relaxed">
                  {pt.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#E8E5F0]/60 flex items-center text-xs font-semibold text-[#5B8DEF] group-hover:translate-x-1 transition-transform">
                <span>Pelajari pendekatan kami →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
