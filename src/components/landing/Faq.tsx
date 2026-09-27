"use client";

import { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "Apakah UNFOLD gratis digunakan?",
    answer:
      "Ya, seluruh fitur esensial UNFOLD seperti Daily Mood Check-In, Guided Prompts, dan Small Wins dapat kamu akses sepenuhnya secara gratis.",
  },
  {
    question: "Bagaimana UNFOLD menjaga kerahasiaan catatan refleksiku?",
    answer:
      "Privasi adalah pondasi utama kami. Jurnal dan emosimu adalah ruang pribadimu. Data dienkripsi secara ketat dan kami tidak pernah menjual atau membagikan data pribadimu kepada pihak ketiga.",
  },
  {
    question: "Apakah UNFOLD menggantikan sesi terapi atau bantuan profesional?",
    answer:
      "Tidak. UNFOLD adalah alat bantu refleksi mandiri (self-reflection tool) untuk menemani keseharianmu. Jika kamu sedang menghadapi krisis kesehatan mental atau membutuhkan bantuan klinis, kami sangat menganjurkan untuk berkonsultasi dengan psikolog atau psikiater berlisensi.",
  },
  {
    question: "Apa yang terjadi jika saya lupa atau tidak sempat mengisi jurnal?",
    answer:
      "Sama sekali tidak masalah! Kami percaya refleksi tidak boleh menjadi beban baru. Tidak ada hukuman, tidak ada notifikasi yang memaksa, dan tidak ada penghitung streak yang patah. UNFOLD selalu siap menyambutmu kapan pun kamu ingin kembali.",
  },
  {
    question: "Apakah saya bisa menggunakan UNFOLD di smartphone saya?",
    answer:
      "Tentu saja. UNFOLD dibangun dengan desain responsif modern yang sangat nyaman diakses melalui peramban di ponsel pintar, tablet, maupun komputer desktop.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-white border-t border-[#E8E5F0]/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#25233A] tracking-tight">
            Semua yang perlu kamu ketahui.
          </h2>
          <p className="text-base text-[#6F6B80]">
            Punya pertanyaan lain? Kami siap membantumu menemukan jawabannya.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-[#E8E5F0] rounded-2xl overflow-hidden transition-all bg-[#F8F7FC]"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-semibold text-[#25233A] hover:text-[#5B8DEF] transition-colors"
                >
                  <span className="text-base sm:text-lg">{faq.question}</span>
                  <span
                    className={`shrink-0 w-8 h-8 rounded-full bg-white border border-[#E8E5F0] flex items-center justify-center text-sm transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#5B8DEF]" : "text-[#6F6B80]"
                    }`}
                  >
                    ▼
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-[#6F6B80] leading-relaxed border-t border-[#E8E5F0]/50 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
