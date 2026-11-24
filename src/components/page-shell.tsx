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
      <Image
        src="/images/footer/tiktok-logo.png"
        alt=""
        width={20}
        height={20}
        aria-hidden
        className="h-5 w-5 object-contain"
      />
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

      <footer className="premium-footer">
        <div className="site-container-wide mx-auto px-5 sm:px-8 lg:px-10 xl:px-14">
          <div className="grid gap-10 py-10 lg:grid-cols-[1.2fr_0.75fr_1fr_1fr] lg:gap-12 lg:py-14">
            <div>
              <Link href="/" className="inline-flex" aria-label="Hodophile Adventures home">
                <Image
                  src="/images/package-cards/logo.webp"
                  alt="Hodophile Adventures"
                  width={480}
                  height={136}
                  priority
                  className="h-24 w-auto sm:h-28 lg:h-32"
                />
              </Link>
              <p className="premium-footer-copy mt-5 max-w-sm">
                Hodophile Adventures plans private, family, honeymoon, and guided journeys across Pakistan with clear itineraries, trusted transport, and local support.
              </p>

              <div className="mt-6">
                <h3 className="premium-footer-heading">Accreditations & license</h3>
                <div className="mt-4 flex flex-nowrap items-center gap-4 overflow-x-auto">
                  <div className="flex shrink-0 items-center gap-3 rounded-xl border border-black/10 bg-[#fffdf7] px-3 py-2">
                    <Image
                      src="/images/footer/govt-pakistan.webp"
                      alt="Government of Pakistan"
                      width={56}
                      height={56}
                      className="h-14 w-14 object-contain"
                    />
                    <div>
                      <p className="text-xs font-medium text-black">Govt. of Pakistan</p>
                      <p className="text-sm font-semibold text-black">Tourism License No. 5436</p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <Image
                      src="/images/footer/taap-logo.webp"
                      alt="TAAP — Travel Agents Association of Pakistan"
                      width={72}
                      height={72}
                      className="h-16 w-16 rounded-lg border border-black/10 bg-white object-contain p-1"
                    />
                    <Image
                      src="/images/footer/affiliation-pato.webp"
                      alt="PATO — Pakistan Association of Tour Operators"
                      width={72}
                      height={72}
                      className="h-16 w-16 rounded-lg border border-black/10 bg-white object-contain p-1"
                    />
                  </div>
                </div>
                <p className="mt-3 text-sm text-black">TAAP &amp; PATO affiliated, licensed tour operator in Pakistan.</p>
              </div>

              <div className="mt-8">
                <h3 className="premium-footer-heading">Follow us</h3>
                <ul className="mt-4 flex flex-nowrap items-center gap-4 overflow-x-auto text-sm text-black">
                  {socialLinks.map((social) => (
                    <li key={social.label} className="shrink-0">
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="inline-flex items-center gap-3 whitespace-nowrap text-black transition hover:text-[#FCC000]"
                      >
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/15 bg-[#fff9e6] text-black">
                          {social.icon}
                        </span>
                        <span className="font-medium">{social.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <nav aria-label="Footer quick links">
              <h3 className="premium-footer-heading">Quick links</h3>
              <ul className="premium-footer-links mt-5">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/destinations">Destinations</Link></li>
                <li><Link href="/tours">Tour packages</Link></li>
                <li><Link href="/make-my-trip">Make my trip</Link></li>
                <li><Link href="/about-us">About us</Link></li>
                <li><Link href="/blogs">Travel journal</Link></li>
                <li><Link href="/contact-us">Contact us</Link></li>
                <li><Link href="/terms-and-conditions">Terms &amp; conditions</Link></li>
              </ul>
            </nav>

            <div>
              <h3 className="premium-footer-heading">Gallery</h3>
              <div className="mt-5 grid grid-cols-3 gap-2">
                {[
                  { src: "/images/destinations/hunza-unsplash.webp", alt: "Hunza Valley", href: "/destinations/hunza" },
                  { src: "/images/destinations/skardu-unsplash.webp", alt: "Skardu", href: "/destinations/skardu" },
                  { src: "/images/destinations/naran-unsplash.webp", alt: "Naran Valley", href: "/destinations/naran" },
                  { src: "/images/destinations/swat-hd.webp", alt: "Swat Valley", href: "/destinations/swat" },
                  { src: "/images/destinations/kashmir.webp", alt: "Kashmir", href: "/destinations/kashmir" },
                  { src: "/images/destinations/shogran-siri-paye.png", alt: "Shogran and Siri Paye", href: "/destinations/shogran" },
                ].map((item) => (
                  <Link key={item.src} href={item.href} className="group relative aspect-square overflow-hidden rounded-lg border border-black/10 bg-stone-100" aria-label={`View ${item.alt}`}>
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 1024px) 8vw, 28vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </Link>
                ))}
              </div>
              <Link href="/gallery" className="mt-4 inline-flex text-sm font-semibold text-black underline decoration-[#FCC000] decoration-2 underline-offset-4 hover:text-[#FCC000]">
                View full gallery
              </Link>
            </div>

            <div>
              <h3 className="premium-footer-heading">Contact & updates</h3>
              <div className="premium-footer-contact mt-5">
                <a href="tel:+923377777460">+92 337 7777460</a>
                <a href="tel:+923378233777">+92 337 8233777</a>
                <a href="mailto:info@hodophile.pk">info@hodophile.pk</a>
                <p>PECHS, Block 2, Tariq Road<br />Karachi, Pakistan</p>
              </div>

              <div className="mt-8">
                <h3 className="premium-footer-heading">Subscribe</h3>
                <p className="mt-3 text-sm leading-6 text-black">Get trip ideas, seasonal updates, and new packages from Hodophile.</p>
                <form action="mailto:info@hodophile.pk" method="get" className="mt-4 grid gap-3">
                  <label htmlFor="footer-email" className="sr-only">Email address</label>
                  <input
                    id="footer-email"
                    name="subject"
                    type="email"
                    placeholder="Your email address"
                    className="w-full rounded-md border border-black/20 bg-white px-4 py-3 text-sm text-black placeholder:text-black/50 outline-none transition focus:border-[#FCC000] focus:ring-2 focus:ring-[#FCC000]/30"
                  />
                  <button type="submit" className="inline-flex items-center justify-center rounded-md bg-[#FCC000] px-4 py-3 text-sm font-semibold text-black transition hover:bg-[#e6b100]">
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-black/10 py-6 text-sm text-black sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Hodophile Adventures. All rights reserved.</p>
            <p>DTS License No. 5436 · TAAP &amp; PATO affiliated</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
