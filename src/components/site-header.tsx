"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { navigation, tourMenu } from "@/lib/site";

type NavigationItem = (typeof navigation)[number];

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toursOpen, setToursOpen] = useState(false);
  const [activeTourGroup, setActiveTourGroup] = useState(tourMenu[0]?.href ?? "");
  const [activeMobileTourGroup, setActiveMobileTourGroup] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = pathname === "/";
  const isToursActive = pathname.startsWith("/tours");
  const splitIndex = 4;
  const desktopLeftNavigation = navigation.slice(0, splitIndex);
  const desktopRightNavigation = navigation.slice(splitIndex);

  const renderDesktopNavItem = (item: NavigationItem) => {
    if (item.href === "/tours") {
      return (
        <div
          key={item.href}
          className="relative group"
          onMouseEnter={() => setActiveTourGroup(tourMenu[0]?.href ?? "")}
        >
          <Link
            href={item.href}
            className={`inline-flex items-center rounded-full px-3.5 py-2 text-[0.95rem] transition ${
              isToursActive
                ? "text-[#ffc000]"
                : "text-stone-700 hover:bg-stone-100 hover:text-stone-900"
            }`}
          >
            {item.label}
            <svg viewBox="0 0 20 20" className="ml-1.5 h-3 w-3 fill-current" aria-hidden="true">
              <path d="M5.8 7.5 10 11.7l4.2-4.2 1.4 1.4L10 14.5 4.4 8.9z" />
            </svg>
          </Link>

          <div className="invisible fixed left-1/2 top-[4.5rem] z-[80] w-[min(54rem,calc(100vw-1rem))] -translate-x-1/2 opacity-0 transition duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
            <div className="grid h-[26rem] max-h-[calc(100vh-6.5rem)] overflow-hidden rounded-[1.9rem] border border-[#4a3d18] bg-[#111111] shadow-[0_30px_80px_rgba(0,0,0,0.35)] ring-1 ring-black/30 md:grid-cols-[15rem_minmax(0,1fr)]">
              <div className="min-h-0 overflow-y-auto overscroll-contain border-r border-white/10 bg-[#171717] p-4">
                <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#ffc000]">Tour Groups</p>
                <div className="grid gap-2">
                  {tourMenu.map((group) => {
                    const isActive = activeTourGroup === group.href;
                    return (
                      <button
                        key={group.href}
                        type="button"
                        onMouseEnter={() => setActiveTourGroup(group.href)}
                        onFocus={() => setActiveTourGroup(group.href)}
                        className={`rounded-xl border px-4 py-3 text-left text-sm font-semibold transition ${
                          isActive
                            ? "border-[#ffc000] bg-[#2a2110] text-white"
                            : "border-white/10 bg-white/5 text-stone-100 hover:border-[#ffc000]/60 hover:bg-white/10"
                        }`}
                      >
                        {group.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="min-h-0 overflow-y-auto overscroll-contain p-5">
                {tourMenu
                  .filter((group) => group.href === activeTourGroup)
                  .map((group) => (
                    <div key={group.href}>
                      <Link
                        href={group.href}
                        className="text-xs font-semibold uppercase tracking-[0.32em] text-[#ffc000] transition hover:text-white"
                      >
                        {group.label}
                      </Link>
                      <div className="mt-4 grid gap-2">
                        {group.items.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-[#ffc000] hover:bg-white/10 hover:shadow-[0_10px_24px_rgba(0,0,0,0.18)]"
                          >
                            <div className="text-sm font-semibold text-white">{subItem.label}</div>
                            {subItem.description ? (
                              <div className="mt-1 text-xs leading-5 text-stone-300">{subItem.description}</div>
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
        className={`relative inline-flex items-center rounded-full px-3.5 py-2 text-[0.95rem] transition ${
          pathname === item.href
            ? "text-stone-900"
            : "text-stone-700 hover:bg-stone-100 hover:text-stone-900"
        } ${
          pathname === item.href ? "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-[#ffc000]" : ""
        }`}
      >
        {item.label}
      </Link>
    );
  };

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 border-b-4 border-[#ffc000] bg-white shadow-[0_8px_30px_rgba(15,23,42,0.06)]"
    >
      <div
        className="relative mx-auto grid w-full max-w-7xl grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto] items-center gap-2 px-4 py-2.5 lg:gap-3 lg:px-8"
      >
        <nav className="hidden items-center justify-end gap-0.5 lg:flex">
          {desktopLeftNavigation.map((item) => renderDesktopNavItem(item))}
        </nav>

        <Link
          href="/"
          className="group hidden justify-self-center rounded-full px-1 py-0 lg:block"
        >
          <Image
            src="/logo-transparent.png"
            alt="Hodophile Adventures"
            width={520}
            height={282}
            className="h-20 w-auto max-w-none drop-shadow-[0_4px_10px_rgba(0,0,0,0.28)] transition group-hover:scale-[1.02] lg:h-[5.4rem]"
            priority
          />
        </Link>

        <nav className="hidden items-center justify-start gap-0.5 lg:flex">
          {desktopRightNavigation.map((item) => renderDesktopNavItem(item))}
        </nav>

        <div className="hidden justify-self-end lg:flex">
          <Link
            href="/make-my-trip"
            className="inline-flex whitespace-nowrap rounded-full border border-[#ffc000] bg-[#ffc000] px-4 py-2 text-sm font-semibold !text-[#0b0b0b] shadow-[0_6px_20px_rgba(0,0,0,0.22)] transition hover:-translate-y-0.5 hover:bg-[#ffd24d]"
          >
            Plan Trip
          </Link>
        </div>

        <div className="col-span-4 flex items-center justify-between lg:hidden">
          <Link
            href="/"
            className="group inline-flex shrink-0 items-center rounded-full px-1 py-0"
          >
            <Image
              src="/logo-transparent.png"
              alt="Hodophile Adventures"
              width={360}
              height={195}
              className="h-18 w-auto max-w-none drop-shadow-[0_3px_8px_rgba(0,0,0,0.25)] transition group-hover:scale-[1.02]"
              priority
            />
          </Link>

          <button
            type="button"
            onClick={() => {
              setToursOpen(false);
              setMobileOpen((prev) => !prev);
            }}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-stone-300 bg-white text-stone-700 transition lg:hidden"
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
        <div className="border-t border-stone-200 bg-[#fbfaf7] px-6 pb-6 pt-4 shadow-[0_18px_40px_rgba(15,23,42,0.08)] lg:hidden">
          <nav className="grid gap-3">
            {navigation.map((item) => (
              item.href === "/tours" ? (
                <div key={item.href} className="rounded-2xl border border-stone-200 bg-white p-4">
                  <button
                    type="button"
                    onClick={() => setToursOpen((prev) => !prev)}
                    className="flex w-full items-center justify-between text-sm font-semibold text-stone-900"
                  >
                    <span>Tours</span>
                    <span className="text-stone-500">{toursOpen ? "−" : "+"}</span>
                  </button>

                  {toursOpen ? (
                    <div className="mt-4 grid gap-3">
                      <Link
                        href="/tours"
                        onClick={() => setMobileOpen(false)}
                        className="rounded-xl border border-stone-200 px-4 py-3 text-sm font-medium text-stone-700"
                      >
                        All Tours
                      </Link>
                      {tourMenu.map((group) => (
                        <div key={group.href} className="rounded-xl border border-stone-200 p-3">
                          <button
                            type="button"
                            onClick={() =>
                              setActiveMobileTourGroup((prev) =>
                                prev === group.href ? null : group.href,
                              )
                            }
                            className="flex w-full items-center justify-between text-xs font-semibold uppercase tracking-[0.24em] text-stone-500"
                          >
                            <span>{group.label}</span>
                            <span>{activeMobileTourGroup === group.href ? "−" : "+"}</span>
                          </button>

                          {activeMobileTourGroup === group.href ? (
                            <div className="mt-3 grid gap-2">
                              <Link
                                href={group.href}
                                onClick={() => setMobileOpen(false)}
                                className="rounded-lg border border-stone-200 px-3 py-2 text-sm font-semibold text-stone-800"
                              >
                                View {group.label}
                              </Link>
                              {group.items.map((subItem) => (
                                <Link
                                  key={subItem.href}
                                  href={subItem.href}
                                  onClick={() => setMobileOpen(false)}
                                  className="rounded-lg border border-stone-200 px-3 py-2 text-sm font-medium text-stone-700"
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
                  className="rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm font-medium text-stone-700 transition hover:border-stone-300 hover:text-stone-900"
                >
                  {item.label}
                </Link>
              )
            ))}
          </nav>
          <Link
            href="/make-my-trip"
            onClick={() => setMobileOpen(false)}
            className="mt-4 inline-flex w-full items-center justify-center rounded-full border border-[#ffc000] bg-[#ffc000] px-5 py-3 text-sm font-semibold !text-[#0b0b0b]"
          >
            Plan Journey
          </Link>
        </div>
      ) : null}
    </header>
  );
}