import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/page-shell";
import { TourLanding } from "@/components/tour-landing";
import { getTourPackagesForDestination } from "@/lib/data/tour-packages";
import { absoluteUrl, destinations, tourMenu, whatsappUrl } from "@/lib/site";
import { buildPageSchema } from "@/lib/seo/structured-data";

type TourPackagePageProps = {
  params: Promise<{ region: string; slug: string }>;
};

function resolveRegion(region: string) {
  return tourMenu.find((group) => group.href.endsWith(`/${region}`));
}

function resolveItem(region: string, slug: string) {
  const group = resolveRegion(region);
  if (!group) {
    return { group: null, item: null };
  }

  const item = group.items.find((entry) => entry.href.endsWith(`/${slug}`));
  return { group, item };
}

function getPackageImage(slug: string) {
  const normalized = slug.toLowerCase();
  if (normalized.includes("hunza")) return "/images/destinations/hunza-custom.webp";
  if (normalized.includes("skardu")) return "/images/destinations/skardu-1080x1920.webp";
  if (normalized.includes("astor")) return "/images/destinations/hunza-custom.webp";
  if (normalized.includes("naran") || normalized.includes("kaghan")) return "/images/destinations/naran-hd.webp";
  if (normalized.includes("swat")) return "/images/destinations/swat-hd.webp";
  if (
    normalized.includes("kashmir") ||
    normalized.includes("beach") ||
    normalized.includes("gwadar") ||
    normalized.includes("ormara") ||
    normalized.includes("charna") ||
    normalized.includes("bhit") ||
    normalized.includes("moola") ||
    normalized.includes("gorakh") ||
    normalized.includes("quetta")
  ) {
    return "/images/destinations/kashmir.webp";
  }
  return destinations[0]?.image ?? "/images/destinations/hunza.avif";
}

export async function generateStaticParams() {
  return tourMenu.flatMap((group) => {
    const region = group.href.split("/").filter(Boolean).at(-1) ?? "";
    return group.items.map((item) => ({
      region,
      slug: item.href.split("/").filter(Boolean).at(-1) ?? "",
    }));
  });
}

export async function generateMetadata({ params }: TourPackagePageProps): Promise<Metadata> {
  const { region, slug } = await params;
  const { item } = resolveItem(region, slug);

  if (!item) {
    return {};
  }

  const description = item.description ?? `${item.label} by Hodophile Adventures with curated route support.`;

  return {
    title: item.label,
    description,
    alternates: {
      canonical: item.href,
    },
    openGraph: {
      title: item.label,
      description,
      url: absoluteUrl(item.href),
    },
  };
}

