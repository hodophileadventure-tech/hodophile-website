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
      <span className="inline-flex h-8 w-8 items-center justify-center">
        <Image
          src="/images/footer/facebook-logo.png?v=20261124"
          alt=""
          width={32}
          height={32}
          aria-hidden
          className="h-8 w-8 object-contain"
        />
      </span>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/hodophile.adventure?igsh=MTk5aHN6aW53b2R5Mw==",
    icon: (
      <span className="inline-flex h-8 w-8 items-center justify-center">
        <Image
          src="/images/footer/instagram-logo.png?v=20261125"
          alt=""
          width={32}
          height={32}
          aria-hidden
          className="h-8 w-8 object-contain"
        />
      </span>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@hodophileadventure",
    icon: (
      <span className="inline-flex h-8 w-8 items-center justify-center">
        <Image
          src="/images/footer/youtube-logo.png?v=20261124"
          alt=""
          width={32}
          height={32}
          aria-hidden
          className="h-8 w-8 object-contain"
        />
      </span>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@hodophile_adventures?_r=1&_t=ZS-95lv9tuUjnJ",
    icon: (
      <span className="inline-flex h-8 w-8 items-center justify-center">
        <Image
          src="/images/footer/tiktok-logo.png?v=20261124"
          alt=""
          width={32}
          height={32}
          aria-hidden
          className="h-8 w-8 object-contain"
        />
      </span>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/hodophile-adventures-pk/",
    icon: (
      <span className="inline-flex h-8 w-8 items-center justify-center">
        <Image
          src="/images/footer/linkedin-logo.png?v=20261124"
          alt=""
          width={32}
          height={32}
          aria-hidden
          className="h-8 w-8 object-contain"
        />
      </span>
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
          <div className="grid items-start gap-8 py-10 lg:grid-cols-[1.2fr_1.8fr] lg:gap-12 lg:py-14">
            <div>
              <Link href="/" className="inline-flex" aria-label="Hodophile Adventures home">
                <Image
                  src="/images/package-cards/logo.webp"
                  alt="Hodophile Adventures"
                  width={480}
                  height={136}
                  priority
                  className="h-28 w-auto sm:h-32 lg:h-36"
                />
              </Link>
              <p className="premium-footer-copy mt-5 max-w-sm">
                Hodophile Adventures plans private, family, honeymoon, and guided journeys across Pakistan with clear itineraries, trusted transport, and local support.
              </p>

              <div className="mt-6">
                <h3 className="premium-footer-heading">Follow us</h3>
                <ul className="mt-4 flex flex-wrap items-center gap-4">
                  {socialLinks.map((social) => (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        title={social.label}
                        className="inline-flex items-center justify-center transition hover:opacity-80"
                      >
                        {social.icon}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 grid gap-6 sm:grid-cols-2 sm:gap-8">
                <div>
                  <h3 className="premium-footer-heading">Contact & updates</h3>
                  <div className="premium-footer-contact mt-3">
                    <a href="tel:+923377777460">+92 337 7777460</a>
                    <a href="tel:+923378233777">+92 337 8233777</a>
                    <a href="mailto:info@hodophile.pk">info@hodophile.pk</a>
                    <p>PECHS, Block 2, Tariq Road<br />Karachi, Pakistan</p>
                  </div>
                </div>

                <div>
                  <h3 className="premium-footer-heading">Subscribe</h3>
                  <p className="mt-2 text-xs leading-5 text-black sm:text-sm">Get trip ideas, seasonal updates, and new packages from Hodophile.</p>
                  <form action="mailto:info@hodophile.pk" method="get" className="mt-2 grid gap-2">
                    <label htmlFor="footer-email" className="sr-only">Email address</label>
                    <input
                      id="footer-email"
                      name="subject"
                      type="email"
                      placeholder="Your email address"
                      className="w-full rounded-md border border-black/20 bg-white px-3 py-1.5 text-sm text-black placeholder:text-black/50 outline-none transition focus:border-[#FCC000] focus:ring-2 focus:ring-[#FCC000]/30"
                    />
                    <button type="submit" className="inline-flex w-fit items-center justify-center rounded-md bg-[#FCC000] px-3 py-1.5 text-xs font-semibold text-black transition hover:bg-[#e6b100] sm:text-sm">
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div>
              <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">
                <nav aria-label="Footer quick links">
                  <h3 className="premium-footer-heading">Quick links</h3>
                  <ul className="premium-footer-links mt-4">
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
                  <div className="mt-4 grid grid-cols-3 gap-2">
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
                  <Link href="/gallery" className="mt-3 inline-flex text-sm font-semibold text-black underline decoration-[#FCC000] decoration-2 underline-offset-4 hover:text-[#FCC000]">
                    View full gallery
                  </Link>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="premium-footer-heading">Accreditations & license</h3>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-3 rounded-xl border border-black/10 bg-[#fffdf7] px-3 py-2">
                    <Image
                      src="/images/footer/govt-pakistan.webp"
                      alt="Government of Pakistan"
                      width={56}
                      height={56}
                      className="h-12 w-12 object-contain"
                    />
                    <div>
                      <p className="text-xs font-medium text-black">Govt. of Pakistan</p>
                      <p className="text-sm font-semibold text-black">Tourism License No. 5436</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Image
                      src="/images/footer/taap-logo.webp"
                      alt="TAAP — Travel Agents Association of Pakistan"
                      width={64}
                      height={64}
                      className="h-14 w-14 rounded-lg border border-black/10 bg-white object-contain p-1"
                    />
                    <Image
                      src="/images/footer/affiliation-pato.webp"
                      alt="PATO — Pakistan Association of Tour Operators"
                      width={64}
                      height={64}
                      className="h-14 w-14 rounded-lg border border-black/10 bg-white object-contain p-1"
                    />
                  </div>
                </div>
                <p className="mt-2 text-sm text-black">TAAP &amp; PATO affiliated, licensed tour operator in Pakistan.</p>
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
