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

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/Hodophileadventure",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
        <path d="M13.4 8.8V7.2c0-.7.5-.8.9-.8h2.2V3h-3c-3.3 0-4 2.5-4 4.2v1.6H7v3.6h2.5V21h3.9v-8.6H16l.4-3.6h-3z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/hodophile.adventure?igsh=MTk5aHN6aW53b2R5Mw==",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-[1.8]" aria-hidden="true">
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.3" cy="6.8" r="1" className="fill-current stroke-none" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@hodophileadventure",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
        <path d="M21.8 8.2a3 3 0 0 0-2.1-2.1C17.8 5.6 12 5.6 12 5.6s-5.8 0-7.7.5a3 3 0 0 0-2.1 2.1A31.7 31.7 0 0 0 1.7 12c0 1.3.1 2.6.5 3.8a3 3 0 0 0 2.1 2.1c1.9.5 7.7.5 7.7.5s5.8 0 7.7-.5a3 3 0 0 0 2.1-2.1c.3-1.2.5-2.5.5-3.8s-.2-2.6-.5-3.8zM10.2 15.2V8.8l5.6 3.2-5.6 3.2z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@hodophile_adventures?_r=1&_t=ZS-95lv9tuUjnJ",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.68v13.67a2.4 2.4 0 1 1-4.77-2.3A2.4 2.4 0 0 1 9.1 9.66V5.92a6.07 6.07 0 0 0-6.85 6.59 6.18 6.18 0 0 0 6.03 6.06 6 6 0 0 0 5.27-2.87v-4.55a8.25 8.25 0 0 0 5.1 1.82v-3.49a4.83 4.83 0 0 1-1.18-.15Z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/hodophile-adventures-pk/",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
        <path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 1 1 8.3 6.5a1.78 1.78 0 0 1-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0 0 13 14.19a.66.66 0 0 0 0 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 0 1 2.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
      </svg>
    ),
  },
];

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

      <footer className="premium-footer text-white">
        <div className="site-container-wide mx-auto px-5 sm:px-8 lg:px-10 xl:px-14">
          <div className="grid items-end gap-7 border-b border-white/[0.09] py-9 lg:grid-cols-[1fr_auto] lg:py-11">
            <div>
              <p className="premium-footer-kicker">Private journeys across Pakistan</p>
              <h2 className="mt-3 max-w-3xl font-serif text-4xl leading-[1.02] text-white sm:text-[3.25rem]">
                Travel farther. Feel more.
              </h2>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link href="/make-my-trip" className="premium-footer-primary">
                Plan a custom trip
              </Link>
              <Link href="/contact-us" className="premium-footer-secondary">
                Talk to an expert
              </Link>
            </div>
          </div>

          <div className="grid gap-10 py-10 md:grid-cols-2 lg:grid-cols-[1.45fr_0.7fr_0.7fr_1.05fr] lg:gap-12 lg:py-12">
            <div>
              <Link href="/" className="inline-flex" aria-label="Hodophile Adventures home">
                <Image
                  src="/images/package-cards/logo.webp"
                  alt="Hodophile Adventures"
                  width={240}
                  height={68}
                  priority
                  className="h-12 w-auto"
                />
              </Link>
              <p className="premium-footer-copy mt-5 max-w-sm">
                Curated private, family and adventure journeys with thoughtful route planning, trusted transport and local support.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="premium-footer-social"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            <nav aria-label="Footer destinations">
              <h3 className="premium-footer-heading">Explore</h3>
              <div className="premium-footer-links">
                <Link href="/destinations">Destinations</Link>
                <Link href="/tours">Tour packages</Link>
                <Link href="/tours/adventure">Adventure tours</Link>
                <Link href="/honeymoon-packages">Honeymoon</Link>
                <Link href="/umrah-packages">Umrah</Link>
              </div>
            </nav>

            <nav aria-label="Footer company">
              <h3 className="premium-footer-heading">Company</h3>
              <div className="premium-footer-links">
                <Link href="/about-us">About us</Link>
                <Link href="/blogs">Travel journal</Link>
                <Link href="/gallery">Gallery</Link>
                <Link href="/contact-us">Contact</Link>
                <Link href="/terms-and-conditions">Terms</Link>
              </div>
            </nav>

            <div>
              <h3 className="premium-footer-heading">Contact</h3>
              <div className="premium-footer-contact mt-5">
                <a href="tel:+923377777460">+92 337 7777460</a>
                <a href="tel:+923378233777">+92 337 8233777</a>
                <a href="mailto:info@hodophile.pk">info@hodophile.pk</a>
                <p>PECHS, Block 2, Tariq Road<br />Karachi, Pakistan</p>
              </div>
              <div className="premium-footer-license">
                <Image
                  src="/images/footer/govt-pakistan.webp"
                  alt="Government of Pakistan tourism affiliation"
                  width={52}
                  height={52}
                  className="h-12 w-12 object-contain"
                />
                <div>
                  <p>Tourism license</p>
                  <strong>5436</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t border-white/[0.09] py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Hodophile Adventures. All rights reserved.</p>
            <div className="flex flex-wrap items-center gap-5">
              <Link href="/terms-and-conditions" className="premium-footer-bottom-link">Booking terms</Link>
              <Link href="/contact-us" className="premium-footer-bottom-link">Support</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
