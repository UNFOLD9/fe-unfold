import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr';

export default function SupportHeader() {
  return (
    <header className="border-b border-[#E8E5F0] bg-white">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5 sm:px-8">
        <Link href="/" aria-label="Kembali ke beranda" className="rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5B8DEF]">
          <span className="flex items-center gap-2">
            <Image src="/unfold-logo.png" alt="" width={22} height={22} className="h-[22px] w-[22px]" priority />
            <span className="text-sm font-bold tracking-[0.04em] text-[#25233A]">UNFOLD</span>
          </span>
        </Link>
        <Link href="/home" className="inline-flex min-h-9 items-center gap-2 rounded-lg px-2 text-xs font-semibold text-[#6F6B80] transition-colors hover:bg-[#F8F7FC] hover:text-[#25233A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B8DEF]">
          <ArrowLeft size={16} aria-hidden="true" />
          Kembali
        </Link>
      </div>
    </header>
  );
}
