'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { apiGet, apiDelete } from '@/lib/api';
import type { EmotionalCheckIn, MindEntry, SmallWin, ApiResponse } from '@/types';
import { useToast, ToastContainer } from '@/components/Toast';
import { ArrowRight, Trash, ArrowCounterClockwise } from '@phosphor-icons/react';

// ── Emotion config ────────────────────────────────────────────────────────────
const emotionConf: Record<string, { label: string; color: string }> = {
  happy:       { label: 'Senang',    color: '#5B8DEF' },
  calm:        { label: 'Tenang',    color: '#7DD3B0' },
  anxious:     { label: 'Cemas',     color: '#A78BFA' },
  tired:       { label: 'Lelah',     color: '#F6D66B' },
  sad:         { label: 'Sedih',     color: '#FFB38A' },
  empty:       { label: 'Hampa',     color: '#9CA3AF' },
  angry:       { label: 'Marah',     color: '#F87171' },
  overwhelmed: { label: 'Kewalahan', color: '#F3A6C8' },
};

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'short', year: 'numeric',
  });
}

// ── Delete Dialog ─────────────────────────────────────────────────────────────
function DeleteDialog({
  label, date, onConfirm, onCancel, loading,
}: {
  label: string; date: string;
  onConfirm: () => void; onCancel: () => void; loading: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(37,35,58,0.3)', backdropFilter: 'blur(4px)' }} onClick={onCancel} />
      <div className="relative rounded-2xl p-6 w-full max-w-xs shadow-2xl" style={{ backgroundColor: '#FFFFFF' }}>
        <h3 className="font-bold text-base mb-1" style={{ color: '#25233A' }}>
          Hapus {label}?
        </h3>
        <p className="text-sm mb-1" style={{ color: '#6F6B80' }}>
          {date} akan dihapus permanen dari My Space.
        </p>
        <p className="text-xs font-semibold" style={{ color: '#F87171' }}>Tindakan permanen</p>
        <p className="text-xs mb-5" style={{ color: '#9CA3AF' }}>Sekali hapus tidak bisa diambil kembali.</p>
        <div className="flex gap-3">
          <button onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl text-sm font-medium border"
            style={{ color: '#6F6B80', borderColor: '#E8E5F0', backgroundColor: '#F8F7FC' }}>
            Batal
          </button>
          <button onClick={onConfirm} disabled={loading}
            className="flex-1 py-2.5 rounded-xl text-sm font-medium disabled:opacity-60"
            style={{ backgroundColor: '#F87171', color: '#FFFFFF' }}>
            {loading ? 'Menghapus...' : `Hapus ${label}`}
          </button>
        </div>
      </div>
    </div>
  );
}

type DelTarget = { id: string; type: 'ci' | 'me' | 'sw'; label: string; date: string };

