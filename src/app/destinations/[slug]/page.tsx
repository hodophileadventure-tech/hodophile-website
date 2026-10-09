import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/page-shell";
import { absoluteUrl, destinationTourPageRedirects } from "@/lib/site";
import { getTourPackageById, getTourPackagesForDestination } from "@/lib/data/tour-packages";
import { buildPageSchema } from "@/lib/seo/structured-data";

type DestinationPageProps = {
  params: Promise<{ slug: string }>;
};

const destinationGalleries = {
  hunza: {
    name: "Hunza",
    description: "Terraced valleys, dramatic peaks, and scenic stays. Experience the magic of Hunza's alpine beauty.",
    images: [
      { src: "/images/package-cards/images__destinations__hunza.avif", alt: "Hunza Valley" },
      { src: "/images/package-cards/images__destinations__featured-hunza-naltar.webp", alt: "Hunza Naltar" },
    ],
    highlights: ["Terraced valleys", "Dramatic peaks", "Alpine beauty", "Scenic stays"],
    journeyStyle: "Slow mountain travel with heritage villages and scenic stops.",
    bestSeason: "May to October",
    idealDuration: "5 to 7 days",
    bestFor: "Families, couples, and first-time northern travelers",
    tripHighlights: [
      "Karimabad, Baltit Fort, and Eagle's Nest viewpoints",
      "Comfortable heritage stays with valley-side dining",
      "Flexible day pacing for photography and rest",
    ],
    routeSuggestions: [
      { title: "Hunza Valley Tour Packages", href: "/tours/northern-tours/hunza-valley-tour-packages", meta: "Heritage + scenery" },
      { journeyId: "skardu-hunza-air-7-days", meta: "Northerns + premium route" },
    ],
    faq: [
      { question: "How many days should I spend in Hunza?", answer: "A 5 to 7 day plan works best for a balanced experience that includes the valley, viewpoints, and travel recovery." },
      { question: "Is Hunza good for families?", answer: "Yes. It is one of the more comfortable mountain destinations for families when the trip is paced well and hotel choices are clear." },
    ],
  },
  skardu: {
    name: "Skardu",
    description: "Lakes, forts, and wide alpine views. A premium destination for northern adventures.",
    images: [
      { src: "/images/package-cards/images__destinations__skardu.webp", alt: "Skardu" },
      { src: "/images/package-cards/images__destinations__featured-skardu-basho.webp", alt: "Skardu Basho" },
      { src: "/images/package-cards/images__destinations__featured-skardu-hunza.webp", alt: "Skardu Hunza" },
    ],
    highlights: ["Alpine lakes", "Historic forts", "Mountain views", "Premium routes"],
    journeyStyle: "A larger valley that rewards longer planning and slower driving days.",
    bestSeason: "April to October",
    idealDuration: "6 to 8 days",
    bestFor: "Adventure travelers, photographers, and premium private groups",
    tripHighlights: [
      "Lake visits, glacier viewpoints, and high-altitude scenery",
      "Historic fort stops and mountain-side evenings",
      "Ideal for balanced exploration without rushed transfers",
    ],
    routeSuggestions: [
      { title: "Skardu Valley Tour Packages", href: "/tours/northern-tours/skardu-valley-tour-packages", meta: "Classic Baltistan route" },
      { journeyId: "skardu-deosai-air-3-days", meta: "Quick premium escape" },
    ],
    faq: [
      { question: "Why is Skardu best with extra time?", answer: "The valley is large and scenic, so the route is more enjoyable when you leave room for slower pace, weather changes, and rest." },
      { question: "Is Skardu better with a private vehicle?", answer: "For most travelers, yes. It makes route flexibility easier and helps keep the trip comfortable across long scenic segments." },
    ],
  },
  naran: {
    name: "Naran",
    description: "Road trips, river views, and summer escapes. Perfect for families and groups.",
    images: [
      { src: "/images/package-cards/images__destinations__naran.webp", alt: "Naran" },
      { src: "/images/package-cards/images__destinations__naran-saif.webp", alt: "Naran Saif" },
    ],
    highlights: ["River views", "Summer escapes", "Road trips", "Family-friendly"],
    journeyStyle: "Easy-to-plan mountain holidays with scenic drives and natural valley stops.",
    bestSeason: "May to September",
    idealDuration: "3 to 5 days",
    bestFor: "Families, quick escapes, and road-trip travelers",
    tripHighlights: [
      "Kaghan Valley approach with strong scenic road energy",
      "Ideal for accessing meadows and valley viewpoints",
      "Good for shorter domestic holidays and flexible departures",
    ],
    routeSuggestions: [
      { title: "Naran Valley Tour Packages", href: "/tours/northern-tours/naran-valley-tour-packages", meta: "Family-friendly mountain getaway" },
      { journeyId: "hunza-skardu-naran-12-days", meta: "Longer route combination" },
    ],
    faq: [
      { question: "Is Naran good for a short trip?", answer: "Yes. It is one of the easiest northern destinations to plan for a 3 to 5 day family trip." },
      { question: "When does it feel best?", answer: "Late spring to early autumn offers the most comfortable road and valley conditions." },
    ],
  },
  kashmir: {
    name: "Kashmir",
    description: "Soft valleys, clean air, and scenic routes. A calm getaway in nature.",
    images: [
      { src: "/images/package-cards/images__destinations__kashmir.webp", alt: "Kashmir" },
    ],
    highlights: ["Soft valleys", "Clean mountain air", "Scenic routes", "Peaceful getaway"],
    journeyStyle: "A calm valley experience built around comfort, pacing, and scenic quietude.",
    bestSeason: "April to October",
    idealDuration: "4 to 6 days",
    bestFor: "Couples, relaxed travelers, and scenic group departures",
    tripHighlights: [
      "Mild mountain atmosphere with strong visual depth",
      "Ideal for a break from fast urban travel",
      "Comfort-focused stays and leisurely route planning",
    ],
    routeSuggestions: [
      { title: "Kashmir Valley Tour Packages", href: "/tours/northern-tours/kashmir-valley-tour-packages", meta: "Calm and scenic" },
      { journeyId: "kashmir-shogran-9-days", meta: "Cultural + mountain route" },
    ],
    faq: [
      { question: "Is Kashmir better for couples or families?", answer: "It works well for both, especially when the itinerary focuses on scenic comfort and flexible pacing." },
      { question: "Does it suit a slower itinerary?", answer: "Yes. Kashmir is especially rewarding when travelers allow time to absorb the valley instead of moving too quickly." },
    ],
  },
  swat: {
    name: "Swat",
    description: "Green hills and peaceful routes. A classic domestic Pakistan tour.",
    images: [
      { src: "/images/package-cards/images__destinations__swat.webp", alt: "Swat" },
      { src: "/images/package-cards/images__destinations__featured-kalam-malam-jabba.webp", alt: "Swat Kalam" },
    ],
    highlights: ["Green hills", "Peaceful routes", "Valley scenery", "Cultural experiences"],
    journeyStyle: "A balanced valley route with scenic roads, relaxed evenings, and easy family pacing.",
    bestSeason: "April to November",
    idealDuration: "4 to 6 days",
    bestFor: "Families, culture-first travelers, and soft adventure seekers",
    tripHighlights: [
      "Cooler valley views and heritage-rich surroundings",
      "Great route for comfortable family travel",
      "Flexible stays for scenic stops and local exploration",
    ],
    routeSuggestions: [
      { title: "Swat Valley Tour Packages", href: "/tours/northern-tours/swat-valley-tour-packages", meta: "Family + green valley" },
      { journeyId: "swat-kalam-shogran-10-days", meta: "Longer northern route" },
    ],
    faq: [
      { question: "Is Swat suitable for a first trip?", answer: "Yes. It is a reliable choice for travelers who want a scenic domestic route without needing extreme mountain logistics." },
      { question: "What is the ideal travel season?", answer: "Spring to early autumn generally offers the most comfortable weather and smooth valley travel." },
    ],
  },
  khaplu: {
    name: "Khaplu",
    description: "A quiet Baltistan valley of historic forts, wide mountain views, and peaceful cultural routes.",
    images: [{ src: "/images/package-cards/images__destinations__featured-skardu-basho.webp", alt: "Khaplu mountain landscape" }],
    highlights: ["Khaplu Palace", "Baltistan culture", "Mountain views", "Quiet routes"],
    journeyStyle: "A calmer Baltistan route for travelers who prefer low-noise, heritage-filled mountain travel.",
    bestSeason: "May to October",
    idealDuration: "5 to 7 days",
    bestFor: "Slow travelers, cultural explorers, and premium route planners",
    tripHighlights: [
      "Historic setting with strong cultural depth",
      "Longer valley views and low-traffic mountain days",
      "A better fit for travelers seeking calm, not constant movement",
    ],
    routeSuggestions: [
      { journeyId: "skardu-khaplu-deosai-basho-air-7-days", meta: "Heritage + glacial route" },
      { title: "Skardu Valley Tour Packages", href: "/tours/northern-tours/skardu-valley-tour-packages", meta: "Region-level journey" },
    ],
    faq: [
      { question: "Why travel to Khaplu?", answer: "It offers a quieter, more culturally rich mountain experience than the more famous high-volume stops." },
      { question: "Is it ideal for a premium trip?", answer: "Yes, especially when travelers want a slower and more refined Baltistan route." },
    ],
  },
  shogran: {
    name: "Shogran",
    description: "A cool forested hill retreat with meadow views and an easy escape into the Kaghan Valley.",
    images: [{ src: "/images/package-cards/images__destinations__naran.webp", alt: "Shogran valley landscape" }],
    highlights: ["Forest trails", "Siri Paye", "Meadow views", "Kaghan Valley"],
    journeyStyle: "Short, comfortable mountain breaks built around nature, rest, and scenic weather.",
    bestSeason: "May to October",
    idealDuration: "2 to 4 days",
    bestFor: "Quick family breaks and alpine getaways",
    tripHighlights: [
      "Cool climate and forest-side overnight stays",
      "Simple route structure for easier planning",
      "Useful as part of a longer northern itinerary",
    ],
    routeSuggestions: [
      { journeyId: "kashmir-shogran-9-days", meta: "Two-destination route" },
      { journeyId: "swat-kalam-shogran-10-days", meta: "Green hills + alpine retreat" },
    ],
    faq: [
      { question: "Is Shogran a full destination or a stopover?", answer: "It works as both. It is especially enjoyable as a calm base before continuing toward larger northern routes." },
      { question: "Does it suit a short break?", answer: "Yes. It is one of the easier mountain destinations to plan for a weekend or short family trip." },
    ],
  },
  ormara: {
    name: "Ormara",
    description: "A relaxed Makran coast escape for beachside camping, open sea views, and slow weekend travel.",
    images: [{ src: "/images/package-cards/images__editorial__editorial-4.webp", alt: "Ormara coastal escape" }],
    highlights: ["Beach camping", "Makran coast", "Sea views", "Weekend escape"],
    journeyStyle: "A coastal route designed for relaxed travel, sea air, and simple logistics.",
    bestSeason: "October to March",
    idealDuration: "2 to 3 days",
    bestFor: "Weekend travelers, families, and coastal-seeking groups",
    tripHighlights: [
      "Open coast, cliffs, and beachside evenings",
      "Easy-to-plan weekend route for southern Pakistan travelers",
      "Simple, scenic escape without complex mountain logistics",
    ],
    routeSuggestions: [
      { journeyId: "ormara-beach-camping", meta: "Weekend coastal route" },
      { title: "Bhit Khori weekend packages", href: "/tours/southern-tours/bhit-khori-day-packages", meta: "Nearby coastal alternatives" },
    ],
    faq: [
      { question: "Is Ormara more of a beach or camping destination?", answer: "It is mainly a beach and camping-style escape, so it works best for travelers who like a relaxed coastal plan." },
      { question: "When is the best time to visit?", answer: "Late autumn to early spring is usually the most comfortable time for sea-side travel and scenic nights." },
    ],
  },
  "fairy-meadows": {
    name: "Fairy Meadows",
    description: "Remote alpine meadows beneath Nanga Parbat, made for dramatic views and mountain-hike journeys.",
    images: [{ src: "/images/package-cards/images__destinations__fairy-meadows-unsplash.webp", alt: "Fairy Meadows" }],
    highlights: ["Nanga Parbat", "Alpine meadows", "Mountain hikes", "Remote escape"],
    journeyStyle: "A remote, photo-driven route that rewards a slower, more deliberate plan.",
    bestSeason: "June to September",
    idealDuration: "4 to 6 days",
    bestFor: "Adventure travelers and photography-focused groups",
    tripHighlights: [
      "Remote alpine views under Nanga Parbat",
      "Strong hiking and landscape appeal",
      "A better option for travelers seeking a quieter, more remote mountain vibe",
    ],
    routeSuggestions: [
      { title: "Fairy Meadows route planning", href: "/make-my-trip", meta: "Custom mountain itinerary" },
      { title: "Northern tour collection", href: "/tours", meta: "Compare destination options" },
    ],
    faq: [
      { question: "Is Fairy Meadows for first-time travelers?", answer: "It can work, but it is best when the traveler is comfortable with a more remote route and a slower pace." },
      { question: "What kind of trip works best here?", answer: "A scenic, mountain-focused plan that balances viewpoint time, rest, and fewer daily moves." },
    ],
  },
  minimerg: {
    name: "Minimerg",
    description: "A remote highland escape into White Peaks and dramatic valleys with a slower mountain rhythm.",
    images: [{ src: "/images/package-cards/images__destinations__minimerg-kashmir.webp", alt: "Minimerg valley" }],
    highlights: ["White Peaks", "Remote valleys", "Jeep access", "Highland scenery"],
    journeyStyle: "A quiet and remote route meant for travelers who value scenery over convenience.",
    bestSeason: "May to October",
    idealDuration: "5 to 7 days",
    bestFor: "Highland adventurers and custom mountain planners",
    tripHighlights: [
      "Highland scenery and remote route energy",
      "More exploratory than classic mainstream stops",
      "Suitable when travelers want a stronger offbeat experience",
    ],
    routeSuggestions: [
      { title: "Build a custom mountain route", href: "/make-my-trip", meta: "Design your own itinerary" },
      { title: "Explore all destinations", href: "/destinations", meta: "Browse more routes" },
    ],
    faq: [
      { question: "Is Minimerg ideal for every traveler?", answer: "Not necessarily. It is better for travelers who want a more remote and less polished route than the larger northern destinations." },
      { question: "How should it be planned?", answer: "Use extra buffer days and keep the daily route realistic so the trip remains scenic and restful." },
    ],
  },
};

