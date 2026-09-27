export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Luangkan 3 Menit",
      subtitle: "Buka UNFOLD kapan pun kamu butuh jeda.",
      description:
        "Pilih spektrum emosi yang menggambarkan perasaanmu hari ini. Tanpa harus berpikir rumit atau mencari kata-kata yang sempurna.",
      badge: "Sederhana",
      color: "#5B8DEF",
    },
    {
      number: "02",
      title: "Jawab Pertanyaan Reflektif",
      subtitle: "Biarkan prompt memandu aliran pikiranmu.",
      description:
        "Gunakan prompt terarah untuk mengurai kecemasan, merekam rasa syukur, atau mengenali apa yang sebenarnya kamu butuhkan saat ini.",
      badge: "Terarah",
      color: "#A78BFA",
    },
    {
      number: "03",
      title: "Tutup Hari dengan Tenang",
      subtitle: "Simpan refleksi dan biarkan pikiran beristirahat.",
      description:
        "Lepaskan beban yang tidak perlu. UNFOLD menjaga setiap catatanmu tetap privat, membantumu melihat kemajuan kecil seiring waktu.",
      badge: "Bermakna",
      color: "#7DD3B0",
    },
  ];

  return (
    <section id="cara-kerja" className="py-20 lg:py-28 bg-white border-t border-[#E8E5F0]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#25233A] tracking-tight">
            Tiga langkah sederhana menuju pikiran yang lebih jernih.
          </h2>
          <p className="text-base sm:text-lg text-[#6F6B80]">
            Tidak membutuhkan waktu berjam-jam. Cukup beberapa menit setiap hari
            untuk menyapa diri sendiri.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="relative bg-[#F8F7FC] rounded-3xl p-8 border border-[#E8E5F0] hover:border-[#6F6B80]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#25233A]/5 flex flex-col justify-between"
            >
              <div>
                {/* Step Number & Badge */}
                <div className="flex items-center justify-between mb-6">
                  <span
                    className="text-3xl font-extrabold"
                    style={{ color: step.color }}
                  >
                    {step.number}
                  </span>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white text-[#25233A] border border-[#E8E5F0]">
                    {step.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#25233A] mb-1">
                  {step.title}
                </h3>
                <h4 className="text-xs font-medium text-[#5B8DEF] mb-4">
                  {step.subtitle}
                </h4>
                <p className="text-sm text-[#6F6B80] leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#E8E5F0]/60 flex items-center justify-between text-xs text-[#6F6B80]">
                <span>Langkah {idx + 1} dari 3</span>
                <span className="text-sm">➔</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
