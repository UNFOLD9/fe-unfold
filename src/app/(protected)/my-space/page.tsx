'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { apiGet, apiDelete } from '@/lib/api';
import type { EmotionalCheckIn, MindEntry, SmallWin, ApiResponse } from '@/types';
import { useToast, ToastContainer } from '@/components/Toast';
import { Trash } from '@phosphor-icons/react';
import DeleteDialog from '@/app/_components/delete-dialog';
import HomeNavbar from '@/components/home/HomeNavbar';

// ── Default Mock Data (Matching Figma / Mockup Screenshots) ─────────────────
const initialCheckIns: EmotionalCheckIn[] = [
  {
    id: 'ci-1',
    userId: 'u1',
    emotion: 'calm',
    intensity: 2,
    triggerNote: null,
    createdAt: '2026-09-23T10:00:00Z',
  },
  {
    id: 'ci-2',
    userId: 'u1',
    emotion: 'anxious',
    intensity: 4,
    triggerNote: null,
    createdAt: '2026-09-20T10:00:00Z',
  },
  {
    id: 'ci-3',
    userId: 'u1',
    emotion: 'tired',
    intensity: 3,
    triggerNote: null,
    createdAt: '2026-09-17T10:00:00Z',
  },
];

const initialMindEntries: MindEntry[] = [
  {
    id: 'me-1',
    userId: 'u1',
    content:
      'Hari ini terasa penuh, tapi aku berhasil menyelesaikan satu hal penting tanpa memaksa diri.',
    isSaved: true,
    createdAt: '2026-09-22T10:00:00Z',
    updatedAt: '2026-09-22T10:00:00Z',
  },
  {
    id: 'me-2',
    userId: 'u1',
    content: 'Aku ingin memberi ruang untuk istirahat tanpa merasa bersalah.',
    isSaved: true,
    createdAt: '2026-09-18T10:00:00Z',
    updatedAt: '2026-09-18T10:00:00Z',
  },
  {
    id: 'me-3',
    userId: 'u1',
    content: 'Besok aku mau memulai dengan satu tugas yang paling ringan.',
    isSaved: true,
    createdAt: '2026-09-15T10:00:00Z',
    updatedAt: '2026-09-15T10:00:00Z',
  },
];

const initialSmallWins: SmallWin[] = [
  {
    id: 'sw-1',
    userId: 'u1',
    title: 'Menyelesaikan tugas sebelum tenggat',
    description: null,
    category: 'Akademik',
    winDate: '2026-09-23T10:00:00Z',
    createdAt: '2026-09-23T10:00:00Z',
    updatedAt: '2026-09-23T10:00:00Z',
  },
  {
    id: 'sw-2',
    userId: 'u1',
    title: 'Berani memilih untuk istirahat',
    description: null,
    category: 'Diri sendiri',
    winDate: '2026-09-21T10:00:00Z',
    createdAt: '2026-09-21T10:00:00Z',
    updatedAt: '2026-09-21T10:00:00Z',
  },
  {
    id: 'sw-3',
    userId: 'u1',
    title: 'Menghubungi teman lebih dulu',
    description: null,
    category: 'Relasi',
    winDate: '2026-09-19T10:00:00Z',
    createdAt: '2026-09-19T10:00:00Z',
    updatedAt: '2026-09-19T10:00:00Z',
  },
];

// ── Emotion config ────────────────────────────────────────────────────────────
const emotionConf: Record<string, { label: string; color: string; badgeBg: string; badgeText: string }> = {
  calm:        { label: 'Tenang',    color: '#45C992', badgeBg: '#E8F8F2', badgeText: '#2E7D5A' },
  anxious:     { label: 'Cemas',     color: '#FFA87E', badgeBg: '#FFF0E8', badgeText: '#C25E27' },
  tired:       { label: 'Lelah',     color: '#9A8CF6', badgeBg: '#F0EEFC', badgeText: '#6C52C7' },
  happy:       { label: 'Senang',    color: '#5B8DEF', badgeBg: '#EBF2FF', badgeText: '#2B66CC' },
  sad:         { label: 'Sedih',     color: '#FFA275', badgeBg: '#FFF0E8', badgeText: '#C25E27' },
  empty:       { label: 'Hampa',     color: '#9CA3AF', badgeBg: '#F3F4F6', badgeText: '#4B5563' },
  angry:       { label: 'Marah',     color: '#F87171', badgeBg: '#FEE2E2', badgeText: '#B91C1C' },
  overwhelmed: { label: 'Kewalahan', color: '#F472B6', badgeBg: '#FCE7F3', badgeText: '#9D174D' },
};

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

