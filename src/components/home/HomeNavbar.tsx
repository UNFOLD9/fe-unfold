"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function HomeNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (err) {
      console.error("Logout error:", err);
      router.push("/login");
    }
  };

  const navLinks = [
    { name: "Home", href: "/home" },
    { name: "Pause", href: "/pause" },
    { name: "Small Wins", href: "/small-wins" },
    { name: "My Space", href: "/my-space" },
    { name: "Support", href: "/support" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#E8E5F0] bg-white/95">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-10 lg:px-[88px]">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand */}
          <Link href="/home" className="group flex min-h-11 items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5B8DEF]">
            <div className="relative h-7 w-7 sm:h-8 sm:w-8">
              <Image
                src="/figma/unfold-mark.svg"
                alt=""
                fill
                sizes="32px"
                className="object-contain"
                priority
              />
            </div>
            <span className="text-base font-extrabold tracking-[-0.03em] text-[#25233A] sm:text-lg">
              UNFOLD
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive
                      ? "text-[#5B8DEF] font-semibold"
                      : "text-[#6F6B80] hover:text-[#25233A]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* User Account / Profile Button */}
          <div className="flex items-center gap-3">
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex min-h-11 items-center gap-2 rounded-[14px] border border-[#E8E5F0] bg-white px-3.5 text-xs font-semibold text-[#25233A] transition-colors hover:border-[#5B8DEF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B8DEF] sm:px-4 sm:text-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#6F6B80]"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span className="max-w-32 truncate">{user?.name || "Akun"}</span>
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 z-50 mt-2 w-56 rounded-[18px] border border-[#E8E5F0] bg-white py-2 shadow-lg shadow-[#25233A]/5">
                  <div className="px-4 py-2 border-b border-[#E8E5F0]/70">
                    <p className="text-xs text-[#6F6B80]">Masuk sebagai</p>
                    <p className="text-sm font-bold text-[#25233A] truncate">
                      {user?.name || "Pengguna UNFOLD"}
                    </p>
                    <p className="text-xs text-[#6F6B80] truncate">{user?.email}</p>
                  </div>

                  <div className="py-1">
                    <Link
                      href="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2 text-xs sm:text-sm text-[#25233A] hover:bg-[#F8F7FC] transition-colors"
                    >
                      Edit profil
                    </Link>
                    <Link
                      href="/my-space"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2 text-xs sm:text-sm text-[#25233A] hover:bg-[#F8F7FC] transition-colors"
                    >
                      My Space
                    </Link>
                    <Link
                      href="/support"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2 text-xs sm:text-sm text-[#25233A] hover:bg-[#F8F7FC] transition-colors"
                    >
                      Bantuan & Dukungan
                    </Link>
                  </div>

                  <div className="pt-1 border-t border-[#E8E5F0]/70">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-xs sm:text-sm text-red-500 hover:bg-red-50 font-medium transition-colors flex items-center gap-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                      </svg>
                      Keluar
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-[#25233A] hover:bg-[#F8F7FC]"
              aria-label="Buka menu navigasi"
            >
              {mobileMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="4" y1="8" x2="20" y2="8" />
                  <line x1="4" y1="16" x2="20" y2="16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E8E5F0] bg-white px-6 py-4 space-y-2 animate-in fade-in slide-in-from-top-2 duration-150">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 text-sm font-medium ${
                  isActive ? "text-[#5B8DEF] font-bold" : "text-[#25233A]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
