import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[100dvh] bg-background px-6 py-8 sm:px-10 lg:px-16">
      <div className="mx-auto grid min-h-[calc(100dvh-4rem)] w-full max-w-6xl items-stretch gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.78fr)] lg:gap-16">
        <section className="flex min-w-0 flex-col">
          <Link
            href="/"
            className="flex min-h-11 w-fit items-center gap-2 rounded-lg pr-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            aria-label="Kembali ke halaman awal UNFOLD"
          >
            <Image
              src="/unfold-logo.png"
              alt=""
              width={30}
              height={30}
              priority
              className="object-contain"
            />
            <span className="font-bold tracking-[0.18em] text-text-main">
              UNFOLD
            </span>
          </Link>

          <div className="flex flex-1 flex-col justify-center py-14 lg:py-20">
            <p className="mb-4 text-sm font-semibold text-[#3E6FCB]">
              Halaman tidak ditemukan
            </p>
            <h1 className="max-w-xl text-4xl font-bold leading-tight text-text-main sm:text-5xl lg:text-6xl">
              Sepertinya kamu tersesat sebentar.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-text-muted sm:text-lg">
              Tautan ini mungkin sudah berubah atau tidak tersedia. Kamu bisa
              kembali dan melanjutkan perjalananmu dari awal.
            </p>
            <Link
              href="/"
              className="mt-9 inline-flex min-h-11 w-fit items-center justify-center rounded-xl bg-[#3E6FCB] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#3567C4] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary active:bg-[#2F5DB2]"
            >
              Kembali ke awal
            </Link>
          </div>
        </section>

        <aside className="relative flex min-h-64 items-center justify-center overflow-hidden rounded-[2rem] px-6 py-12 sm:min-h-80 lg:my-8 lg:min-h-0">
          <span
            className="select-none text-[clamp(7rem,27vw,15rem)] font-bold leading-none tracking-[-0.08em] text-[#3F3A59]"
            aria-hidden="true"
          >
            404
          </span>
          <p className="absolute bottom-7 left-7 right-7 text-center text-sm font-medium leading-6 text-[#514B68] sm:bottom-9">
            Tarik napas. Kamu tetap punya jalan untuk kembali.
          </p>
        </aside>
      </div>
    </main>
  );
}
