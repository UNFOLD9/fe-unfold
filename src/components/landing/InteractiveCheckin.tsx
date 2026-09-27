"use client";

import { useState } from "react";
import Link from "next/link";

interface MoodOption {
  id: string;
  emoji: string;
  label: string;
  color: string;
  bgActive: string;
  borderActive: string;
  affirmation: string;
  prompt: string;
}

const moods: MoodOption[] = [
  {
    id: "tenang",
    emoji: "🌿",
    label: "Tenang",
    color: "#7DD3B0",
    bgActive: "bg-[#7DD3B0]/15",
    borderActive: "border-[#7DD3B0]",
    affirmation: "Pertahankan kedamaian ini. Nikmati ritme napasmu yang perlahan.",
    prompt: "Apa satu momen kecil hari ini yang membuat hatimu merasa lapang?",
  },
  {
    id: "bersyukur",
    emoji: "✨",
    label: "Bersyukur",
    color: "#F6D66B",
    bgActive: "bg-[#F6D66B]/20",
    borderActive: "border-[#F6D66B]",
    affirmation: "Menyadari hal baik sekecil apa pun akan menjadi penguat langkahmu.",
    prompt: "Kebaikan apa yang kamu terima atau bagikan kepada orang lain hari ini?",
  },
  {
    id: "lelah",
    emoji: "☁️",
    label: "Lelah",
    color: "#A78BFA",
    bgActive: "bg-[#A78BFA]/15",
    borderActive: "border-[#A78BFA]",
    affirmation: "Tubuh dan pikiranmu sudah berjuang seharian. Beristirahat bukanlah kemunduran.",
    prompt: "Apa beban yang bisa kamu lepaskan sejenak sebelum tidur malam ini?",
  },
  {
    id: "cemas",
    emoji: "🌧️",
    label: "Cemas",
    color: "#5B8DEF",
    bgActive: "bg-[#5B8DEF]/15",
    borderActive: "border-[#5B8DEF]",
    affirmation: "Kamu tidak harus mencari semua jalan keluar saat ini. Kamu aman di sini.",
    prompt: "Jika kekhawatiran ini bisa bicara, apa sebenarnya yang ia butuhkan darimu?",
  },
  {
    id: "bersemangat",
    emoji: "☀️",
    label: "Bersemangat",
    color: "#FFB38A",
    bgActive: "bg-[#FFB38A]/20",
    borderActive: "border-[#FFB38A]",
    affirmation: "Salurkan energi positif ini ke hal-hal yang benar-benar bermakna bagimu.",
    prompt: "Langkah kecil apa yang paling ingin kamu wujudkan hari ini?",
  },
];

