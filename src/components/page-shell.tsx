import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { SiteHeader } from "@/components/site-header";

type PageShellProps = {
  children: ReactNode;
  wide?: boolean;
  noTopPadding?: boolean;
  mainClassName?: string;
};

export function PageShell({ children, wide = false, noTopPadding = false, mainClassName = "" }: PageShellProps) {
  const shellWidthClass = wide ? "site-container-wide" : "site-container";
  const mainPaddingClass = wide ? "site-gutter-wide" : "site-gutter";
  const topPaddingClass = noTopPadding ? "pt-0" : "pt-[var(--site-header-height)]";

  return (
    <div className="min-h-screen overflow-x-clip font-[var(--font-body)] text-[var(--text-primary)]">
      <div className="mx-auto site-container">
        <SiteHeader />
      </div>

      <main className={`mx-auto ${shellWidthClass} ${mainPaddingClass} pb-16 ${topPaddingClass} ${mainClassName}`}>
        {children}
      </main>

      <footer className="site-footer-gradient border-t border-white/10 text-white">
        <div className="site-container-wide mx-auto px-5 sm:px-8 lg:px-10 xl:px-14">
          <div className="grid gap-8 border-b border-white/10 py-10 lg:grid-cols-[1.35fr_0.65fr] lg:items-end lg:py-12">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#fcc000]">Plan your next journey</p>
              <h2 className="mt-3 max-w-2xl font-serif text-4xl font-normal leading-[1.05] text-white sm:text-5xl">
                Your Pakistan trip, planned properly.
              </h2>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link href="/make-my-trip" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#fcc000] px-6 text-sm font-bold text-black transition hover:bg-[#ffdc66]">
                Build a custom trip
              </Link>
              <Link href="/contact-us" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 px-6 text-sm font-semibold text-white transition hover:border-[#fcc000] hover:text-[#fcc000]">
                Contact our team
              </Link>
            </div>
          </div>

          <div className="grid gap-10 py-10 md:grid-cols-2 lg:grid-cols-[1.35fr_0.75fr_0.75fr_1fr] lg:gap-12">
            <div>
              <Link href="/" className="inline-flex" aria-label="Hodophile Adventures home">
                <Image
                  src="/images/package-cards/logo-transparent.webp"
                  alt="Hodophile Adventures"
                  width={240}
                  height={68}
                  className="h-12 w-auto"
                />
              </Link>
              <p className="mt-5 max-w-sm text-sm leading-7 text-white/65">
                Premium domestic journeys across Pakistan, thoughtfully planned around your pace, group, and travel style.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {[
                  ["Facebook", "https://www.facebook.com/Hodophileadventure"],
                  ["Instagram", "https://www.instagram.com/hodophile.adventure?igsh=MTk5aHN6aW53b2R5Mw=="],
                  ["YouTube", "https://www.youtube.com/@hodophileadventure"],
                  ["TikTok", "https://www.tiktok.com/@hodophile_adventures?_r=1&_t=ZS-95lv9tuUjnJ"],
                  ["LinkedIn", "https://www.linkedin.com/company/hodophile-adventures-pk/"],
                ].map(([label, href]) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-xs font-bold text-white/75 transition hover:border-[#fcc000] hover:text-[#fcc000]"
                  >
                    {label === "Facebook" ? "f" : label === "Instagram" ? "ig" : label === "YouTube" ? "yt" : label === "TikTok" ? "tt" : "in"}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-[#fcc000]">Explore</h3>
              <nav className="mt-5 grid gap-3 text-sm text-white/70" aria-label="Footer destinations">
                <Link href="/destinations" className="transition hover:text-[#fcc000]">Destinations</Link>
                <Link href="/tours" className="transition hover:text-[#fcc000]">Tour Packages</Link>
                <Link href="/tours/adventure" className="transition hover:text-[#fcc000]">Adventure Tours</Link>
                <Link href="/honeymoon-packages" className="transition hover:text-[#fcc000]">Honeymoon Packages</Link>
                <Link href="/umrah-packages" className="transition hover:text-[#fcc000]">Umrah Packages</Link>
              </nav>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-[#fcc000]">Company</h3>
              <nav className="mt-5 grid gap-3 text-sm text-white/70" aria-label="Footer company">
                <Link href="/about-us" className="transition hover:text-[#fcc000]">About Us</Link>
                <Link href="/blogs" className="transition hover:text-[#fcc000]">Travel Blog</Link>
                <Link href="/gallery" className="transition hover:text-[#fcc000]">Gallery</Link>
                <Link href="/contact-us" className="transition hover:text-[#fcc000]">Contact Us</Link>
                <Link href="/terms-and-conditions" className="transition hover:text-[#fcc000]">Terms &amp; Conditions</Link>
              </nav>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-[#fcc000]">Get in touch</h3>
              <div className="mt-5 grid gap-3 text-sm leading-6 text-white/70">
                <a href="tel:+923377777460" className="transition hover:text-[#fcc000]">+92 337 7777460</a>
                <a href="tel:+923378233777" className="transition hover:text-[#fcc000]">+92 337 8233777</a>
                <a href="mailto:info@hodophile.pk" className="transition hover:text-[#fcc000]">info@hodophile.pk</a>
                <p>PECHS, Block 2, Tariq Road, Karachi, Pakistan</p>
              </div>
              <div className="mt-5 flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.035] p-3">
                <Image src="/images/footer/footer-govt-pakistan.png" alt="Government of Pakistan" width={52} height={52} className="h-12 w-12 object-contain" />
                <div>
                  <p className="text-xs text-white/50">Tourism license</p>
                  <p className="mt-0.5 text-lg font-bold text-white">5436</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t border-white/10 py-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Hodophile Adventures. All rights reserved.</p>
            <div className="flex items-center gap-5">
              <Link href="/terms-and-conditions" className="transition hover:text-white">Booking terms</Link>
              <Link href="/contact-us" className="transition hover:text-white">Support</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