export default async function TourPackagePage({ params }: TourPackagePageProps) {
  const { region, slug } = await params;
  const { group, item } = resolveItem(region, slug);

  if (!group || !item) {
    notFound();
  }

  const matchingPackages = getTourPackagesForDestination(item.destinationSlug);
  const packageIncludes = [...new Set(matchingPackages.flatMap((tourPackage) => tourPackage.includes ?? []))];
  const packageExcludes = [...new Set(matchingPackages.flatMap((tourPackage) => tourPackage.excludes ?? []))];
  const accommodationDetails = packageIncludes.filter((detail) => /hotel|accommodation|stay/i.test(detail));
  const transportDetails = [...new Set(matchingPackages.flatMap((tourPackage) => tourPackage.transport ?? []))];
  const routeContent = {
    summary: item.description ?? "Journey descriptions are maintained on each canonical package record.",
    itinerary: [],
    includes: packageIncludes,
    excludes: packageExcludes,
    hotel: accommodationDetails.join("; ") || "Accommodation details are not specified in the related journey records.",
    vehicle: transportDetails.join("; ") || "Transport details are not specified in the related journey records.",
    pricing: matchingPackages.length
      ? matchingPackages.map((tourPackage) => `${tourPackage.title}: PKR ${tourPackage.pricePerPerson.toLocaleString()} per person`).join("; ")
      : "No matching journeys are currently listed for this destination.",
    faqs: [
      {
        question: "Are fixed departure dates listed?",
        answer: matchingPackages.some((tourPackage) => tourPackage.departures.length > 0)
          ? "Review the linked journey for its listed departure records and confirm current availability."
          : "No date-specific departures are currently listed for these journeys. Request your dates to confirm availability.",
      },
      {
        question: "Where can I confirm package details?",
        answer: "Open a linked canonical journey to review its listed route, price, and notes, then confirm date-specific arrangements with the planning team.",
      },
    ],
  };

  return (
    <>
      <JsonLd
        data={buildPageSchema({
          title: item.label,
          description: item.description ?? `${item.label} by Hodophile Adventures with curated route support.`,
          url: item.href,
          breadcrumbs: [
            { name: "Home", url: "/" },
            { name: "Tours", url: "/tours" },
            { name: group.label, url: group.href },
            { name: item.label, url: item.href },
          ],
        })}
      />
      <PageShell wide>
        <TourLanding
          eyebrow={group.label}
          title={item.label}
          description={
            item.description ?? routeContent.summary
          }
          image={getPackageImage(slug)}
          highlights={["Tailored itinerary", "Route support", "Private options", "Booking assistance"]}
          ctaHref="/make-my-trip"
          ctaLabel="Request This Package"
        />

        <section className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] xl:gap-8">
          <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_12px_32px_rgba(15,23,42,0.06)] md:p-8">
            <p className="text-xs uppercase tracking-[0.32em] text-stone-500">Route overview</p>
            <h2 className="mt-3 font-serif text-3xl text-stone-900">Why this journey works</h2>
            <p className="mt-4 text-sm leading-7 text-stone-600">{routeContent.summary}</p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-4">
                <p className="text-sm font-semibold text-stone-900">Hotel plan</p>
                <p className="mt-2 text-sm leading-7 text-stone-600">{routeContent.hotel}</p>
              </div>
              <div className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-4">
                <p className="text-sm font-semibold text-stone-900">Vehicle plan</p>
                <p className="mt-2 text-sm leading-7 text-stone-600">{routeContent.vehicle}</p>
              </div>
              <div className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-4">
                <p className="text-sm font-semibold text-stone-900">Pricing clarity</p>
                <p className="mt-2 text-sm leading-7 text-stone-600">{routeContent.pricing}</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#fcc000] bg-[#fff8df] p-6 shadow-sm md:p-8">
            <p className="text-xs uppercase tracking-[0.32em] text-stone-500">Fast answer</p>
            <h2 className="mt-3 font-serif text-3xl text-stone-900">What drives the final price</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-stone-700">
              <li className="flex items-start gap-3"><span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#fcc000]" /><span>Room sharing and hotel category</span></li>
              <li className="flex items-start gap-3"><span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#fcc000]" /><span>Vehicle type and number of travel days</span></li>
              <li className="flex items-start gap-3"><span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#fcc000]" /><span>Seasonality and road conditions</span></li>
              <li className="flex items-start gap-3"><span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#fcc000]" /><span>Any custom add-ons or upgraded room requests</span></li>
            </ul>
          </div>
        </section>

        <section className="mt-10 flex flex-col gap-4 border-y border-stone-300 py-7 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-stone-500">Package-specific itinerary</p>
              <h2 className="mt-2 font-serif text-2xl text-stone-900">See the day plan on each package.</h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-stone-600">This destination page does not have one approved day-by-day plan for every departure. Open a package below to review its itinerary and confirm the final schedule with our team.</p>
            </div>
            <a href="#available-departures" className="shrink-0 text-sm font-semibold text-[#8b6b00] underline decoration-[#d9a407]/50 underline-offset-4">Browse available packages</a>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-2 xl:gap-8">
          <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_12px_32px_rgba(15,23,42,0.06)] md:p-8">
            <p className="text-xs uppercase tracking-[0.32em] text-stone-500">Included</p>
            <h2 className="mt-3 font-serif text-3xl text-stone-900">What&apos;s usually covered</h2>
            {routeContent.includes.length ? (
              <ul className="mt-5 space-y-3 text-sm leading-7 text-stone-600">
                {routeContent.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3"><span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#fcc000]" /><span>{item}</span></li>
                ))}
              </ul>
            ) : <p className="mt-5 text-sm leading-7 text-stone-600">Inclusions are not specified in the canonical journey records. Confirm them for your dates.</p>}
          </div>

          <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_12px_32px_rgba(15,23,42,0.06)] md:p-8">
            <p className="text-xs uppercase tracking-[0.32em] text-stone-500">Not included</p>
            <h2 className="mt-3 font-serif text-3xl text-stone-900">What is usually separate</h2>
            {routeContent.excludes.length ? (
              <ul className="mt-5 space-y-3 text-sm leading-7 text-stone-600">
                {routeContent.excludes.map((item) => (
                  <li key={item} className="flex items-start gap-3"><span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#0b0b0b]" /><span>{item}</span></li>
                ))}
              </ul>
            ) : <p className="mt-5 text-sm leading-7 text-stone-600">Exclusions are not specified in the canonical journey records. Confirm them before booking.</p>}
          </div>
        </section>

        <section id="available-departures" className="mt-10 rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_12px_32px_rgba(15,23,42,0.06)] md:p-8">
          <div className="flex items-end justify-between gap-4 border-b border-stone-200 pb-5">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-stone-500">Canonical journeys</p>
              <h2 className="mt-3 font-serif text-3xl text-stone-900">{matchingPackages.length} matching {matchingPackages.length === 1 ? "journey" : "journeys"}</h2>
            </div>
            <Link href="/tours" className="text-sm font-medium text-stone-600 transition hover:text-[#8b6b00]">View all tours</Link>
          </div>
          {matchingPackages.length ? (
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {matchingPackages.map((pkg) => (
                <article key={pkg.id} className="group rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5 transition hover:-translate-y-1 hover:border-[#fcc000] hover:bg-[#fff8df]">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#9a7600]">{pkg.duration}</p>
                  <Link href={`/packages/${pkg.id}`} className="block">
                    <h3 className="mt-3 font-serif text-2xl leading-tight text-stone-900">{pkg.title}</h3>
                  </Link>
                  <p className="mt-3 text-sm text-stone-600">{pkg.description}</p>
                  {pkg.scheduleNote ? <p className="mt-3 text-xs text-stone-500">Schedule note: {pkg.scheduleNote}</p> : null}
                  <div className="mt-4 flex items-center justify-between gap-3 border-t border-stone-200 pt-3">
                    <span className="text-sm font-semibold text-stone-900">PKR {pkg.pricePerPerson.toLocaleString()}</span>
                    <Link href={`/packages/${pkg.id}`} className="text-xs uppercase tracking-[0.16em] text-stone-500 group-hover:text-[#8b6b00]">View journey ↗</Link>
                  </div>
                  <a
                    href={whatsappUrl(`Hi Hodophile, I am interested in ${pkg.title}. Please confirm availability and the best current price.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-[#1f6b4a] px-4 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[#174f37]"
                  >
                    Check availability
                  </a>
                </article>
              ))}
            </div>
          ) : (
            <p className="mt-6 rounded-xl border border-dashed border-stone-300 bg-stone-50 p-5 text-sm text-stone-600">
              No matching journeys are currently listed for this destination.
            </p>
          )}
        </section>

        <section className="mt-10 rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_12px_32px_rgba(15,23,42,0.06)] md:p-8">
          <p className="text-xs uppercase tracking-[0.32em] text-stone-500">Frequently asked</p>
          <h2 className="mt-3 font-serif text-3xl text-stone-900">Questions travelers usually ask</h2>
          <div className="mt-6 space-y-4">
            {routeContent.faqs.map((faq) => (
              <details key={faq.question} className="rounded-[1.25rem] border border-stone-200 bg-stone-50 p-4">
                <summary className="cursor-pointer text-sm font-semibold text-stone-900">{faq.question}</summary>
                <p className="mt-3 text-sm leading-7 text-stone-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-[2rem] border border-[#fcc000] bg-[#fff8df] p-6 shadow-sm md:p-8">
          <p className="text-xs uppercase tracking-[0.32em] text-stone-500">Need a custom plan?</p>
          <h2 className="mt-3 font-serif text-3xl text-stone-900">Tell us your dates and we will tailor the route around you.</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="/make-my-trip" className="inline-flex rounded-full bg-[#0b0b0b] px-5 py-3 text-sm font-semibold !text-white transition hover:bg-black">Customize this trip</a>
            <a href={whatsappUrl(`Hi Hodophile, I want to book the ${item.label} package. Please share availability and the best current price.`)} target="_blank" rel="noopener noreferrer" className="inline-flex rounded-full border border-[#0b0b0b] px-5 py-3 text-sm font-semibold text-stone-900 transition hover:border-[#fcc000] hover:bg-[#fcc000]/10">WhatsApp a travel expert</a>
          </div>
        </section>
      </PageShell>
    </>
  );
}