// ── Delete Dialog Target ──────────────────────────────────────────────────────
type DelTarget = { id: string; type: 'ci' | 'me' | 'sw'; label: string; date: string };

// ── Page Component ────────────────────────────────────────────────────────────
export default function MySpacePage() {
  const { user } = useAuth();
  const { toasts, addToast, removeToast } = useToast();

  const [checkIns,    setCheckIns]    = useState<EmotionalCheckIn[]>(initialCheckIns);
  const [mindEntries, setMindEntries] = useState<MindEntry[]>(initialMindEntries);
  const [smallWins,   setSmallWins]   = useState<SmallWin[]>(initialSmallWins);
  const [loading,     setLoading]     = useState(false);
  const [errMsg,      setErrMsg]      = useState<string | null>(null);
  const [del,         setDel]         = useState<DelTarget | null>(null);
  const [delLoad,     setDelLoad]     = useState(false);

  const fetchAll = async () => {
    try {
      const [ci, me, sw] = await Promise.all([
        apiGet('/api/emotional-check-ins') as Promise<ApiResponse<EmotionalCheckIn[]>>,
        apiGet('/api/mind-entries')        as Promise<ApiResponse<MindEntry[]>>,
        apiGet('/api/small-wins')          as Promise<ApiResponse<SmallWin[]>>,
      ]);
      if (ci?.success && Array.isArray(ci.data) && ci.data.length > 0) {
        setCheckIns(ci.data);
      }
      if (me?.success && Array.isArray(me.data) && me.data.length > 0) {
        setMindEntries(me.data);
      }
      if (sw?.success && Array.isArray(sw.data) && sw.data.length > 0) {
        setSmallWins(sw.data);
      }
    } catch {
      // Keep fallback initial data on error
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const confirmDelete = async () => {
    if (!del) return;
    setDelLoad(true);
    const ep = {
      ci: `/api/emotional-check-ins/${del.id}`,
      me: `/api/mind-entries/${del.id}`,
      sw: `/api/small-wins/${del.id}`,
    };
    try {
      await apiDelete(ep[del.type]);
    } catch {
      // Local removal regardless for preview demo
    }
    if (del.type === 'ci') setCheckIns((p) => p.filter((x) => x.id !== del.id));
    if (del.type === 'me') setMindEntries((p) => p.filter((x) => x.id !== del.id));
    if (del.type === 'sw') setSmallWins((p) => p.filter((x) => x.id !== del.id));
    addToast('success', 'Berhasil dihapus.');
    setDelLoad(false);
    setDel(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9FD] text-[#25233A]">
      <HomeNavbar />
      <ToastContainer toasts={toasts} onClose={removeToast} />

      {del && (
        <DeleteDialog
          label={del.label}
          date={del.date}
          onConfirm={confirmDelete}
          onCancel={() => setDel(null)}
          loading={delLoad}
        />
      )}

      {/* ── Hero Banner (Mint Green) ── */}
      <section className="w-full bg-[#EDFAF4] border-b border-[#E1F3EB]">
        <div className="mx-auto max-w-5xl px-5 py-7 sm:px-8 sm:py-9">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[11px] sm:text-xs font-bold tracking-[0.18em] uppercase text-[#4D8068] mb-1.5">
                YOUR SPACE
              </p>
              <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#25233A] tracking-[-0.02em] mb-1.5">
                My Space
              </h1>
              <p className="text-xs sm:text-sm text-[#5C7A6A] leading-relaxed">
                Semua refleksi pribadimu, tersimpan rapi di satu tempat.
              </p>
            </div>

            {/* 3 Colored Squircles (Desktop only) */}
            <div className="hidden sm:flex items-center gap-3 shrink-0">
              <span className="w-12 h-12 lg:w-14 lg:h-14 rounded-[18px] bg-[#9A8CF6] shadow-sm" />
              <span className="w-12 h-12 lg:w-14 lg:h-14 rounded-[18px] bg-[#FFA87E] shadow-sm" />
              <span className="w-12 h-12 lg:w-14 lg:h-14 rounded-[18px] bg-[#F7D260] shadow-sm" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Content Area ── */}
      <main className="flex-1 mx-auto w-full max-w-5xl px-5 py-6 sm:px-8 sm:py-8 space-y-6 sm:space-y-7">
        {/* Error Notification */}
        {errMsg && (
          <div className="rounded-2xl p-4 flex items-center justify-between gap-3 bg-[#FEE2E2] border border-[#FCA5A5] text-sm text-[#991B1B]">
            <span>⚠️ {errMsg}</span>
            <button
              onClick={fetchAll}
              className="text-xs px-3 py-1.5 rounded-xl bg-[#FCA5A5] text-[#7F1D1D] font-medium hover:bg-[#F87171] transition-colors"
            >
              Coba lagi
            </button>
          </div>
        )}

        {/* ── Ringkasan ruangmu ── */}
        <section aria-labelledby="summary-heading">
          <h2
            id="summary-heading"
            className="text-base sm:text-lg font-bold text-[#25233A] mb-3 sm:mb-4 tracking-[-0.01em]"
          >
            Ringkasan ruangmu
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {/* Check-in Summary */}
            <div className="rounded-[22px] p-5 sm:p-5.5 bg-[#F0EEFC] border border-[#E6E0F8] transition-transform hover:-translate-y-0.5">
              <p className="text-xs font-semibold text-[#6F6B80] mb-1">Check-in</p>
              <p className="text-3xl sm:text-4xl font-extrabold text-[#9A8CF6] leading-none mb-1.5">
                4
              </p>
              <p className="text-xs text-[#9A94AA]">bulan ini</p>
            </div>

            {/* Tulisan tersimpan Summary */}
            <div className="rounded-[22px] p-5 sm:p-5.5 bg-[#FFF1EB] border border-[#FDE5D9] transition-transform hover:-translate-y-0.5">
              <p className="text-xs font-semibold text-[#6F6B80] mb-1">Tulisan tersimpan</p>
              <p className="text-3xl sm:text-4xl font-extrabold text-[#FFA87E] leading-none mb-1.5">
                2
              </p>
              <p className="text-xs text-[#9A94AA]">refleksi pribadi</p>
            </div>

            {/* Small wins Summary */}
            <div className="rounded-[22px] p-5 sm:p-5.5 bg-[#EDFAF4] border border-[#DCF4EA] transition-transform hover:-translate-y-0.5">
              <p className="text-xs font-semibold text-[#6F6B80] mb-1">Small wins</p>
              <p className="text-3xl sm:text-4xl font-extrabold text-[#45C992] leading-none mb-1.5">
                3
              </p>
              <p className="text-xs text-[#9A94AA]">layak dirayakan</p>
            </div>
          </div>
        </section>

        {/* ── Section: Check-in terbaru ── */}
        <section
          aria-labelledby="checkin-heading"
          className="rounded-[26px] p-5 sm:p-6 bg-[#F0EEFC] border border-[#E6E0F8]"
        >
          <div className="flex items-center justify-between gap-2 mb-1">
            <div>
              <h2
                id="checkin-heading"
                className="text-base sm:text-lg font-bold text-[#25233A] tracking-[-0.01em]"
              >
                Check-in terbaru
              </h2>
              <p className="text-xs text-[#7E7A91] mt-0.5">
                <span className="sm:hidden">Perasaan terakhir.</span>
                <span className="hidden sm:inline">Perasaan yang terakhir kamu catat.</span>
              </p>
            </div>

            <button
              type="button"
              className="rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-[#25233A] shadow-sm hover:bg-[#FAF9FD] transition-colors shrink-0"
            >
              <span className="sm:hidden">Semua</span>
              <span className="hidden sm:inline">Lihat semua</span>
            </button>
          </div>

          <div className="mt-4 space-y-2.5">
            {checkIns.slice(0, 5).map((ci) => {
              const conf = emotionConf[ci.emotion.toLowerCase()] ?? {
                label: ci.emotion.charAt(0).toUpperCase() + ci.emotion.slice(1),
                color: '#9A8CF6',
                badgeBg: '#F0EEFC',
                badgeText: '#6C52C7',
              };
              return (
                <div
                  key={ci.id}
                  className="group flex items-center justify-between gap-3 rounded-[18px] bg-white px-4 sm:px-5 py-3.5 shadow-sm border border-[#EAE6F8]/60 transition-all hover:border-[#9A8CF6]/30"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: conf.color }}
                    />
                    <div className="min-w-0">
                      <p className="text-sm sm:text-base font-bold text-[#25233A] truncate">
                        {conf.label}
                      </p>
                      <p className="text-xs text-[#9A94AA] mt-0.5">
                        {fmtDate(ci.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className="rounded-full px-3 py-1 text-xs font-semibold"
                      style={{ backgroundColor: conf.badgeBg, color: conf.badgeText }}
                    >
                      Intensitas {ci.intensity}/5
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setDel({
                          id: ci.id,
                          type: 'ci',
                          label: 'check-in emosi',
                          date: fmtDate(ci.createdAt),
                        })
                      }
                      className="opacity-0 group-hover:opacity-100 p-1 rounded-lg text-[#9A94AA] hover:text-red-500 hover:bg-red-50 transition-all"
                      title="Hapus check-in"
                    >
                      <Trash size={15} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Section: Tulisan tersimpan ── */}
        <section
          aria-labelledby="reflections-heading"
          className="rounded-[26px] p-5 sm:p-6 bg-[#FFF1EB] border border-[#FDE5D9]"
        >
          <div className="flex items-center justify-between gap-2 mb-1">
            <div>
              <h2
                id="reflections-heading"
                className="text-base sm:text-lg font-bold text-[#25233A] tracking-[-0.01em]"
              >
                Tulisan tersimpan
              </h2>
              <p className="text-xs text-[#7E7A91] mt-0.5">
                <span className="sm:hidden">Refleksi pribadimu.</span>
                <span className="hidden sm:inline">Refleksi pribadi dari Unload Your Mind.</span>
              </p>
            </div>

            <button
              type="button"
              className="rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-[#25233A] shadow-sm hover:bg-[#FAF9FD] transition-colors shrink-0"
            >
              <span className="sm:hidden">Semua</span>
              <span className="hidden sm:inline">Lihat semua</span>
            </button>
          </div>

          <div className="mt-4 space-y-2.5">
            {mindEntries.slice(0, 5).map((me) => (
              <div
                key={me.id}
                className="rounded-[18px] border border-[#FED8C3] bg-white/40 p-4 sm:p-5 transition-all hover:bg-white/70"
              >
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-[#9A94AA] font-medium">
                    {fmtDate(me.createdAt)}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setDel({
                        id: me.id,
                        type: 'me',
                        label: 'tulisan tersimpan',
                        date: fmtDate(me.createdAt),
                      })
                    }
                    className="font-semibold text-[#25233A] hover:text-red-500 transition-colors"
                  >
                    Hapus
                  </button>
                </div>
                <p className="text-sm sm:text-base text-[#25233A] leading-relaxed">
                  {me.content}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section: Small wins ── */}
        <section
          aria-labelledby="smallwins-heading"
          className="rounded-[26px] p-5 sm:p-6 bg-[#F7D260] border border-[#F4C947]"
        >
          <div className="flex items-center justify-between gap-2 mb-1">
            <div>
              <h2
                id="smallwins-heading"
                className="text-base sm:text-lg font-bold text-[#25233A] tracking-[-0.01em]"
              >
                Small wins
              </h2>
              <p className="text-xs text-[#78641D] mt-0.5">
                <span className="sm:hidden">Kemajuan kecilmu.</span>
                <span className="hidden sm:inline">Kemajuan kecil yang sudah kamu rayakan.</span>
              </p>
            </div>

            <button
              type="button"
              className="rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-[#25233A] shadow-sm hover:bg-[#FAF9FD] transition-colors shrink-0"
            >
              <span className="sm:hidden">Semua</span>
              <span className="hidden sm:inline">Lihat semua</span>
            </button>
          </div>

          <div className="mt-4 space-y-2.5">
            {smallWins.slice(0, 5).map((sw) => (
              <div
                key={sw.id}
                className="group flex items-center justify-between gap-3 rounded-[18px] bg-white px-4 sm:px-5 py-3.5 shadow-sm border border-[#EAE6D0]/60 transition-all hover:border-[#F7D260]"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <span className="w-3 h-3 rounded-full bg-[#F5C738] shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm sm:text-base font-bold text-[#25233A] truncate">
                      {sw.title}
                    </p>
                    <p className="text-xs text-[#9A94AA] mt-0.5">
                      {fmtDate(sw.winDate || sw.createdAt)}
                      {sw.category ? ` • ${sw.category}` : ''}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setDel({
                      id: sw.id,
                      type: 'sw',
                      label: 'small win',
                      date: fmtDate(sw.winDate || sw.createdAt),
                    })
                  }
                  className="opacity-0 group-hover:opacity-100 p-1 rounded-lg text-[#9A94AA] hover:text-red-500 hover:bg-red-50 transition-all shrink-0"
                  title="Hapus small win"
                >
                  <Trash size={15} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="pt-6 sm:pt-8 pb-4 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-[#E8E5F0]/60 text-xs text-[#9A94AA]">
          <p className="text-center sm:text-left">
            UNFOLD bukan layanan diagnosis atau terapi.
          </p>
          <Link
            href="/support"
            className="text-[#5B8DEF] font-semibold hover:underline transition-colors"
          >
            Dukungan
          </Link>
        </footer>
      </main>
    </div>
  );
}
