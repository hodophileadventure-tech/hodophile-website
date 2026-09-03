"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { navigation, tourMenu } from "@/lib/site";

type NavigationItem = (typeof navigation)[number];

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

  const desktopToursCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const aboutUsCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // publish header height as a CSS variable so pages can size to viewport minus header
  useEffect(() => {
    const setHeaderHeight = () => {
      const h = headerRef.current?.offsetHeight ?? 72;
      document.documentElement.style.setProperty("--site-header-height", `${h}px`);
    };

    setHeaderHeight();
    window.addEventListener("resize", setHeaderHeight);
    return () => window.removeEventListener("resize", setHeaderHeight);
  }, []);

  const isHome = pathname === "/";
  const isToursActive = pathname.startsWith("/tours");
  const splitIndex = 4;
  const desktopLeftNavigation = navigation.slice(0, splitIndex);
  const desktopRightNavigation = navigation.slice(splitIndex);

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
          className="relative"
          onMouseEnter={openAboutUsMenu}
          onMouseLeave={closeAboutUsMenu}
        >
          <button
            type="button"
            onClick={() => {
              setAboutUsDropdownOpen((previous) => !previous);
              if (aboutUsCloseTimer.current) {
                clearTimeout(aboutUsCloseTimer.current);
                aboutUsCloseTimer.current = null;
              }
            }}
            onFocus={openAboutUsMenu}
            className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition duration-300 ${
              pathname === item.href
                ? "text-yellow-600"
                : "text-stone-700 hover:text-stone-900 hover:bg-stone-100/50"
            }`}
          >
            <span>{item.label}</span>
            <svg viewBox="0 0 20 20" className={`h-3 w-3 fill-current transition-transform duration-300 ${aboutUsDropdownOpen ? 'rotate-180' : ''}`} aria-hidden="true">
              <path d="M5.8 7.5 10 11.7l4.2-4.2 1.4 1.4L10 14.5 4.4 8.9z" />
            </svg>
          </button>

          <div
            className={`absolute left-0 top-[calc(100%+0.6rem)] z-[90] min-w-[220px] rounded-2xl border border-yellow-400/30 bg-white/95 backdrop-blur-lg p-2 shadow-[0_20px_50px_rgba(0,0,0,0.12)] transition-all duration-200 ${
              aboutUsDropdownOpen ? "visible opacity-100 scale-100" : "invisible opacity-0 scale-95 pointer-events-none"
            }`}
            onMouseEnter={openAboutUsMenu}
            onMouseLeave={closeAboutUsMenu}
          >
            <div className="grid gap-1">
              <Link
                href="/our-team"
                className="rounded-xl px-4 py-3 text-left text-sm font-semibold text-stone-900 transition-all duration-300 hover:bg-yellow-100/50 hover:text-yellow-700"
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

    if (item.href === "/tours") {
      return (
        <div
          key={item.href}
          className="relative group"
          onMouseEnter={openDesktopToursMenu}
          onMouseLeave={closeDesktopToursMenu}
        >
          <Link
            href={item.href}
            onFocus={openDesktopToursMenu}
            className={`inline-flex gap-1 items-center whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition duration-300 ${
              isToursActive
                ? "text-yellow-600"
                : "text-stone-700 hover:text-stone-900 hover:bg-stone-100/50"
            }`}
          >
            {item.label}
            <svg viewBox="0 0 20 20" className={`h-3 w-3 fill-current transition-transform duration-300 ${desktopToursOpen ? 'rotate-180' : ''}`} aria-hidden="true">
              <path d="M5.8 7.5 10 11.7l4.2-4.2 1.4 1.4L10 14.5 4.4 8.9z" />
            </svg>
          </Link>

          <div
            className={`fixed left-1/2 top-[calc(100%+0.8rem)] z-[80] w-[min(56rem,calc(100vw-2rem))] -translate-x-1/2 transition-all duration-300 ${
              desktopToursOpen ? "visible opacity-100 scale-100" : "invisible opacity-0 scale-95 pointer-events-none"
            }`}
            onMouseEnter={openDesktopToursMenu}
            onMouseLeave={closeDesktopToursMenu}
          >
            <div className="grid h-[26rem] max-h-[calc(100vh-7rem)] overflow-hidden rounded-3xl border border-stone-200/50 bg-white/95 backdrop-blur-lg shadow-[0_30px_80px_rgba(0,0,0,0.12)] ring-1 ring-white/20 md:grid-cols-[16rem_minmax(0,1fr)]">
              <div className="min-h-0 overflow-y-auto overscroll-contain border-r border-stone-200/50 bg-stone-50/30 p-4">
                <p className="mb-4 px-3 text-xs font-bold uppercase tracking-[0.35em] text-yellow-600">Tour Groups</p>
                <div className="grid gap-2">
                  {tourMenu.map((group) => {
                    const isActive = activeTourGroup === group.href;
                    return (
                      <button
                        key={group.href}
                        type="button"
                        onMouseEnter={() => setActiveTourGroup(group.href)}
                        onFocus={() => setActiveTourGroup(group.href)}
                        className={`rounded-lg border px-4 py-3 text-left text-sm font-semibold transition-all duration-300 ${
                          isActive
                            ? "border-yellow-400/60 bg-yellow-50/60 text-yellow-900"
                            : "border-stone-200/50 bg-white/40 text-stone-700 hover:border-yellow-400/40 hover:bg-yellow-50/40"
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
                        className="text-xs font-bold uppercase tracking-[0.35em] text-yellow-600 transition duration-300 hover:text-yellow-700"
                      >
                        {group.label}
                      </Link>
                      <div className="mt-4 grid gap-3">
                        {group.items.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className="group/item rounded-lg border border-stone-200/50 bg-stone-50/30 px-4 py-3 transition-all duration-300 hover:border-yellow-400/40 hover:bg-yellow-50/40 hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)]"
                          >
                            <div className="text-sm font-semibold text-stone-900 group-hover/item:text-yellow-700">{subItem.label}</div>
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
        className={`relative inline-flex items-center whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition duration-300 ${
          pathname === item.href
            ? "text-yellow-600"
            : "text-stone-700 hover:text-stone-900 hover:bg-stone-100/50"
        }`}
      >
        {item.label}
        {pathname === item.href && (
          <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-6 bg-gradient-to-r from-yellow-400 to-yellow-400/50 rounded-full" />
        )}
      </Link>
    );
  };

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 border-b transition duration-300 ${
        scrolled 
          ? "border-black/5 bg-white/90 shadow-[0_20px_60px_rgba(0,0,0,0.12)] backdrop-blur-2xl" 
          : "border-black/0 bg-white/70 shadow-[0_8px_32px_rgba(0,0,0,0.06)] backdrop-blur-xl"
      }`}
      aria-hidden={false}
    >
      <div className="mx-auto max-w-[96rem]">
        <div className="relative flex min-w-0 items-center justify-between gap-4 px-4 py-3 lg:gap-8 lg:px-8 xl:px-12">
          <nav className="hidden min-w-0 flex-1 items-center justify-start gap-1 lg:flex lg:flex-nowrap">
            {desktopLeftNavigation.map((item) => renderDesktopNavItem(item))}
          </nav>

          <Link
            href="/"
            className="group relative hidden h-[3.5rem] shrink-0 items-center justify-center lg:flex"
          >
            <img
              src="/logo-transparent.png"
              alt="Hodophile Adventures"
              className="mx-auto h-[2.8rem] w-auto max-h-[2.8rem] object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.12)] transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </Link>

          <nav className="hidden min-w-0 flex-1 items-center justify-end gap-1 lg:flex lg:flex-nowrap">
            {desktopRightNavigation.map((item) => renderDesktopNavItem(item))}
          </nav>

          <div className="col-span-4 flex items-center justify-between lg:hidden">
          <Link
            href="/"
            className="group relative inline-flex h-[2.5rem] w-[10rem] shrink-0 items-center lg:inline-flex"
          >
            <img
              src="/logo-transparent.png"
              alt="Hodophile Adventures"
              className="mx-auto h-[1.9rem] w-auto max-h-[1.9rem] object-contain drop-shadow-[0_1px_4px_rgba(0,0,0,0.12)] transition-transform group-hover:scale-[1.03]"
            />
          </Link>
          {/* mobile search removed */}

          <button
            type="button"
            onClick={() => {
              setToursOpen(false);
              setMobileOpen((prev) => !prev);
            }}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-stone-200/50 bg-white/50 text-stone-700 transition duration-300 hover:bg-white hover:border-stone-300 hover:shadow-md lg:hidden"
            aria-expanded={mobileOpen}
            aria-label="Toggle navigation menu"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[1.9]">
              {mobileOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="border-t border-stone-100 bg-white/95 px-6 pb-6 pt-4 shadow-[0_20px_50px_rgba(0,0,0,0.08)] backdrop-blur-xl lg:hidden">
          <nav className="grid gap-3">
            {navigation.map((item) => (
              item.href === "/tours" ? (
                <div key={item.href} className="rounded-2xl border border-stone-200/50 bg-stone-50/50 p-4 backdrop-blur-sm">
                  <button
                    type="button"
                    onClick={() => setToursOpen((prev) => !prev)}
                    className="flex w-full items-center justify-between text-sm font-bold text-stone-900 uppercase tracking-[0.1em]"
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
                        className="rounded-xl border border-yellow-400/30 bg-yellow-50/50 px-4 py-3 text-sm font-semibold text-yellow-900 transition hover:bg-yellow-100/50 hover:border-yellow-400/60"
                      >
                        All Tours
                      </Link>
                      {tourMenu.map((group) => (
                        <div key={group.href} className="rounded-xl border border-stone-200/50 bg-white/60 p-3 backdrop-blur-sm">
                          <button
                            type="button"
                            onClick={() =>
                              setActiveMobileTourGroup((prev) =>
                                prev === group.href ? null : group.href,
                              )
                            }
                            className="flex w-full items-center justify-between text-xs font-bold uppercase tracking-[0.2em] text-stone-600"
                          >
                            <span>{group.label}</span>
                            <span className={`transition-transform ${activeMobileTourGroup === group.href ? 'rotate-180' : ''}`}>
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
                                className="rounded-lg border border-yellow-400/30 bg-gradient-to-r from-yellow-50 to-yellow-100/50 px-3 py-2 text-sm font-semibold text-yellow-900 transition hover:from-yellow-100 hover:to-yellow-100"
                              >
                                View {group.label}
                              </Link>
                              {group.items.map((subItem) => (
                                <Link
                                  key={subItem.href}
                                  href={subItem.href}
                                  onClick={() => setMobileOpen(false)}
                                  className="rounded-lg border border-stone-200/50 bg-white/60 px-3 py-2 text-sm font-medium text-stone-700 transition hover:bg-white hover:border-stone-300"
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
                  className="rounded-xl border border-stone-200/50 bg-white/60 px-4 py-3 text-sm font-medium text-stone-700 transition duration-300 hover:border-stone-300 hover:text-stone-900 hover:bg-white hover:shadow-md backdrop-blur-sm"
                >
                  {item.label}
                </Link>
              )
            ))}
          </nav>
          <Link
            href="/make-my-trip"
            onClick={() => setMobileOpen(false)}
            className="mt-6 btn-primary w-full justify-center"
          >
            Plan Journey
          </Link>
        </div>
      ) : null}
      </div>
    </header>
  );
}