export default function InteractiveCheckin() {
  const [selectedMood, setSelectedMood] = useState<MoodOption>(moods[0]);
  const [reflectionText, setReflectionText] = useState("");
  const [savedPreview, setSavedPreview] = useState(false);

  const handleSaveSimulated = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reflectionText.trim()) return;
    setSavedPreview(true);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto">
      {/* Decorative blurred backdrops */}
      <div className="absolute -top-6 -left-6 w-36 h-36 bg-[#A78BFA]/25 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-[#7DD3B0]/25 rounded-full blur-2xl pointer-events-none" />

      {/* Card container */}
      <div className="relative bg-white/90 backdrop-blur-xl border border-[#E8E5F0] rounded-3xl p-6 sm:p-8 shadow-xl shadow-[#25233A]/5 transition-all">
        {/* Card Header */}
        <div className="flex items-center justify-end pb-5 border-b border-[#E8E5F0]/70 mb-6">
          <span className="text-xs px-3 py-1 rounded-full bg-[#F8F7FC] text-[#6F6B80] font-medium border border-[#E8E5F0]">
            Hari ini • 3 menit
          </span>
        </div>

        {/* Question */}
        <div className="mb-5">
          <h3 className="text-lg sm:text-xl font-bold text-[#25233A]">
            Bagaimana kabarmu saat ini?
          </h3>
          <p className="text-xs sm:text-sm text-[#6F6B80] mt-1">
            Pilih perasaan yang paling mendekati hatimu sekarang:
          </p>
        </div>

        {/* Mood Selector Buttons */}
        <div className="grid grid-cols-5 gap-2 sm:gap-3 mb-6">
          {moods.map((item) => {
            const isSelected = selectedMood.id === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setSelectedMood(item);
                  setSavedPreview(false);
                }}
                className={`flex flex-col items-center justify-center py-3 px-1 rounded-2xl border transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? `${item.bgActive} ${item.borderActive} shadow-sm scale-105`
                    : "bg-[#F8F7FC] border-[#E8E5F0] hover:bg-white hover:border-[#6F6B80]/30"
                }`}
              >
                <span className="text-2xl sm:text-3xl mb-1 select-none">
                  {item.emoji}
                </span>
                <span
                  className={`text-[11px] sm:text-xs font-semibold ${
                    isSelected ? "text-[#25233A]" : "text-[#6F6B80]"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Affirmation Box */}
        <div
          className="rounded-2xl p-4 mb-6 border transition-all duration-300"
          style={{
            backgroundColor: `${selectedMood.color}18`,
            borderColor: `${selectedMood.color}40`,
          }}
        >
          <div className="flex items-start gap-3">
            <span className="text-lg">💌</span>
            <div>
              <p className="text-xs font-semibold text-[#25233A] mb-0.5">
                Pesan untukmu:
              </p>
              <p className="text-xs sm:text-sm text-[#25233A]/90 italic leading-relaxed">
                &ldquo;{selectedMood.affirmation}&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Reflection Prompt / Simulation */}
        {!savedPreview ? (
          <form onSubmit={handleSaveSimulated} className="space-y-3">
            <label className="block text-xs font-medium text-[#25233A]">
              Prompt Refleksi:{" "}
              <span className="text-[#6F6B80] font-normal">
                {selectedMood.prompt}
              </span>
            </label>
            <div className="relative">
              <textarea
                value={reflectionText}
                onChange={(e) => setReflectionText(e.target.value)}
                placeholder="Tuliskan isi pikiranmu di sini secara bebas..."
                rows={3}
                className="w-full px-4 py-3 rounded-2xl border border-[#E8E5F0] bg-[#F8F7FC] text-sm text-[#25233A] placeholder-[#6F6B80]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5B8DEF]/20 focus:border-[#5B8DEF] transition-all resize-none"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-[#6F6B80] flex items-center gap-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                Tersimpan di ruang privatmu
              </span>

              <button
                type="submit"
                disabled={!reflectionText.trim()}
                className="text-xs font-semibold px-4 py-2 rounded-xl bg-[#5B8DEF] hover:bg-[#4a7de0] disabled:opacity-40 disabled:pointer-events-none text-white transition-all shadow-sm active:scale-95"
              >
                Simpan Catatan
              </button>
            </div>
          </form>
        ) : (
          <div className="bg-[#7DD3B0]/10 border border-[#7DD3B0]/40 rounded-2xl p-5 text-center space-y-3 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-10 h-10 mx-auto rounded-full bg-[#7DD3B0]/20 flex items-center justify-center text-[#25233A] font-bold">
              ✓
            </div>
            <div>
              <p className="text-sm font-bold text-[#25233A]">
                Terima kasih sudah meluangkan waktu untuk dirimu.
              </p>
              <p className="text-xs text-[#6F6B80] mt-1">
                Di UNFOLD, seluruh catatan refleksimu tersusun rapi dengan enkripsi penuh.
              </p>
            </div>
            <div className="pt-2">
              <Link
                href="/register"
                className="inline-block text-xs font-semibold text-white bg-[#5B8DEF] hover:bg-[#4a7de0] px-5 py-2.5 rounded-full transition-all shadow-sm"
              >
                Buat Akun untuk Simpan Refleksi Permanen →
              </Link>
            </div>
          </div>
        )}

        {/* Footer gentle info */}
        <div className="mt-5 pt-4 border-t border-[#E8E5F0]/70 flex items-center justify-between text-[11px] text-[#6F6B80]">
          <span>🌿 Tidak ada streak yang menghukummu</span>
          <span>🔒 100% Aman & Terenkripsi</span>
        </div>
      </div>
    </div>
  );
}
