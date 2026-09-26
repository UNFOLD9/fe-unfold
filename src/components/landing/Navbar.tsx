"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#F8F7FC]/85 border-b border-[#E8E5F0]/70 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-8 h-8 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-105">
              <Image
                src="/unfold-logo.png"
                alt="UNFOLD Logo"
                fill
                sizes="32px"
                className="object-contain"
                priority
              />
            </div>
            <span
              className="text-xl font-bold tracking-[0.18em] text-[#25233A] select-none"
            >
              UNFOLD
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#fitur"
              className="text-sm font-medium text-[#6F6B80] hover:text-[#5B8DEF] transition-colors"
            >
              Fitur
            </a>
            <a
              href="#keunggulan"
              className="text-sm font-medium text-[#6F6B80] hover:text-[#5B8DEF] transition-colors"
            >
              Tentang Kami
            </a>
            <a
              href="#cara-kerja"
              className="text-sm font-medium text-[#6F6B80] hover:text-[#5B8DEF] transition-colors"
            >
              Cara Kerja
            </a>
            <a
              href="#faq"
              className="text-sm font-medium text-[#6F6B80] hover:text-[#5B8DEF] transition-colors"
            >
              FAQ
            </a>
          </nav>

          {/* Desktop Auth CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-semibold text-[#25233A] hover:text-[#5B8DEF] px-4 py-2 rounded-xl transition-colors"
            >
              Masuk
            </Link>
            <Link
              href="/register"
              className="text-sm font-semibold text-white bg-[#5B8DEF] hover:bg-[#4a7de0] px-5 py-2.5 rounded-full shadow-sm hover:shadow-md hover:shadow-[#5B8DEF]/20 transition-all duration-200 active:scale-95"
            >
              Mulai Sekarang
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-[#25233A] hover:bg-white/80 transition-colors"
            aria-label="Buka menu navigasi"
          >
            {mobileMenuOpen ? (
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
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
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
              >
                <line x1="4" y1="8" x2="20" y2="8" />
                <line x1="4" y1="16" x2="20" y2="16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E8E5F0] bg-white/95 backdrop-blur-lg px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-3">
            <a
              href="#fitur"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-[#25233A] hover:text-[#5B8DEF] py-1 transition-colors"
            >
              Fitur
            </a>
            <a
              href="#keunggulan"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-[#25233A] hover:text-[#5B8DEF] py-1 transition-colors"
            >
              Tentang Kami
            </a>
            <a
              href="#cara-kerja"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-[#25233A] hover:text-[#5B8DEF] py-1 transition-colors"
            >
              Cara Kerja
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-[#25233A] hover:text-[#5B8DEF] py-1 transition-colors"
            >
              FAQ
            </a>
          </nav>

          <div className="pt-4 border-t border-[#E8E5F0] flex flex-col gap-3">
            <Link
              href="/login"
              className="w-full text-center text-sm font-semibold text-[#25233A] py-2.5 rounded-xl border border-[#E8E5F0] hover:bg-[#F8F7FC] transition-colors"
            >
              Masuk
            </Link>
            <Link
              href="/register"
              className="w-full text-center text-sm font-semibold text-white bg-[#5B8DEF] hover:bg-[#4a7de0] py-2.5 rounded-xl shadow-sm transition-all"
            >
              Mulai Sekarang
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