export async function generateStaticParams() {
  return [...Object.keys(destinationGalleries), ...Object.keys(destinationTourPageRedirects)].map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: DestinationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const destination = destinationGalleries[slug as keyof typeof destinationGalleries];

  if (!destination) {
    return {};
  }

  return {
    title: `${destination.name} Travel Guide & Tour Packages`,
    description: `${destination.description} Best season: ${destination.bestSeason}. Ideal duration: ${destination.idealDuration}.`,
    alternates: {
      canonical: `/destinations/${slug}`,
    },
    openGraph: {
      title: `${destination.name} Travel Guide`,
      description: destination.description,
      url: absoluteUrl(`/destinations/${slug}`),
      images: [
        {
          url: absoluteUrl(destination.images[0].src),
          width: 1200,
          height: 630,
          alt: destination.name,
        },
      ],
    },
  };
}

export default async function DestinationGalleryPage({ params }: DestinationPageProps) {
  const { slug } = await params;
  const destination = destinationGalleries[slug as keyof typeof destinationGalleries];

  if (!destination) {
    const redirectPath = destinationTourPageRedirects[slug as keyof typeof destinationTourPageRedirects];
    if (redirectPath) redirect(redirectPath);
    notFound();
  }

  const packages = getTourPackagesForDestination(slug);

  return (
    <>
      <JsonLd
        data={buildPageSchema({
          title: `${destination.name} travel guide`,
          description: destination.description,
          url: `/destinations/${slug}`,
          breadcrumbs: [
            { name: "Home", url: "/" },
            { name: "Destinations", url: "/destinations" },
            { name: destination.name, url: `/destinations/${slug}` },
          ],
        })}
      />
      <PageShell wide>
        <section className="space-y-6">
          <div>
            <Link href="/destinations" className="text-sm font-medium text-[#ffc000] hover:text-[#ffd24d]">
              ← Back to destinations
            </Link>
            <h1 className="mt-6 font-serif text-5xl font-semibold text-stone-950">{destination.name}</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-stone-600">{destination.description}</p>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {destination.highlights.map((highlight) => (
              <span
                key={highlight}
                className="rounded-full border border-[#fcc000]/20 bg-[#fcc000]/10 px-3 py-1 text-sm text-[#fcc000]"
              >
                {highlight}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "Best time", value: destination.bestSeason },
            { label: "Ideal duration", value: destination.idealDuration },
            { label: "Best for", value: destination.bestFor },
            { label: "Travel style", value: destination.journeyStyle },
          ].map((fact) => (
            <div key={fact.label} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.04)]">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-stone-500">{fact.label}</p>
              <p className="mt-3 text-base leading-7 text-stone-800">{fact.value}</p>
            </div>
          ))}
        </section>

        <section className="mt-12 grid gap-7 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] border border-stone-200 bg-white p-7 shadow-[0_18px_40px_rgba(15,23,42,0.04)]">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#b98a00]">Why travelers choose it</p>
            <h2 className="mt-4 font-serif text-3xl font-semibold text-stone-950">A destination built for memorable route planning.</h2>
            <ul className="mt-6 space-y-4 text-base leading-7 text-stone-600">
              {destination.tripHighlights.map((point) => (
                <li key={point} className="flex gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#fcc000]/20 text-[#a36d00]">✓</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[2rem] border border-stone-200 bg-stone-50 p-7">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-stone-500">Quick links</p>
            <div className="mt-5 space-y-3">
              {destination.routeSuggestions.map((route) => {
                const linkedPackage = "journeyId" in route && route.journeyId ? getTourPackageById(route.journeyId) : undefined;
                const href = linkedPackage ? `/packages/${linkedPackage.id}` : "href" in route ? route.href ?? "/tours" : "/tours";
                const title = linkedPackage?.title ?? ("title" in route ? route.title : "");

                return <Link
                  key={href}
                  href={href}
                  className="block rounded-2xl border border-stone-200 bg-white p-4 transition hover:border-[#fcc000]/50 hover:bg-[#fff8db]"
                >
                  <p className="font-semibold text-stone-900">{title}</p>
                  <p className="mt-1 text-sm text-stone-500">{route.meta}</p>
                </Link>;
              })}
            </div>
          </div>
        </section>

        {packages.length > 0 && (
          <section className="relative mt-16 overflow-hidden rounded-[2rem] bg-[#0b0b0b] px-5 py-8 text-white shadow-[0_28px_70px_rgba(11,11,11,0.16)] sm:px-8 sm:py-10 lg:px-12 lg:py-12">
            <div className="pointer-events-none absolute right-[-5rem] top-[-7rem] h-64 w-64 rounded-full border border-[#fcc000]/20" />
            <div className="pointer-events-none absolute right-8 top-8 h-24 w-24 rounded-full border border-[#fcc000]/10" />

            <div className="relative flex flex-wrap items-end justify-between gap-6 border-b border-white/10 pb-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#fcc000]">Curated journeys</p>
                <h2 className="mt-4 max-w-xl font-serif text-3xl font-normal leading-tight sm:text-4xl">{destination.name} journeys, thoughtfully arranged.</h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/60">Choose a considered route with transparent pricing, carefully planned transport, and the freedom to travel at your own pace.</p>
              </div>
              <p className="shrink-0 text-xs uppercase tracking-[0.2em] text-white/45">{packages.length} {packages.length === 1 ? "journey" : "journeys"} available</p>
            </div>

            <div className="relative mt-8 grid gap-5 md:grid-cols-2">
              {packages.map((tourPackage) => (
                <article key={tourPackage.id} className="group rounded-2xl border border-white/10 bg-white/[0.06] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#fcc000]/50 hover:bg-white/[0.09] sm:p-7">
                  <div className="flex flex-wrap items-start justify-between gap-5 border-b border-white/10 pb-5">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#fcc000]">{tourPackage.duration}</p>
                      <h3 className="mt-3 max-w-sm font-serif text-2xl font-normal leading-tight text-white">
                        <Link href={`/packages/${tourPackage.id}`} className="transition hover:text-[#fcc000]">{tourPackage.title}</Link>
                      </h3>
                    </div>
                    <div className="text-right">
                      <p className="text-[0.65rem] uppercase tracking-[0.18em] text-white/45">From</p>
                      <p className="mt-1 text-xl font-semibold text-[#fcc000]">{tourPackage.priceOnRequest ? "Price on request" : `PKR ${tourPackage.pricePerPerson.toLocaleString()}`}</p>
                      <p className="text-xs text-white/45">per person</p>
                      {tourPackage.couplePrice && <p className="mt-2 text-xs text-white/60">PKR {tourPackage.couplePrice.toLocaleString()} / couple</p>}
                    </div>
                  </div>
                  <div className="mt-5 space-y-3 text-sm leading-6 text-white/65">
                    {tourPackage.scheduleNote && <p><span className="mr-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white/40">Schedule note</span>{tourPackage.scheduleNote}</p>}
                    {tourPackage.transport && <p><span className="mr-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white/40">Transport</span>{tourPackage.transport.join("; ")}</p>}
                    {tourPackage.includes && <p><span className="mr-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white/40">Includes</span>{tourPackage.includes.join("; ")}</p>}
                    {tourPackage.excludes && <p><span className="mr-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white/40">Excludes</span>{tourPackage.excludes.join("; ")}</p>}
                  </div>
                  {tourPackage.notes?.map((note) => <p key={note} className="mt-5 border-t border-white/10 pt-4 text-xs leading-6 text-white/45">{note}</p>)}
                </article>
              ))}
            </div>
          </section>
        )}

        <section className="mt-12 rounded-[2rem] border border-stone-200 bg-white p-7 shadow-[0_18px_40px_rgba(15,23,42,0.04)]">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-stone-500">Frequently asked questions</p>
          <div className="mt-6 space-y-5">
            {destination.faq.map((item) => (
              <div key={item.question} className="rounded-2xl border border-stone-200 bg-stone-50 p-5">
                <p className="font-semibold text-stone-900">{item.question}</p>
                <p className="mt-2 text-sm leading-7 text-stone-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="mb-8 font-serif text-3xl font-semibold">Gallery</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {destination.images.map((image) => (
              <div key={image.src} className="group overflow-hidden rounded-2xl border border-stone-200 shadow-sm">
                <div className="relative aspect-square overflow-hidden bg-stone-100">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <p className="font-medium text-stone-900">{image.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-stone-200 bg-stone-50 p-8">
          <h2 className="font-serif text-3xl font-semibold">Ready to visit {destination.name}?</h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-stone-600">
            Let us craft a personalized itinerary for your {destination.name} adventure. Share your dates, budget, and preferences.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/make-my-trip"
              className="inline-flex rounded-full bg-[#ffc000] px-6 py-3 text-sm font-semibold text-[#0b0b0b] transition hover:bg-[#ffd24d]"
            >
              Plan My Trip
            </Link>
            <Link
              href="/contact-us"
              className="inline-flex rounded-full border border-[#ffc000] bg-transparent px-6 py-3 text-sm font-semibold text-[#ffc000] transition hover:bg-[#ffc000]/10"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </PageShell>
    </>
  );
}
