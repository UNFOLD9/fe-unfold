'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useToast, ToastContainer } from '@/components/Toast';
import HomeNavbar from '@/components/home/HomeNavbar';

function fmtDate(d?: string) {
  if (!d) return '24 September 2026';
  return new Date(d).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function getInitials(name?: string) {
  if (!name) return 'KK';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { toasts, addToast, removeToast } = useToast();

  const displayName = user?.name || 'Khaliz Kanigara';
  const displayEmail = user?.email || 'khalizkanigarafg@gmail.com';
  const displayRole = user?.role || 'Member';
  const displayJoined = fmtDate(user?.createdAt);
  const initials = getInitials(displayName);

  const handleLogout = async () => {
    try {
      await logout();
      addToast('info', 'Berhasil keluar dari akun.');
      router.push('/login');
    } catch {
      router.push('/login');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9FD] text-[#25233A]">
      <HomeNavbar />
      <ToastContainer toasts={toasts} onClose={removeToast} />

      {/* ── Hero Banner (Lavender Purple) ── */}
      <section className="w-full bg-[#EDE9FA] border-b border-[#DDD8F5]">
        <div className="mx-auto max-w-5xl px-5 py-7 sm:px-8 sm:py-9">
          <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#25233A] tracking-[-0.02em] mb-1.5">
            Ruang akunmu
          </h1>
          <p className="text-xs sm:text-sm text-[#6F6B80] leading-relaxed">
            Lihat data akun dan atur sesi tanpa mengganggu ruang refleksimu.
          </p>
        </div>
      </section>

      {/* ── Main Content Container ── */}
      <main className="flex-1 mx-auto w-full max-w-5xl px-5 py-6 sm:px-8 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 items-start">
          {/* Left Column: Profile Card */}
          <div className="rounded-[28px] bg-white p-7 sm:p-8 border border-[#E8E5F0] text-center shadow-sm">
            {/* Avatar Circle */}
            <div className="w-20 h-20 rounded-full bg-[#EDE9FA] text-[#5B8DEF] font-bold text-2xl flex items-center justify-center mx-auto mb-4 select-none">
              {initials}
            </div>

            <h2 className="text-xl font-extrabold text-[#25233A] mb-1 truncate">
              {displayName}
            </h2>
            <p className="text-xs sm:text-sm text-[#9A94AA] mb-4 truncate">
              {displayEmail}
            </p>

            <span className="inline-block px-3.5 py-1 rounded-full bg-[#EDFAF4] text-[#45C992] text-xs font-semibold">
              {displayRole}
            </span>
          </div>

          {/* Right Column: Account Details, Privacy & Security, Session Cards */}
          <div className="space-y-6">
            {/* 1. Data Akun Card */}
            <div className="rounded-[28px] bg-white p-6 sm:p-7 border border-[#E8E5F0] shadow-sm">
              <h3 className="text-lg font-bold text-[#25233A] mb-1">
                Data akun
              </h3>
              <p className="text-xs sm:text-sm text-[#6F6B80] pb-4 mb-5 border-b border-[#E8E5F0]/70">
                Data dasar yang terhubung ke sesi UNFOLD-mu.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                <div>
                  <p className="text-xs text-[#9A94AA] mb-1">Nama lengkap</p>
                  <p className="text-sm sm:text-base font-bold text-[#25233A] truncate">
                    {displayName}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-[#9A94AA] mb-1">Email</p>
                  <p className="text-sm sm:text-base font-bold text-[#25233A] truncate">
                    {displayEmail}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-[#9A94AA] mb-1">Bergabung</p>
                  <p className="text-sm sm:text-base font-bold text-[#25233A]">
                    {displayJoined}
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Privasi dan Keamanan Card */}
            <div className="rounded-[28px] bg-white p-6 sm:p-7 border border-[#E8E5F0] shadow-sm">
              <h3 className="text-lg font-bold text-[#25233A] mb-1">
                Privasi dan keamanan
              </h3>
              <p className="text-xs sm:text-sm text-[#6F6B80] mb-5">
                Pahami data yang disimpan, cara data dipakai, dan kontrol yang kamu punya.
              </p>

              <Link
                href="/privacy-policy"
                className="inline-block px-5 py-2.5 rounded-2xl bg-white hover:bg-[#FAF9FD] text-[#25233A] font-semibold text-xs sm:text-sm border border-[#E8E5F0] transition-colors shadow-xs"
              >
                Lihat kebijakan
              </Link>
            </div>

            {/* 3. Sesi Akun Card */}
            <div className="rounded-[28px] bg-white p-6 sm:p-7 border border-[#E8E5F0] shadow-sm">
              <h3 className="text-lg font-bold text-[#25233A] mb-1">
                Sesi akun
              </h3>
              <p className="text-xs sm:text-sm text-[#6F6B80] mb-5">
                Keluar dari perangkat ini. Refleksi dan catatanmu tetap tersimpan.
              </p>

              <button
                type="button"
                onClick={handleLogout}
                className="w-full sm:w-auto px-6 py-2.5 rounded-2xl bg-[#FDF0ED] hover:bg-[#FCDFD8] text-[#C2410C] border border-[#FCA5A5]/40 text-xs sm:text-sm font-semibold transition-colors"
              >
                Keluar dari akun
              </button>
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <footer className="pt-8 pb-4 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-[#E8E5F0]/60 text-xs text-[#9A94AA] mt-8">
          <p className="text-center sm:text-left">
            UNFOLD bukan layanan diagnosis atau terapi.
          </p>
          <Link
            href="/privacy-policy"
            className="text-[#5B8DEF] font-semibold hover:underline transition-colors"
          >
            Kebijakan Privasi
          </Link>
        </footer>
      </main>
    </div>
  );
}
