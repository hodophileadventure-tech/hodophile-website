"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import { navigation, tourMenu, whatsappUrl } from "@/lib/site";

type NavigationItem = (typeof navigation)[number];

const desktopPrimaryHrefs = new Set([
  "/",
  "/destinations",
  "/tours",
  "/beyond-pakistan",
  "/contact-us",
]);

const desktopMoreLinks = navigation.filter((item) => !desktopPrimaryHrefs.has(item.href));

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toursOpen, setToursOpen] = useState(false);
  const [desktopToursOpen, setDesktopToursOpen] = useState(false);
  const [aboutUsDropdownOpen, setAboutUsDropdownOpen] = useState(false);
  const [activeTourGroup, setActiveTourGroup] = useState(tourMenu[0]?.href ?? "");
  const [activeMobileTourGroup, setActiveMobileTourGroup] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  const desktopToursCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const aboutUsCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const menu = mobileMenuRef.current;
    const focusable = menu?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? [];
    focusable[0]?.focus();
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        requestAnimationFrame(() => mobileMenuButtonRef.current?.focus());
        return;
      }

      if (event.key !== "Tab" || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // publish header height as a CSS variable so pages can size to viewport minus header
  useEffect(() => {
    const setHeaderHeight = () => {
      const h = headerRef.current?.offsetHeight ?? 72;
      document.documentElement.style.setProperty("--site-header-height", `${h}px`);
    };

    setHeaderHeight();
    window.addEventListener("resize", setHeaderHeight);
    const observer = headerRef.current ? new ResizeObserver(setHeaderHeight) : null;
    if (observer && headerRef.current) observer.observe(headerRef.current);
    return () => {
      window.removeEventListener("resize", setHeaderHeight);
      observer?.disconnect();
    };
  }, [mobileOpen]);

  const isToursActive = pathname.startsWith("/tours");
  const openDesktopToursMenu = () => {
    if (desktopToursCloseTimer.current) {
      clearTimeout(desktopToursCloseTimer.current);
      desktopToursCloseTimer.current = null;
    }

    setDesktopToursOpen(true);
    setActiveTourGroup(tourMenu[0]?.href ?? "");
  };

  const closeDesktopToursMenu = () => {
    desktopToursCloseTimer.current = setTimeout(() => {
      setDesktopToursOpen(false);
    }, 140);
  };

  const openAboutUsMenu = () => {
    if (aboutUsCloseTimer.current) {
      clearTimeout(aboutUsCloseTimer.current);
      aboutUsCloseTimer.current = null;
    }

    setAboutUsDropdownOpen(true);
  };

  const closeAboutUsMenu = () => {
    aboutUsCloseTimer.current = setTimeout(() => {
      setAboutUsDropdownOpen(false);
    }, 160);
  };

  const renderDesktopNavItem = (item: NavigationItem) => {
    if (item.href === "/about-us") {
      return (
        <div
          key={item.href}
          className="relative flex items-center justify-center"
          onMouseEnter={openAboutUsMenu}
          onMouseLeave={closeAboutUsMenu}
        >
          <Link
            href={item.href}
            onFocus={openAboutUsMenu}
            className={`relative inline-flex items-center justify-center gap-1 whitespace-nowrap px-2 py-3 text-[11px] font-semibold tracking-wide transition duration-300 xl:px-3 xl:text-xs ${
              pathname === item.href
                ? "text-stone-950"
                : "text-stone-600 hover:text-stone-950"
            }`}
          >
            <span>{item.label}</span>
            <svg viewBox="0 0 20 20" className={`h-3 w-3 fill-current transition-transform duration-300 ${aboutUsDropdownOpen ? 'rotate-180' : ''}`} aria-hidden="true">
              <path d="M5.8 7.5 10 11.7l4.2-4.2 1.4 1.4L10 14.5 4.4 8.9z" />
            </svg>
          </Link>

          <div
            className={`absolute left-1/2 top-[calc(100%+0.25rem)] z-[90] min-w-[220px] -translate-x-1/2 rounded-xl border border-stone-200 bg-white p-2 shadow-[0_18px_50px_rgba(20,18,12,0.12)] transition-all duration-200 ${
              aboutUsDropdownOpen ? "visible opacity-100 scale-100" : "invisible opacity-0 scale-95 pointer-events-none"
            }`}
            onMouseEnter={openAboutUsMenu}
            onMouseLeave={closeAboutUsMenu}
          >
            <div className="grid gap-1">
              <Link
                href="/our-team"
                className="rounded-lg px-4 py-3 text-left text-sm font-medium text-stone-700 transition hover:bg-stone-50 hover:text-stone-950"
                onClick={() => {
                  setAboutUsDropdownOpen(false);
                  if (aboutUsCloseTimer.current) {
                    clearTimeout(aboutUsCloseTimer.current);
                    aboutUsCloseTimer.current = null;
                  }
                }}
              >
                Our Team
              </Link>
            </div>
          </div>
        </div>
      );
    }

    if (item.href === "/destinations") {
      return (
        <div
          key={item.href}
          className="relative flex items-center justify-center"
          onMouseEnter={openDesktopToursMenu}
          onMouseLeave={closeDesktopToursMenu}
        >
          <Link
            href={item.href}
            onFocus={openDesktopToursMenu}
            className={`relative inline-flex items-center justify-center gap-1 whitespace-nowrap px-2 py-3 text-[11px] font-semibold tracking-wide transition duration-300 xl:px-3 xl:text-xs ${
              pathname === item.href || isToursActive
                ? "text-stone-950"
                : "text-stone-600 hover:text-stone-950"
            }`}
          >
            <span>{item.label}</span>
            <svg viewBox="0 0 20 20" className={`h-3 w-3 fill-current transition-transform duration-300 ${desktopToursOpen ? 'rotate-180' : ''}`} aria-hidden="true">
              <path d="M5.8 7.5 10 11.7l4.2-4.2 1.4 1.4L10 14.5 4.4 8.9z" />
            </svg>
          </Link>

          <div
            className={`fixed left-1/2 top-[calc(100%+0.45rem)] z-[80] w-[min(56rem,calc(100vw-2rem))] -translate-x-1/2 transition-all duration-300 ${
              desktopToursOpen ? "visible opacity-100 scale-100" : "invisible opacity-0 scale-95 pointer-events-none"
            }`}
            onMouseEnter={openDesktopToursMenu}
            onMouseLeave={closeDesktopToursMenu}
          >
            <div className="grid h-[26rem] max-h-[calc(100vh-7rem)] overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-[0_24px_70px_rgba(20,18,12,0.16)] md:grid-cols-[16rem_minmax(0,1fr)]">
              <div className="min-h-0 overflow-y-auto overscroll-contain border-r border-stone-200 bg-stone-50/70 p-4">
                <p className="mb-4 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">Explore by region</p>
                <div className="grid gap-2">
                  {tourMenu.map((group) => {
                    const isActive = activeTourGroup === group.href;
                    return (
                      <button
                        key={group.href}
                        type="button"
                        onMouseEnter={() => setActiveTourGroup(group.href)}
                        onFocus={() => setActiveTourGroup(group.href)}
                        className={`rounded-lg border px-4 py-3 text-left text-sm font-semibold transition-all duration-200 ${
                          isActive
                            ? "border-[#fcc000]/60 bg-[#fff8df] text-stone-950"
                            : "border-transparent bg-white text-stone-600 hover:border-stone-200 hover:text-stone-950"
                        }`}
                      >
                        {group.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="min-h-0 overflow-y-auto overscroll-contain p-6">
                {tourMenu
                  .filter((group) => group.href === activeTourGroup)
                  .map((group) => (
                    <div key={group.href}>
                      <Link
                        href={group.href}
                        className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8b6b00] transition hover:text-stone-950"
                      >
                        {group.label}
                      </Link>
                      <div className="mt-4 grid gap-3">
                        {group.items.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className="group/item rounded-lg border border-stone-100 bg-white px-4 py-3 transition hover:border-[#fcc000]/50 hover:bg-[#fffdf5]"
                          >
                            <div className="text-sm font-semibold text-stone-900 group-hover/item:text-[#8b6b00]">{subItem.label}</div>
                            {subItem.description ? (
                              <div className="mt-1 text-xs leading-5 text-stone-600">{subItem.description}</div>
                            ) : null}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <Link
        key={item.href}
        href={item.href}
        className={`relative inline-flex items-center justify-center whitespace-nowrap px-2 py-3 text-[11px] font-semibold tracking-wide transition duration-300 xl:px-3 xl:text-xs ${
          pathname === item.href
            ? "text-stone-950"
            : "text-stone-600 hover:text-stone-950"
        }`}
      >
        {item.label}
        {pathname === item.href && (
          <span className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-[#fcc000]" />
        )}
      </Link>
    );
  };

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 border-b border-stone-200/80 bg-[#f4f1eb]/95 backdrop-blur-md transition-shadow duration-300 ${
        scrolled ? "shadow-[0_8px_28px_rgba(25,22,16,0.08)]" : ""
      }`}
      aria-hidden={false}
    >
      <div className="mx-auto w-full max-w-[96rem] px-4 sm:px-6 lg:px-8">
        <div className="relative flex min-w-0 items-center py-2.5 lg:py-2">
          <Link
            href="/"
            className="group relative hidden h-11 w-[9.5rem] shrink-0 items-center justify-start lg:inline-flex"
          >
            <Image
              src="/images/package-cards/logo-transparent.webp"
              alt="Hodophile Adventures"
              width={240}
              height={68}
              className="h-[2.15rem] w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </Link>

          <nav className="mx-3 hidden min-w-0 flex-1 items-center justify-end gap-0.5 lg:flex xl:mx-6 xl:gap-1" aria-label="Primary navigation">
            {navigation.filter((entry) => desktopPrimaryHrefs.has(entry.href)).map((entry) => (
              <div key={entry.href} className="flex shrink-0 items-center justify-center">
                {renderDesktopNavItem(entry)}
              </div>
            ))}
            <details className="group relative shrink-0">
              <summary className="inline-flex cursor-pointer list-none items-center gap-1 px-2 py-3 text-[11px] font-semibold tracking-wide text-stone-600 transition hover:text-stone-950 xl:px-3 xl:text-xs [&::-webkit-details-marker]:hidden">
                More
                <svg viewBox="0 0 20 20" className="h-3 w-3 fill-current transition-transform group-open:rotate-180" aria-hidden="true">
                  <path d="M5.8 7.5 10 11.7l4.2-4.2 1.4 1.4L10 14.5 4.4 8.9z" />
                </svg>
              </summary>
              <div className="absolute right-0 top-[calc(100%+0.25rem)] z-[90] grid min-w-56 gap-1 rounded-xl border border-stone-200 bg-white p-2 shadow-[0_18px_50px_rgba(20,18,12,0.12)]">
                {desktopMoreLinks.map((item) => (
                  <Link key={item.href} href={item.href} className="rounded-lg px-4 py-3 text-sm font-medium text-stone-600 transition hover:bg-stone-50 hover:text-stone-950">
                    {item.label}
                  </Link>
                ))}
              </div>
            </details>
          </nav>

          <Link
            href="/make-my-trip"
            className="hidden shrink-0 items-center justify-center rounded-full bg-[#fcc000] px-5 py-2.5 text-xs font-bold tracking-wide text-stone-950 transition hover:bg-[#e6ae00] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8b6b00] lg:inline-flex"
          >
            Plan your trip
          </Link>

          <div className="flex flex-1 items-center justify-between lg:hidden">
          <Link
            href="/"
            className="group relative inline-flex h-10 w-[9.5rem] shrink-0 items-center justify-start lg:inline-flex"
          >
            <Image
              src="/images/package-cards/logo-transparent.webp"
              alt="Hodophile Adventures"
              width={240}
              height={68}
              className="mx-auto h-[1.95rem] w-auto max-h-[1.95rem] object-contain transition-transform group-hover:scale-[1.03]"
            />
          </Link>
          {/* mobile search removed */}

          <button
            ref={mobileMenuButtonRef}
            type="button"
            onClick={() => {
              setToursOpen(false);
              setMobileOpen((prev) => !prev);
            }}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-300 bg-transparent text-stone-800 transition duration-300 hover:border-[#d9a407] hover:text-stone-950 lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label="Toggle navigation menu"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[1.9]">
              {mobileOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div ref={mobileMenuRef} id="mobile-navigation" role="dialog" aria-modal="true" aria-label="Mobile navigation" className="max-h-[calc(100svh-4.5rem)] overflow-y-auto border-t border-stone-200 bg-[#f4f1eb] px-5 pb-6 pt-4 text-stone-900 shadow-[0_18px_32px_rgba(25,22,16,0.08)] sm:px-6 lg:hidden">
          <nav className="mx-auto grid max-w-xl gap-1">
            {navigation.map((item) => (
              item.href === "/tours" ? (
                <div key={item.href} className="border-b border-stone-200 py-3">
                  <button
                    type="button"
                    onClick={() => setToursOpen((prev) => !prev)}
                    className="flex w-full items-center justify-between py-2 text-sm font-semibold text-stone-900"
                  >
                    <span>Tours</span>
                    <span className={`text-stone-500 transition-transform ${toursOpen ? 'rotate-180' : ''}`}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </span>
                  </button>

                  {toursOpen ? (
                    <div className="mt-4 grid gap-3">
                      <Link
                        href="/tours"
                        onClick={() => setMobileOpen(false)}
                        className="rounded-lg bg-[#fcc000] px-4 py-3 text-sm font-bold text-stone-950 transition hover:bg-[#e6ae00]"
                      >
                        All Tours
                      </Link>
                      {tourMenu.map((group) => (
                        <div key={group.href} className="border-t border-stone-200 py-3">
                          <button
                            type="button"
                            onClick={() =>
                              setActiveMobileTourGroup((prev) =>
                                prev === group.href ? null : group.href,
                              )
                            }
                            className="flex w-full items-center justify-between py-1 text-xs font-semibold text-stone-600"
                          >
                            <span>{group.label}</span>
                            <span className={`text-stone-400 transition-transform ${activeMobileTourGroup === group.href ? 'rotate-180' : ''}`}>
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                              </svg>
                            </span>
                          </button>

                          {activeMobileTourGroup === group.href ? (
                            <div className="mt-3 grid gap-2">
                              <Link
                                href={group.href}
                                onClick={() => setMobileOpen(false)}
                                className="rounded-lg bg-stone-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-stone-700"
                              >
                                View {group.label}
                              </Link>
                              {group.items.map((subItem) => (
                                <Link
                                  key={subItem.href}
                                  href={subItem.href}
                                  onClick={() => setMobileOpen(false)}
                                  className="rounded-lg px-3 py-2 text-sm font-medium text-stone-600 transition hover:bg-white/70 hover:text-stone-950"
                                >
                                  {subItem.label}
                                </Link>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-lg px-4 py-3 text-sm font-medium transition duration-200 ${pathname === item.href ? "bg-white/80 text-stone-950" : "text-stone-600 hover:bg-white/70 hover:text-stone-950"}`}
                >
                  {item.label}
                </Link>
              )
            ))}
          </nav>
          <Link
            href="/make-my-trip"
            onClick={() => setMobileOpen(false)}
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#fcc000] px-5 py-3 text-sm font-bold text-stone-950 transition hover:bg-[#e6ae00]"
          >
            Plan My Trip
          </Link>
          <a
            href={whatsappUrl("Hi Hodophile, I would like to speak with a travel expert.")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-full border border-stone-300 px-4 py-3 text-sm font-semibold text-stone-800 transition hover:border-[#d9a407] hover:bg-white/60"
          >
            WhatsApp Hodophile
          </a>
        </div>
      ) : null}
      </div>
    </header>
  );
}