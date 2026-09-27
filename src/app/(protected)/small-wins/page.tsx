'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { apiGet, apiPost, apiDelete } from '@/lib/api';
import type { SmallWin, ApiResponse } from '@/types';
import { useToast, ToastContainer } from '@/components/Toast';
import { ArrowRight, Flag } from '@phosphor-icons/react';
import HomeNavbar from '@/components/home/HomeNavbar';

const categories = ['Akademik', 'Diri sendiri', 'Relasi', 'Kesehatan'];

const categoryColors: Record<string, string> = {
  Akademik: '#F5C738',
  'Diri sendiri': '#45C992',
  Relasi: '#5B8DEF',
  Kesehatan: '#FF8D54',
};

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function fmtDateLong(d: Date) {
  return d.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function SmallWinsPage() {
  const { user, loading: authLoading } = useAuth();
  const { toasts, addToast, removeToast } = useToast();

  const [smallWins, setSmallWins] = useState<(SmallWin & { dotColor?: string })[]>([]);
  const [loading, setLoading] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  });
  const [selectedCategory, setSelectedCategory] = useState<string | null>('Akademik');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Delete modal state
  const [delTarget, setDelTarget] = useState<{ id: string; title: string } | null>(null);
  const [delLoading, setDelLoading] = useState(false);

  const formRef = useRef<HTMLDivElement>(null);

  const fetchWins = async () => {
    try {
      const res = (await apiGet('/api/small-wins')) as ApiResponse<SmallWin[]>;
      if (res?.success && Array.isArray(res.data)) {
        const enriched = res.data.map((item, idx) => ({
          ...item,
          dotColor: item.category
            ? categoryColors[item.category] ?? '#F5C738'
            : idx % 3 === 0
            ? '#F5C738'
            : idx % 3 === 1
            ? '#45C992'
            : '#5B8DEF',
        }));
        setSmallWins(enriched);
      } else {
        setSmallWins([]);
      }
    } catch {
      setSmallWins([]);
      addToast('error', 'Gagal memuat small wins dari server.');
    }
  };

  useEffect(() => {
    if (!authLoading && user) fetchWins();
  }, [authLoading, user]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      addToast('error', 'Mohon isi judul kemenangan.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await apiPost('/api/small-wins', {
        title: title.trim(),
        description: notes.trim() || null,
        category: selectedCategory,
        winDate: selectedDate,
      }) as ApiResponse<SmallWin>;
      if (!res.success || !res.data) throw new Error('Gagal menyimpan small win.');
      const newWin = {
        ...res.data,
        dotColor: res.data.category ? categoryColors[res.data.category] ?? '#F5C738' : '#F5C738',
      };
      setSmallWins((prev) => [newWin, ...prev]);
      setTitle('');
      setNotes('');
      addToast('success', 'Kemenangan kecil berhasil dicatat!');
    } catch {
      addToast('error', 'Gagal menyimpan small win.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!delTarget) return;
    setDelLoading(true);

    try {
      await apiDelete(`/api/small-wins/${delTarget.id}`);
      setSmallWins((prev) => prev.filter((w) => w.id !== delTarget.id));
      addToast('success', 'Kemenangan kecil berhasil dihapus.');
      setDelTarget(null);
    } catch {
      addToast('error', 'Gagal menghapus small win.');
    } finally {
      setDelLoading(false);
    }
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9FD] text-[#25233A]">
      <HomeNavbar />
      <ToastContainer toasts={toasts} onClose={removeToast} />

      {/* ── Delete Confirmation Modal ── */}
      {delTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-md rounded-[28px] bg-white p-7 sm:p-8 shadow-2xl border border-[#E8E5F0] animate-in zoom-in-95 duration-150">
            <h2 className="text-xl sm:text-2xl font-bold text-[#25233A] mb-2 tracking-[-0.01em]">
              Hapus kemenangan kecil?
            </h2>
            <p className="text-sm text-[#6F6B80] leading-relaxed mb-4">
              Catatan “{delTarget.title}” akan dihapus permanen.
            </p>

            <div className="rounded-2xl bg-[#FDEEEC] px-4 py-2.5 mb-7 inline-block">
              <p className="text-xs font-semibold text-[#C2410C]">
                Tindakan ini tidak dapat dibatalkan.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDelTarget(null)}
                disabled={delLoading}
                className="px-6 py-2.5 rounded-2xl bg-[#F7F6FB] hover:bg-[#EAE9F2] text-[#25233A] font-semibold text-sm transition-colors border border-[#E8E5F0]"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={delLoading}
                className="px-6 py-2.5 rounded-2xl bg-[#C64E48] hover:bg-[#B53E38] text-white font-bold text-sm transition-colors shadow-sm disabled:opacity-50"
              >
                {delLoading ? 'Menghapus...' : 'Hapus'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Hero Banner (Warm Golden Yellow) ── */}
      <section className="w-full bg-[#F8D153] border-b border-[#ECC440]">
        <div className="mx-auto max-w-5xl px-5 py-7 sm:px-8 sm:py-9">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[11px] sm:text-xs font-bold tracking-[0.18em] uppercase text-[#78641D] mb-1.5">
                DISCOVER
              </p>
              <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#25233A] tracking-[-0.02em] mb-1.5">
                Small Wins
              </h1>
              <p className="text-xs sm:text-sm text-[#78641D] leading-relaxed">
                Catat kemajuan kecil yang layak kamu rayakan hari ini.
              </p>
            </div>

            {/* 2 Colored Circles (Desktop only) */}
            <div className="hidden sm:flex items-center gap-3 shrink-0">
              <span className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-[#6FE0AC] shadow-sm" />
              <span className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-[#5B8DEF] shadow-sm" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Content Container ── */}
      <main className="flex-1 mx-auto w-full max-w-5xl px-5 py-6 sm:px-8 sm:py-8 space-y-7 sm:space-y-8">
        {/* ── Form Card: "Apa kemenangan kecilmu hari ini?" ── */}
        <div
          ref={formRef}
          className="rounded-[28px] bg-white p-6 sm:p-8 border border-[#E8E5F0] shadow-sm"
        >
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#25233A] tracking-[-0.01em] mb-1">
            Apa kemenangan kecilmu hari ini?
          </h2>
          <p className="text-xs sm:text-sm text-[#6F6B80] mb-6">
            Tidak harus besar. Satu langkah kecil tetap berarti.
          </p>

          <form onSubmit={handleCreate} className="space-y-4 sm:space-y-5">
            {/* Row: Judul & Tanggal */}
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_260px] gap-4">
              <div>
                <label className="block text-xs font-bold text-[#25233A] mb-1.5">
                  Judul kemenangan
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: Berani bertanya di kelas"
                  className="w-full px-4 py-3 rounded-2xl border border-[#E8E5F0] bg-white text-sm text-[#25233A] placeholder-[#9A94AA] focus:border-[#F8D153] focus:outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#25233A] mb-1.5">
                  Tanggal
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-[#E8E5F0] bg-white text-sm text-[#25233A] focus:border-[#F8D153] focus:outline-none transition-colors cursor-pointer"
                  required
                />
              </div>
            </div>

            {/* Row: Kategori (opsional) */}
            <div>
              <label className="block text-xs font-bold text-[#25233A] mb-2">
                Kategori (opsional)
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => {
                  const isSelected = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() =>
                        setSelectedCategory(isSelected ? null : cat)
                      }
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                        isSelected
                          ? 'bg-[#F8D153] text-[#25233A] shadow-xs'
                          : 'bg-[#F4F3F8] text-[#6F6B80] hover:bg-[#EAE8F3]'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Row: Catatan (opsional) */}
            <div>
              <label className="block text-xs font-bold text-[#25233A] mb-1.5">
                Catatan (opsional)
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ceritakan sedikit tentang kemajuanmu..."
                className="w-full px-4 py-3 rounded-2xl border border-[#E8E5F0] bg-white text-sm text-[#25233A] placeholder-[#9A94AA] focus:border-[#F8D153] focus:outline-none transition-colors"
              />
            </div>

            {/* Submit button */}
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-[#F8D153] hover:bg-[#F5C738] text-[#25233A] font-bold text-sm shadow-sm transition-transform active:scale-[0.98] disabled:opacity-50"
              >
                {submitting ? 'Menyimpan...' : 'Simpan kemenangan'}
              </button>
            </div>
          </form>
        </div>

        {/* ── Kemenangan Terbarumu Section ── */}
        <section aria-labelledby="latest-wins-heading" className="space-y-4">
          <div>
            <h2
              id="latest-wins-heading"
              className="text-base sm:text-lg font-bold text-[#25233A] tracking-[-0.01em]"
            >
              Kemenangan terbarumu
            </h2>
            <p className="text-xs sm:text-sm text-[#6F6B80] mt-0.5">
              <span className="sm:hidden">Langkah kecil yang sudah kamu rayakan.</span>
              <span className="hidden sm:inline">
                Langkah-langkah yang sudah kamu pilih untuk dihargai.
              </span>
            </p>
          </div>

          {smallWins.length === 0 ? (
            /* ── Empty State ── */
            <div className="rounded-[24px] border border-[#F1D987] bg-[#FFFDF4] p-5 sm:p-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F8D153] text-[#25233A]">
                    <Flag size={24} weight="duotone" />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold tracking-[-0.02em] text-[#25233A]">
                      Belum ada kemenangan kecil
                    </h3>
                    <p className="mt-1 max-w-md text-sm leading-6 text-[#6F6B80]">
                      Satu langkah sederhana hari ini cukup untuk memulai.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={scrollToForm}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[14px] bg-[#F8D153] px-5 text-sm font-bold text-[#25233A] shadow-sm transition-colors hover:bg-[#F5C738] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F8D153]"
                >
                  Catat kemenangan pertama
                  <ArrowRight size={16} weight="bold" />
                </button>
              </div>
            </div>
          ) : (
            /* ── List of Small Wins ── */
            <div className="space-y-3">
              {smallWins.map((win) => (
                <div
                  key={win.id}
                  className="rounded-[22px] bg-white px-5 py-4 border border-[#E8E5F0] shadow-xs flex items-center justify-between gap-3 transition-all hover:border-[#F8D153]/50"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{
                        backgroundColor:
                          win.dotColor ??
                          (win.category ? categoryColors[win.category] ?? '#F5C738' : '#F5C738'),
                      }}
                    />
                    <div className="min-w-0">
                      <p className="text-sm sm:text-base font-bold text-[#25233A] truncate">
                        {win.title}
                      </p>
                      <p className="text-xs text-[#9A94AA] mt-0.5">
                        {fmtDate(win.winDate || win.createdAt)}
                        {win.category ? ` • ${win.category}` : ''}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setDelTarget({ id: win.id, title: win.title })}
                    className="px-4 py-2 rounded-2xl bg-[#FDF0ED] hover:bg-[#FCDFD8] text-[#C2410C] font-semibold text-xs transition-colors shrink-0"
                  >
                    Hapus
                  </button>
                </div>
              ))}
            </div>
          )}
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
