import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { SiteHeader } from "@/components/site-header";
import { CorporateClients } from "@/components/corporate-clients";

type PageShellProps = {
  children: ReactNode;
  wide?: boolean;
};

export function PageShell({ children, wide = false }: PageShellProps) {
  const shellWidthClass = wide ? "max-w-[96rem]" : "max-w-7xl";
  const mainPaddingClass = wide ? "px-4 md:px-6 lg:px-10 xl:px-14" : "px-4 md:px-6 lg:px-8";

  return (
    <div className="min-h-screen bg-[#f7f6f2] text-stone-900">
      <div className="mx-auto max-w-7xl">
        <SiteHeader />
      </div>

      <main className={`mx-auto ${shellWidthClass} pb-12 pt-24 ${mainPaddingClass}`}>
        {children}
      </main>

      <CorporateClients />

      <footer className="border-t border-[#d5a700] bg-[#ffc000]">
        <div className="mx-auto max-w-[96rem] grid gap-10 px-4 py-10 md:grid-cols-2 xl:grid-cols-[minmax(0,1.6fr)_repeat(4,minmax(0,1fr))] lg:px-10 xl:px-14">
          <div className="max-w-2xl">
            <h3 className="text-2xl font-semibold text-black">Corporate Head Office</h3>
            <div className="mt-4 grid gap-1 text-sm leading-7 text-black/90">
              <p>Hodophile Adventure, Plot# 111-113C, Dupatta Gali, PECHS, Block2, Tariq Road, Karachi, Pakistan, 75400</p>
              <p>+92 337 7777460</p>
              <p>+92 337 8233777</p>
              <p>yasharahmedsiddiqui@hodophile.pk</p>
              <p>masood.ahmed@hodophile.pk</p>
            </div>
            <div className="mt-6">
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-black">Follow Us</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                <a
                  href="https://www.facebook.com/Hodophileadventure"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-black text-black transition hover:bg-black hover:text-[#ffc000]"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                    <path d="M13.4 8.8V7.2c0-.7.5-.8.9-.8h2.2V3h-3c-3.3 0-4 2.5-4 4.2v1.6H7v3.6h2.5V21h3.9v-8.6H16l.4-3.6h-3z" />
                  </svg>
                  <span className="sr-only">Facebook</span>
                </a>
                <a
                  href="https://www.instagram.com/hodophile.adventure?igsh=MTk5aHN6aW53b2R5Mw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-black text-black transition hover:bg-black hover:text-[#ffc000]"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-[1.8]" aria-hidden="true">
                    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.3" cy="6.8" r="0.9" className="fill-current stroke-none" />
                  </svg>
                  <span className="sr-only">Instagram</span>
                </a>
                <a
                  href="https://www.youtube.com/@hodophileadventure"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-black text-black transition hover:bg-black hover:text-[#ffc000]"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                    <path d="M21.8 8.2a3 3 0 0 0-2.1-2.1C17.8 5.6 12 5.6 12 5.6s-5.8 0-7.7.5a3 3 0 0 0-2.1 2.1A31.7 31.7 0 0 0 1.7 12c0 1.3.1 2.6.5 3.8a3 3 0 0 0 2.1 2.1c1.9.5 7.7.5 7.7.5s5.8 0 7.7-.5a3 3 0 0 0 2.1-2.1c.3-1.2.5-2.5.5-3.8s-.2-2.6-.5-3.8zM10.2 15.2V8.8l5.6 3.2-5.6 3.2z" />
                  </svg>
                  <span className="sr-only">YouTube</span>
                </a>
                <a
                  href="https://www.tiktok.com/@hodophile_adventures?_r=1&_t=ZS-95lv9tuUjnJ"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-black text-black transition hover:bg-black hover:text-[#ffc000]"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.68v13.67a2.4 2.4 0 1 1-4.77-2.3A2.4 2.4 0 0 1 9.1 9.66V5.92a6.07 6.07 0 0 0-6.85 6.59 6.18 6.18 0 0 0 6.03 6.06 6 6 0 0 0 5.27-2.87v-4.55a8.25 8.25 0 0 0 5.1 1.82v-3.49a4.83 4.83 0 0 1-1.18-.15Z" />
                  </svg>
                  <span className="sr-only">TikTok</span>
                </a>
                <a
                  href="https://www.linkedin.com/company/hodophile-adventures-pk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-black text-black transition hover:bg-black hover:text-[#ffc000]"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                    <path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 1 1 8.3 6.5a1.78 1.78 0 0 1-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0 0 13 14.19a.66.66 0 0 0 0 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 0 1 2.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
                  </svg>
                  <span className="sr-only">LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          <div className="xl:pl-4 flex flex-col items-center">
            <h3 className="text-2xl font-semibold uppercase text-black text-center">Customer Service</h3>
            <div className="mt-5 overflow-hidden rounded-2xl bg-[#ffd24d] p-3">
              <Image
                src="/images/footer/service-24-7.png"
                alt="24/7 customer service"
                width={520}
                height={400}
                className="mx-auto h-auto w-full max-w-[13rem] object-contain"
              />
            </div>
          </div>

          <div className="xl:pl-4">
            <h3 className="text-2xl font-semibold uppercase text-black text-left">Quick Links</h3>
            <div className="mt-5 grid gap-2 text-base font-medium text-black">
              <Link href="/about-us" className="inline-flex items-center gap-2 transition hover:translate-x-1">
                <span aria-hidden="true">▶</span>
                <span>About Us</span>
              </Link>
              <Link href="/blogs" className="inline-flex items-center gap-2 transition hover:translate-x-1">
                <span aria-hidden="true">▶</span>
                <span>Blogs</span>
              </Link>
              <Link href="/contact-us" className="inline-flex items-center gap-2 transition hover:translate-x-1">
                <span aria-hidden="true">▶</span>
                <span>Contact Us</span>
              </Link>
              <Link href="/gallery" className="inline-flex items-center gap-2 transition hover:translate-x-1">
                <span aria-hidden="true">▶</span>
                <span>Gallery</span>
              </Link>
              <Link href="/make-my-trip" className="inline-flex items-center gap-2 transition hover:translate-x-1">
                <span aria-hidden="true">▶</span>
                <span>Make My Trip</span>
              </Link>
              <Link href="/terms-and-conditions" className="inline-flex items-center gap-2 transition hover:translate-x-1">
                <span aria-hidden="true">▶</span>
                <span>Terms &amp; Conditions</span>
              </Link>
            </div>
          </div>

          <div className="xl:pl-4 flex flex-col items-center">
            <h3 className="text-2xl font-semibold uppercase text-black text-center">100% Satisfaction</h3>
            <div className="mt-5 overflow-hidden rounded-2xl bg-[#ffd24d] p-3">
              <Image
                src="/images/footer/guarantee.png"
                alt="100 percent satisfaction guaranteed"
                width={520}
                height={460}
                className="mx-auto h-auto w-full max-w-[13rem] object-contain"
              />
            </div>
          </div>

          <div className="xl:pl-4">
            <h3 className="text-xl font-semibold uppercase text-black text-left">Our Affiliations</h3>
            <div className="mt-5 flex flex-col gap-6">
              <div className="flex flex-row gap-6 items-center">
                <div className="h-20 w-20 flex-shrink-0">
                  <Image
                    src="/images/footer/govt-pakistan.png"
                    alt="Government of Pakistan"
                    width={80}
                    height={80}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="text-base font-semibold text-black">
                  <p>Lisence No.</p>
                  <p>5436</p>
                </div>
              </div>
              <div className="flex flex-row gap-6 items-center justify-start">
                <div className="h-20 w-20 flex-shrink-0">
                  <Image
                    src="/images/footer/taap-logo.png"
                    alt="TAAP"
                    width={80}
                    height={80}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="h-20 w-20 flex-shrink-0">
                  <Image
                    src="/images/footer/pato-logo.png"
                    alt="PATO"
                    width={80}
                    height={80}
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
