"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { apiGet } from "@/lib/api";
import HomeNavbar from "@/components/home/HomeNavbar";
import WaveIllustration from "@/components/home/WaveIllustration";
import { CheckInItem, LatestCheckInResponse } from "@/types/checkin";

export default function HomePage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  
  const [latestCheckIn, setLatestCheckIn] = useState<CheckInItem | null>(null);
  const [loadingCheckIn, setLoadingCheckIn] = useState(true);

  // Fetch latest check-in data from GET /api/check-ins/latest
  useEffect(() => {
    let isMounted = true;

    async function fetchLatestCheckIn() {
      try {
        const res = (await apiGet("/api/check-ins/latest")) as LatestCheckInResponse;
        if (isMounted) {
          if (res && res.success && res.data) {
            setLatestCheckIn(res.data);
          } else {
            setLatestCheckIn(null);
          }
        }
      } catch (err) {
        if (isMounted) {
          setLatestCheckIn(null);
        }
      } finally {
        if (isMounted) {
          setLoadingCheckIn(false);
        }
      }
    }

    if (!authLoading) {
      fetchLatestCheckIn();
    }

    return () => {
      isMounted = false;
    };
  }, [authLoading]);

  // Auth redirection check
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [authLoading, user, router]);

  // Helper function to format check-in mood icon and label
  const getMoodDetails = (moodName: string) => {
    const normalized = (moodName || "").toLowerCase();
    switch (normalized) {
      case "tenang":
      case "calm":
        return { emoji: "🌿", label: "Tenang", color: "#7DD3B0", bg: "bg-[#7DD3B0]/15" };
      case "bersyukur":
      case "grateful":
        return { emoji: "✨", label: "Bersyukur", color: "#F6D66B", bg: "bg-[#F6D66B]/20" };
      case "lelah":
      case "tired":
      case "exhausted":
        return { emoji: "☁️", label: "Lelah", color: "#A78BFA", bg: "bg-[#A78BFA]/15" };
      case "cemas":
      case "anxious":
        return { emoji: "🌧️", label: "Cemas", color: "#5B8DEF", bg: "bg-[#5B8DEF]/15" };
      case "bersemangat":
      case "senang":
      case "happy":
        return { emoji: "☀️", label: "Bersemangat", color: "#FFB38A", bg: "bg-[#FFB38A]/20" };
      default:
        return { emoji: "🌸", label: moodName || "Refleksi", color: "#5B8DEF", bg: "bg-[#5B8DEF]/15" };
    }
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    try {
      const date = new Date(dateStr);
      return new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    } catch {
      return dateStr;
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#F8F7FC] flex flex-col">
        <HomeNavbar />
        <div className="mx-auto w-full max-w-[1440px] flex-1 space-y-8 px-5 py-10 sm:px-10 lg:px-[88px]">
          <div className="h-64 animate-pulse rounded-[24px] bg-[#EDE9FA]/60" />
          <div className="h-28 animate-pulse rounded-[24px] bg-white" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-80 animate-pulse rounded-[24px] bg-white" />
            <div className="space-y-6">
              <div className="h-36 animate-pulse rounded-[24px] bg-white" />
              <div className="h-36 animate-pulse rounded-[24px] bg-white" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const userName = user?.name ? user.name.split(" ")[0] : "Teman";

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7FC] text-[#25233A]">
      {/* Top Navigation */}
      <HomeNavbar />

      <main className="flex-1 pb-[72px]">
        {/* ── 1. Hero Greeting Banner ── */}
        <section className="border-b border-[#E8E5F0] bg-[#F2EDFF] py-12 sm:py-16">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-10 lg:px-[88px]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Copy & CTA */}
              <div className="lg:col-span-7 space-y-4 text-left">
                <span className="text-sm sm:text-base font-semibold text-[#5B8DEF]">
                  Hai, {userName}.
                </span>
                
                <h1 className="text-[clamp(2.25rem,4vw,3rem)] font-extrabold leading-[1.2] tracking-[-0.045em] text-[#25233A]">
                  Apa yang kamu butuhkan hari ini?
                </h1>

                <p className="text-sm sm:text-base text-[#6F6B80] max-w-xl leading-relaxed pt-1">
                  Tidak perlu langsung tahu jawabannya. Mulai dengan satu check-in singkat.
                </p>

                <div className="pt-3">
                  <Link
                    href="/pause"
                    className="inline-flex min-h-12 items-center justify-center rounded-[15px] bg-[#5B8DEF] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#4F80DF] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#5B8DEF] sm:text-base"
                  >
                    Check-in sekarang
                  </Link>
                </div>
              </div>

              {/* Right Illustration Card (Desktop only) */}
              <div className="hidden lg:block lg:col-span-5">
                <div className="flex h-[210px] flex-col justify-between rounded-[24px] border border-[#E8E5F0] bg-white p-7">
                  <h2 className="text-base font-bold text-[#25233A]">
                    Mulai dari yang paling ringan.
                  </h2>
                  <div className="pt-2 flex justify-center items-center">
                    <WaveIllustration className="w-full max-w-[280px] h-auto" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Container */}
        <div className="mx-auto mt-12 max-w-[1440px] space-y-14 px-5 sm:px-10 lg:px-[88px]">
          
          {/* ── 2. Check-in Terbaru Section ── */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-[#25233A]">
              Check-in terbaru
            </h2>

            {loadingCheckIn ? (
              <div className="flex h-24 animate-pulse items-center gap-4 rounded-[24px] border border-[#E8E5F0] bg-white p-6">
                <div className="w-12 h-12 rounded-full bg-[#EDE9FA]" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-[#EDE9FA] rounded w-1/4" />
                  <div className="h-3 bg-[#EDE9FA] rounded w-1/2" />
                </div>
              </div>
            ) : latestCheckIn ? (
              /* State: Has Latest Check-In */
              (() => {
                const moodInfo = getMoodDetails(latestCheckIn.mood);
                return (
                  <div className="flex flex-col justify-between gap-4 rounded-[24px] border border-[#E8E5F0] bg-white p-6 transition-colors hover:border-[#5B8DEF] sm:flex-row sm:items-center sm:p-7">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-full ${moodInfo.bg} flex items-center justify-center text-2xl shrink-0`}
                      >
                        {moodInfo.emoji}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-[#25233A]">
                            {moodInfo.label}
                          </h3>
                          <span className="text-xs text-[#6F6B80] px-2 py-0.5 rounded-full bg-[#F8F7FC] border border-[#E8E5F0]">
                            {formatDate(latestCheckIn.createdAt)}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-[#6F6B80] mt-1 line-clamp-1">
                          {latestCheckIn.notes || latestCheckIn.note || latestCheckIn.reflection || latestCheckIn.summary || "Kamu telah menyelesaikan check-in hari ini."}
                        </p>
                      </div>
                    </div>

                    <Link
                      href="/my-space"
                      className="text-xs sm:text-sm font-semibold text-[#5B8DEF] hover:underline self-end sm:self-center shrink-0"
                    >
                      Lihat di My Space →
                    </Link>
                  </div>
                );
              })()
            ) : (
              /* State: Empty Check-In (Matches Figma 1:1) */
              <div className="flex items-center gap-4 rounded-[24px] border border-[#E8E5F0] bg-white p-6 sm:p-7">
                {/* Neutral Face Icon */}
                <div className="w-12 h-12 rounded-full bg-[#EDE9FA] flex items-center justify-center text-[#25233A] shrink-0">
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
                    className="text-[#6F6B80]"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="8" y1="15" x2="16" y2="15" />
                    <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="3" />
                    <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="3" />
                  </svg>
                </div>

                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#25233A]">
                    Belum ada check-in hari ini
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6F6B80] mt-0.5">
                    Setelah kamu menyimpan check-in, ringkasannya akan muncul di sini.
                  </p>
                </div>
              </div>
            )}
          </section>

          {/* ── 3. Pilih Ruang Untukmu Section (3 Quick Action Cards) ── */}
          <section className="space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#25233A]">
                Pilih ruang untukmu
              </h2>
              <p className="text-sm sm:text-base text-[#6F6B80] mt-1">
                Tiga langkah sederhana. Kamu bebas memilih sesuai energi hari ini.
              </p>
            </div>

            {/* Action Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Card 1 (Large / Left): PAUSE / Check-in emosi */}
              <div className="group relative flex flex-col justify-between overflow-hidden rounded-[24px] bg-[#A78BFA] p-7 sm:p-9 lg:col-span-6">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-widest text-[#25233A]/70">
                    PAUSE
                  </span>
                  
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#25233A] mt-2 mb-2">
                    Check-in emosi
                  </h3>
                  
                  <p className="text-sm text-[#25233A]/85 max-w-md leading-relaxed">
                    Kenali apa yang kamu rasakan dalam beberapa menit.
                  </p>
                </div>

                {/* Wave graphic on Pause card */}
                <div className="my-6 flex justify-center items-center">
                  <WaveIllustration
                    lineColor="#E8E5F0"
                    className="w-full max-w-[280px] h-auto opacity-95 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div>
                  <Link
                    href="/pause"
                    className="inline-block text-sm font-bold text-[#25233A] hover:underline"
                  >
                    Mulai check-in
                  </Link>
                </div>
              </div>

              {/* Right Column (2 Stacked Cards): UNLOAD & DISCOVER */}
              <div className="lg:col-span-6 flex flex-col gap-6">
                
                {/* Card 2: UNLOAD / Tuangkan isi pikiran */}
                <div className="group flex flex-1 flex-col justify-between rounded-[24px] bg-[#FFB38A] p-7 sm:p-8">
                  <div>
                    <span className="text-xs font-extrabold uppercase tracking-widest text-[#25233A]/70">
                      UNLOAD
                    </span>
                    
                    <h3 className="text-xl sm:text-2xl font-bold text-[#25233A] mt-2 mb-2">
                      Tuangkan isi pikiran
                    </h3>
                    
                    <p className="text-sm text-[#25233A]/85 leading-relaxed">
                      Tulis tanpa penilaian di ruang privat.
                    </p>
                  </div>

                  <div className="pt-6">
                    <Link
                      href="/unload"
                      className="inline-block text-sm font-bold text-[#25233A] hover:underline"
                    >
                      Mulai menulis
                    </Link>
                  </div>
                </div>

                {/* Card 3: DISCOVER / Catat kemenangan kecil */}
                <div className="group flex flex-1 flex-col justify-between rounded-[24px] bg-[#F6D66B] p-7 sm:p-8">
                  <div>
                    <span className="text-xs font-extrabold uppercase tracking-widest text-[#25233A]/70">
                      DISCOVER
                    </span>
                    
                    <h3 className="text-xl sm:text-2xl font-bold text-[#25233A] mt-2 mb-2">
                      Catat kemenangan kecil
                    </h3>
                    
                    <p className="text-sm text-[#25233A]/85 leading-relaxed">
                      Simpan hal baik yang sering terlewat.
                    </p>
                  </div>

                  <div className="pt-6">
                    <Link
                      href="/small-wins"
                      className="inline-block text-sm font-bold text-[#25233A] hover:underline"
                    >
                      Tambah kemenangan
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* ── 4. Semua Refleksimu, di Satu Tempat Card ── */}
          <section>
            <div className="flex flex-col items-start justify-between gap-6 rounded-[24px] bg-[#7DD3B0] p-7 sm:flex-row sm:items-center sm:p-10">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-bold text-[#25233A]">
                  Semua refleksimu, di satu tempat.
                </h2>
                <p className="text-xs sm:text-sm text-[#6F6B80]">
                  Lihat check-in, tulisan tersimpan, dan kemenangan kecil di My Space.
                </p>
              </div>

              <Link
                href="/my-space"
                className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-[15px] bg-[#25233A] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#343149] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#25233A]"
              >
                Buka My Space
              </Link>
            </div>
          </section>

        </div>
      </main>

      {/* ── 5. Simple Footer Bar ── */}
      <footer className="bg-[#25233A] px-5 py-8 text-white sm:px-10 lg:px-[88px]">
        <div className="mx-auto flex max-w-[1264px] flex-col gap-3 text-xs text-white/65 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 UNFOLD · Bukan layanan diagnosis atau terapi.</p>
          <Link href="/support" className="inline-flex min-h-11 items-center font-semibold text-white/80 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7DD3B0]">
            Dukungan
          </Link>
        </div>
      </footer>
    </div>
  );
}
