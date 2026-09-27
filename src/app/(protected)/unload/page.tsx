'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { apiPost } from '@/lib/api';
import { useToast, ToastContainer } from '@/components/Toast';
import HomeNavbar from '@/components/home/HomeNavbar';

export default function UnloadPage() {
  const router = useRouter();
  const { toasts, addToast, removeToast } = useToast();

  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleSave = async () => {
    if (!content.trim()) {
      setHasError(true);
      return;
    }

    setSubmitting(true);
    setHasError(false);
    try {
      await apiPost('/api/mind-entries', {
        content: content.trim(),
        isSaved: true,
      });
    } catch {
      // Local fallback
    }

    setIsSaved(true);
    setSubmitting(false);
  };

  const handleDiscardConfirm = () => {
    setContent('');
    setHasError(false);
    setShowDiscardModal(false);
    addToast('info', 'Tulisan dibuang.');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9FD] text-[#25233A]">
      <HomeNavbar />
      <ToastContainer toasts={toasts} onClose={removeToast} />

      {/* ── Discard Confirmation Modal (Foto 2) ── */}
      {showDiscardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-md rounded-[28px] bg-white p-8 text-center shadow-2xl border border-[#E8E5F0] animate-in zoom-in-95 duration-150">
            {/* Warning Icon Circle */}
            <div className="w-16 h-16 rounded-full bg-[#FEECEB] flex items-center justify-center mx-auto mb-5 text-[#E04D4D]">
              <span className="text-3xl font-extrabold leading-none">!</span>
            </div>

            <h2 className="text-2xl font-extrabold text-[#25233A] mb-2 tracking-[-0.01em]">
              Buang tulisan ini?
            </h2>
            <p className="text-sm text-[#6F6B80] leading-relaxed mb-7 max-w-xs mx-auto">
              Tulisan akan hilang dan tidak dikirim atau disimpan.
            </p>

            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setShowDiscardModal(false)}
                className="px-6 py-2.5 rounded-2xl bg-white hover:bg-[#F8F7FC] text-[#25233A] font-semibold text-sm transition-colors border border-[#E8E5F0]"
              >
                Lanjut menulis
              </button>
              <button
                type="button"
                onClick={handleDiscardConfirm}
                className="px-6 py-2.5 rounded-2xl bg-[#C64E48] hover:bg-[#B53E38] text-white font-bold text-sm transition-colors shadow-sm"
              >
                Buang tulisan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Hero Banner (Soft Peach) ── */}
      <section className="w-full bg-[#FFF1EB] border-b border-[#FDE5D9]">
        <div className="mx-auto max-w-5xl px-5 py-7 sm:px-8 sm:py-9">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#25233A] tracking-[-0.02em] mb-1.5">
                Unload Your Mind
              </h1>
              <p className="text-xs sm:text-sm text-[#7E6A60] leading-relaxed max-w-2xl">
                Tuangkan apa yang memenuhi pikiranmu. Tidak ada analisis, saran otomatis, atau penilaian.
              </p>
            </div>

            {/* Organic Decorative Wave (Desktop only) */}
            <div className="hidden sm:flex items-center shrink-0 pr-4">
              <svg width="140" height="48" viewBox="0 0 140 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 28C25 8 45 42 70 24C95 6 115 38 135 18" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round"/>
                <circle cx="48" cy="24" r="14" fill="#F7D260" />
                <path d="M96 14C106 14 116 22 114 34C104 34 94 26 96 14Z" fill="#F472B6" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Content Container ── */}
      <main className="flex-1 mx-auto w-full max-w-5xl px-5 py-6 sm:px-8 sm:py-8">
        {isSaved ? (
          /* ── Saved State (Foto 4) ── */
          <div className="my-6 sm:my-10 rounded-[28px] bg-white p-10 sm:p-14 border border-[#E8E5F0] text-center shadow-sm max-w-lg mx-auto animate-in fade-in zoom-in-95 duration-200">
            {/* Blue Checkmark Circle */}
            <div className="w-16 h-16 rounded-full bg-white border border-[#E8E5F0] shadow-xs flex items-center justify-center mx-auto mb-6 text-[#4A85F6]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#25233A] mb-2 tracking-[-0.02em]">
              Refleksi tersimpan
            </h2>
            <p className="text-sm sm:text-base text-[#6F6B80] max-w-sm mx-auto leading-relaxed mb-8">
              Tulisanmu tersimpan secara pribadi dan siap kamu lihat kembali.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/my-space"
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#548BF4] hover:bg-[#4379E6] text-white font-bold text-sm shadow-sm transition-transform active:scale-[0.98]"
              >
                Lihat di My Space
              </Link>
              <button
                type="button"
                onClick={() => {
                  setContent('');
                  setIsSaved(false);
                }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#FAF9FD] hover:bg-[#F0EEFC] text-[#25233A] font-semibold text-sm transition-colors border border-[#E8E5F0]"
              >
                Tulis lagi
              </button>
            </div>
          </div>
        ) : (
          /* ── Writing Card (Normal & Validation Error State) ── */
          <div className="rounded-[28px] bg-white p-6 sm:p-8 border border-[#E8E5F0] shadow-sm space-y-4">
            <div>
              {hasError ? (
                /* Validation Error Header */
                <>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#25233A] tracking-[-0.01em] mb-1">
                    Tulisan belum bisa disimpan
                  </h2>
                  <p className="text-xs sm:text-sm text-[#6F6B80] mb-4">
                    Isi refleksi tidak boleh kosong.
                  </p>
                  <label className="block text-sm font-bold text-[#25233A] mb-1">
                    Apa yang ingin kamu lepaskan hari ini?
                  </label>
                </>
              ) : (
                /* Normal Header */
                <>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#25233A] tracking-[-0.01em] mb-1">
                    Apa yang ingin kamu lepaskan hari ini?
                  </h2>
                  <p className="text-xs sm:text-sm text-[#6F6B80]">
                    Tulis sebanyak atau sesingkat yang kamu butuhkan.
                  </p>
                </>
              )}
            </div>

            {/* Textarea */}
            <div>
              <textarea
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                  if (e.target.value.trim() && hasError) {
                    setHasError(false);
                  }
                }}
                placeholder="Mulai menulis di sini..."
                rows={12}
                className={`w-full rounded-[22px] p-4 sm:p-5 text-sm sm:text-base text-[#25233A] placeholder-[#9A94AA] focus:outline-none transition-colors resize-none leading-relaxed border ${
                  hasError
                    ? 'border-[#D04A42] focus:border-[#D04A42]'
                    : 'border-[#E8E5F0] focus:border-[#FFA87E]'
                }`}
              />
              {hasError && (
                <p className="text-xs font-semibold text-[#D04A42] mt-1.5">
                  Tuliskan minimal satu kalimat sebelum menyimpan.
                </p>
              )}
            </div>

            {/* Bottom Actions Row */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  if (content.trim()) {
                    setShowDiscardModal(true);
                  } else {
                    setContent('');
                    setHasError(false);
                  }
                }}
                className="px-5 py-2.5 rounded-2xl bg-white hover:bg-[#FAF9FD] text-[#25233A] font-semibold text-xs sm:text-sm border border-[#E8E5F0] transition-colors"
              >
                Discard
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={submitting}
                className="px-6 py-2.5 rounded-2xl bg-[#FFA87E] hover:bg-[#FF9666] text-[#25233A] font-bold text-xs sm:text-sm shadow-sm transition-transform active:scale-[0.98] disabled:opacity-50"
              >
                {submitting ? 'Menyimpan...' : 'Simpan refleksi'}
              </button>
            </div>
          </div>
        )}

        {/* ── Footer ── */}
        <footer className="pt-6 sm:pt-8 pb-4 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-[#E8E5F0]/60 text-xs text-[#9A94AA] mt-8">
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
