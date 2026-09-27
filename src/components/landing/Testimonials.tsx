export default function Testimonials() {
  const reviews = [
    {
      name: "Althea Clarissa",
      role: "Mahasiswa Tingkat Akhir",
      avatar: "🌸",
      quote:
        "Sebelumnya aku sering stres kalau bolong menulis jurnal karena ada streak counter di aplikasi lain. UNFOLD sangat berbeda—tidak ada rasa bersalah, hanya ruang aman saat aku butuh jeda.",
      tag: "Tanpa Tekanan",
      moodColor: "border-[#A78BFA]",
    },
    {
      name: "Dimas Pratama",
      role: "Product Designer",
      avatar: "🌿",
      quote:
        "Prompt harian di UNFOLD luar biasa membantu saat kepalaku penuh beban kerja. Menulis selama 3 menit sebelum tidur membuat kualitas tidurku jauh lebih tenang.",
      tag: "Prompt Reflektif",
      moodColor: "border-[#7DD3B0]",
    },
    {
      name: "Nadira Putri",
      role: "Content Creator & Freelancer",
      avatar: "✨",
      quote:
        "Fitur Small Wins membuatku sadar bahwa hal-hal sederhana seperti berani istirahat atau minum cukup air adalah pencapaian yang layak dihargai. Tampilan warnanya juga sangat menenangkan!",
      tag: "Apresiasi Diri",
      moodColor: "border-[#F6D66B]",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#F8F7FC] border-t border-[#E8E5F0]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#25233A] tracking-tight">
            Menemukan ketenangan di tengah hiruk-pikuk.
          </h2>
          <p className="text-base sm:text-lg text-[#6F6B80]">
            Bagaimana teman-teman pengguna menemukan ruang aman dan kedamaian
            bersama UNFOLD.
          </p>
        </div>

        {/* Testimonials Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-3xl p-8 border border-[#E8E5F0] hover:shadow-xl hover:shadow-[#25233A]/5 transition-all duration-300 flex flex-col justify-between relative`}
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#F8F7FC] flex items-center justify-center text-lg border border-[#E8E5F0]">
                      {rev.avatar}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#25233A]">
                        {rev.name}
                      </h3>
                      <p className="text-xs text-[#6F6B80]">{rev.role}</p>
                    </div>
                  </div>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#F8F7FC] text-[#6F6B80] border border-[#E8E5F0]">
                    {rev.tag}
                  </span>
                </div>

                <p className="text-sm text-[#25233A]/85 italic leading-relaxed">
                  &ldquo;{rev.quote}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E8E5F0]/60 flex items-center gap-1 text-[#F6D66B] text-xs">
                <span>★★★★★</span>
                <span className="text-[#6F6B80] ml-2 text-[11px]">Terverifikasi</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