// ── Page ──────────────────────────────────────────────────────────────────────
export default function MySpacePage() {
  const { user } = useAuth();
  const { toasts, addToast, removeToast } = useToast();

  const [checkIns,    setCheckIns]    = useState<EmotionalCheckIn[]>([]);
  const [mindEntries, setMindEntries] = useState<MindEntry[]>([]);
  const [smallWins,   setSmallWins]   = useState<SmallWin[]>([]);
  const [loading,     setLoading]     = useState(true);
  const [errMsg,      setErrMsg]      = useState<string | null>(null);
  const [del, setDel]     = useState<DelTarget | null>(null);
  const [delLoad, setDelLoad] = useState(false);

  const fetchAll = async () => {
    setLoading(true); setErrMsg(null);
    try {
      const [ci, me, sw] = await Promise.all([
        apiGet('/api/emotional-check-ins') as Promise<ApiResponse<EmotionalCheckIn[]>>,
        apiGet('/api/mind-entries')        as Promise<ApiResponse<MindEntry[]>>,
        apiGet('/api/small-wins')          as Promise<ApiResponse<SmallWin[]>>,
      ]);
      setCheckIns(ci?.success  ? ci.data  : []);
      setMindEntries(me?.success ? me.data : []);
      setSmallWins(sw?.success  ? sw.data  : []);
    } catch { setErrMsg('Gagal memuat data.'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchAll(); }, []);

  const confirmDelete = async () => {
    if (!del) return;
    setDelLoad(true);
    const ep = { ci: `/api/emotional-check-ins/${del.id}`, me: `/api/mind-entries/${del.id}`, sw: `/api/small-wins/${del.id}` };
    try {
      await apiDelete(ep[del.type]);
      if (del.type === 'ci') setCheckIns(p => p.filter(x => x.id !== del.id));
      if (del.type === 'me') setMindEntries(p => p.filter(x => x.id !== del.id));
      if (del.type === 'sw') setSmallWins(p => p.filter(x => x.id !== del.id));
      addToast('success', 'Berhasil dihapus.');
    } catch { addToast('error', 'Gagal menghapus.'); }
    finally { setDelLoad(false); setDel(null); }
  };

  // ── Skeleton ──────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <>
        <div style={{ backgroundColor: '#DCF5EC' }}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
            <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: '#4A8C6F' }}>YOUR SPACE</p>
            <div className="h-8 w-32 rounded-xl animate-pulse" style={{ backgroundColor: '#C5EDDB' }} />
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-4">
          {[1,2,3].map(i => (
            <div key={i} className="rounded-2xl animate-pulse" style={{ height: 120, backgroundColor: '#EEEAF8' }} />
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <ToastContainer toasts={toasts} onClose={removeToast} />
      {del && (
        <DeleteDialog label={del.label} date={del.date}
          onConfirm={confirmDelete} onCancel={() => setDel(null)} loading={delLoad} />
      )}

      {/* ── Hero — mint green ── */}
      <div style={{ backgroundColor: '#DCF5EC' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: '#4A8C6F' }}>
                YOUR SPACE
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold mb-1" style={{ color: '#25233A' }}>My Space</h1>
              <p className="text-xs sm:text-sm" style={{ color: '#5C7A6A' }}>
                Semua refleksi pribadmu, tersimpan rapi di satu tempat.
              </p>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <button onClick={fetchAll} disabled={loading} title="Muat ulang"
                className="p-1 rounded-lg hover:bg-white/50 disabled:opacity-40 transition-colors mr-1"
                style={{ color: '#4A8C6F' }}>
                <ArrowCounterClockwise size={15} />
              </button>
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl" style={{ backgroundColor: '#A78BFA' }} />
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl" style={{ backgroundColor: '#FFB38A' }} />
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl" style={{ backgroundColor: '#F6D66B' }} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-5 space-y-4">

        {/* Error */}
        {errMsg && (
          <div className="rounded-2xl p-4 flex items-center gap-3" style={{ backgroundColor: '#FEE2E2', border: '1px solid #FCA5A5' }}>
            <span className="text-sm flex-1" style={{ color: '#991B1B' }}>⚠️ {errMsg}</span>
            <button onClick={fetchAll} className="text-xs px-3 py-1 rounded-lg" style={{ backgroundColor: '#FCA5A5', color: '#7F1D1D' }}>Coba lagi</button>
          </div>
        )}

        {/* ── Ringkasan ruangmu ── */}
        <div>
          <p className="text-sm font-semibold mb-3" style={{ color: '#25233A' }}>Ringkasan ruangmu</p>
          {/* Mobile: 1 kolom stacked | Desktop: 3 kolom */}
          <div className="flex flex-col sm:flex-row gap-3">
            {[
              { label: 'Check-in',          count: checkIns.length,    sub: 'kali ini',       color: '#A78BFA', bg: '#EDE9FA' },
              { label: 'Tulisan tersimpan', count: mindEntries.length, sub: 'refleksi unlod',  color: '#FF8C52', bg: '#FFF0E8' },
              { label: 'Small wins',        count: smallWins.length,   sub: 'kartu ditambah',  color: '#C9940A', bg: '#FEF9DC' },
            ].map(({ label, count, sub, color, bg }) => (
              <div key={label} className="flex-1 rounded-2xl p-4" style={{ backgroundColor: bg }}>
                <p className="text-xs mb-1" style={{ color: '#6F6B80' }}>{label}</p>
                <p className="text-3xl sm:text-4xl font-bold leading-none mb-1" style={{ color }}>{count}</p>
                <p className="text-xs" style={{ color: '#9CA3AF' }}>{sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Check-in terbaru ── */}
        <div className="rounded-2xl p-4 sm:p-5" style={{ backgroundColor: '#EDE9FA' }}>
          <div className="flex items-center justify-between mb-0.5">
            <h2 className="font-semibold text-sm" style={{ color: '#25233A' }}>Check-in terbaru</h2>
            <Link href="#" className="text-xs flex items-center gap-0.5" style={{ color: '#A78BFA' }}>
              Semua <ArrowRight size={11} />
            </Link>
          </div>
          <p className="text-xs mb-3" style={{ color: '#6F6B80' }}>Perasaan valid dan punya cerita.</p>

          {checkIns.length === 0 ? (
            <p className="text-sm text-center py-3" style={{ color: '#9CA3AF' }}>
              Belum ada check-in.{' '}
              <Link href="/pause/check-in" className="underline" style={{ color: '#A78BFA' }}>Mulai sekarang</Link>
            </p>
          ) : (
            <div className="space-y-2">
              {checkIns.slice(0, 3).map(ci => {
                const conf = emotionConf[ci.emotion] ?? { label: ci.emotion, color: '#A78BFA' };
                return (
                  <div key={ci.id}
                    className="flex items-center gap-3 rounded-xl px-3 sm:px-4 py-2.5 group"
                    style={{ backgroundColor: '#FFFFFF', border: '1px solid #DDD8F5' }}>
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: conf.color }} />
                    <div className="flex-1 min-w-0">
                      <span className="font-semibold text-sm" style={{ color: '#25233A' }}>{conf.label}</span>
                      <span className="text-xs ml-2" style={{ color: '#9CA3AF' }}>{fmtDate(ci.createdAt)}</span>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full font-medium shrink-0"
                      style={{ backgroundColor: '#EDE9FA', color: '#A78BFA' }}>
                      Intensitas {ci.intensity}/5
                    </span>
                    <button
                      onClick={() => setDel({ id: ci.id, type: 'ci', label: 'check-in', date: fmtDate(ci.createdAt) })}
                      className="opacity-0 group-hover:opacity-100 p-1 rounded-lg transition-all hover:bg-red-50 shrink-0 ml-0.5"
                      style={{ color: '#F87171' }}>
                      <Trash size={13} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Tulisan tersimpan ── */}
        <div className="rounded-2xl p-4 sm:p-5" style={{ backgroundColor: '#FFF3EB' }}>
          <div className="flex items-center justify-between mb-0.5">
            <h2 className="font-semibold text-sm" style={{ color: '#25233A' }}>Tulisan tersimpan</h2>
            <Link href="#" className="text-xs flex items-center gap-0.5" style={{ color: '#FF8C52' }}>
              Semua <ArrowRight size={11} />
            </Link>
          </div>
          <p className="text-xs mb-3" style={{ color: '#6F6B80' }}>Refleksi pikiran dan perasaanmu.</p>

          {mindEntries.length === 0 ? (
            <p className="text-sm text-center py-3" style={{ color: '#9CA3AF' }}>
              Belum ada tulisan.{' '}
              <Link href="/pause/unload" className="underline" style={{ color: '#FF8C52' }}>Mulai unload</Link>
            </p>
          ) : (
            <div className="divide-y" style={{ borderColor: '#F5D9C4' }}>
              {mindEntries.slice(0, 3).map(me => (
                <div key={me.id} className="flex items-start gap-2 sm:gap-4 py-3 first:pt-0 last:pb-0">
                  <span className="text-xs shrink-0 mt-0.5 min-w-[72px]" style={{ color: '#9CA3AF' }}>
                    {fmtDate(me.createdAt)}
                  </span>
                  <p className="flex-1 text-sm leading-relaxed line-clamp-2 min-w-0"
                    style={{ color: '#25233A' }}>
                    {me.content}
                  </p>
                  <button
                    onClick={() => setDel({ id: me.id, type: 'me', label: 'tulisan tersimpan', date: fmtDate(me.createdAt) })}
                    className="shrink-0 text-xs font-medium transition-colors hover:text-red-500"
                    style={{ color: '#9CA3AF' }}>
                    Hapus
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Small wins ── */}
        <div className="rounded-2xl p-4 sm:p-5" style={{ backgroundColor: '#FEF9E0' }}>
          <div className="flex items-center justify-between mb-0.5">
            <h2 className="font-semibold text-sm" style={{ color: '#25233A' }}>Small wins</h2>
            <Link href="#" className="text-xs flex items-center gap-0.5" style={{ color: '#C9940A' }}>
              Semua <ArrowRight size={11} />
            </Link>
          </div>
          <p className="text-xs mb-3" style={{ color: '#6F6B80' }}>Catat pencapaian kecil yang kamu lakukan.</p>

          {smallWins.length === 0 ? (
            <p className="text-sm text-center py-3" style={{ color: '#9CA3AF' }}>
              Belum ada small win.{' '}
              <Link href="/discover/small-wins" className="underline" style={{ color: '#C9940A' }}>Catat sekarang</Link>
            </p>
          ) : (
            <div className="space-y-2">
              {smallWins.slice(0, 3).map(sw => (
                <div key={sw.id}
                  className="rounded-xl px-3 sm:px-4 py-3 flex items-center gap-3 group"
                  style={{ backgroundColor: '#FFFFFF', border: '1px solid #EDE9D0' }}>
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: '#F6D66B' }} />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm" style={{ color: '#25233A' }}>{sw.title}</p>
                    <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                      <span className="text-xs" style={{ color: '#9CA3AF' }}>{fmtDate(sw.winDate)}</span>
                      {sw.category && (
                        <span className="text-xs px-1.5 py-0.5 rounded-full"
                          style={{ backgroundColor: '#FEF9DC', color: '#C9940A' }}>
                          {sw.category}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => setDel({ id: sw.id, type: 'sw', label: 'small win', date: fmtDate(sw.winDate) })}
                    className="opacity-0 group-hover:opacity-100 p-1 rounded-lg transition-all hover:bg-red-50 shrink-0"
                    style={{ color: '#F87171' }}>
                    <Trash size={13} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        <div className="flex items-center justify-between py-3">
          <p className="text-xs" style={{ color: '#9CA3AF' }}>
            UNFOLD bukan layanan diagnosis atau terapi
          </p>
          <Link href="/support" className="text-xs" style={{ color: '#5B8DEF' }}>
            Dukungan
          </Link>
        </div>

      </div>
    </>
  );
}
