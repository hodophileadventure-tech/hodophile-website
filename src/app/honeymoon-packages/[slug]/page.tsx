import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { PageShell } from "@/components/page-shell";
import { absoluteUrl } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

const packages: Record<
  string,
  {
    title: string;
    duration: string;
    image: string;
    description: string;
    price?: string;
    includes?: string[];
    excluded?: string[];
    bookingPolicy?: string[];
    childPolicy?: string[];
    mealsMenu?: { breakfast: string; dinner: string };
    detailSections?: { title: string; content: string[] }[];
  }
> = {
  "swat-kalam-4days": {
    title: "Swat & Kalam — 4 Days",
    duration: "4 Days / 3 Nights",
    image: "/images/honeymoon/swat-kalam.jpg",
    description: "Experience Swat Valley and Kalam with Mahodand Lake and Ushu Forest excursions.",
    price: "PKR 120,000",
    includes: [
      "Hotel accommodations on sharing basis",
      "Luxury transport",
      "4x4 Jeep ride to Mahodand Lake",
      "Breakfasts and dinners as noted",
      "Tolls and taxes",
      "Tour guide services",
      "Bonfire and scenic phone photography",
    ],
    excluded: [
      "Alcoholic beverages",
      "Personal shopping and souvenirs",
      "Camera permits in restricted areas",
      "Tips and gratuities",
      "Activities beyond itinerary",
    ],
    bookingPolicy: [
      "Advance payment of 50% to confirm booking",
      "Final payment due 15 days before travel",
      "Flexible date changes up to 30 days prior",
      "Group discounts available for 4+ couples",
    ],
    childPolicy: [
      "Below 3 years: Free of cost, no seat provided (lap seating with parent).",
      "3 to 7 years: 50% charged, folding/jumper seat provided.",
      "Above 7 years: 100% charged with full seat.",
    ],
    mealsMenu: {
      breakfast: "Anda, Paratha, Tea, Channa, Omelet (rotating menu)",
      dinner: "Chicken Karahi, Handi, BBQ, Chicken Fried Rice, Vegetables, Daal, Raita, Salad, Naan (rotation)",
    },
    detailSections: [
      {
        title: "Menu During Trip",
        content: [
          "Breakfast: Anda, Paratha, Tea, Channa, Omelet (rotating menu)",
          "Dinner: Chicken Karahi, Handi, BBQ, Chicken Fried Rice, Vegetables, Daal, Raita, Salad, Naan (rotation)",
        ],
      },
      {
        title: "Refund Policy",
        content: [
          "50% refund if cancellation is made 30 days before travel",
          "30% refund if cancellation is made 15 days before travel",
          "No refund if cancellation is made within 15 days of travel",
          "Force majeure events are subject to negotiation",
        ],
      },
      {
        title: "Traveler's Instruction",
        content: [
          "Carry valid CNIC or passport for all travelers",
          "Wear comfortable clothing and closed-toe shoes for hiking",
          "Bring sunscreen, insect repellent, and medications",
          "Maintain fitness level for short mountain hikes",
          "Avoid heavy luggage; one small backpack per person recommended",
        ],
      },
    ],
  },

  "naran-babusar-4days": {
    title: "Naran & Babusar — 4 Days",
    duration: "4 Days / 3 Nights",
    image: "/images/honeymoon/naran-babusar.jpg",
    description: "A romantic route through Kaghan Valley with Saif-ul-Malook and Babusar Top highlights.",
    price: "PKR 120,000",
    includes: [
      "Hotel accommodations on sharing basis",
      "Luxury transport",
      "Jeep access to Saif-ul-Malook",
      "Breakfasts and dinners as noted",
      "Tolls and taxes",
      "Tour guide services",
      "Mountain photography support",
    ],
    excluded: [
      "Alcoholic beverages",
      "Personal shopping",
      "Horse riding at Saif-ul-Malook",
      "Tips and gratuities",
      "Activities beyond itinerary",
    ],
    bookingPolicy: [
      "Advance payment of 50% to confirm booking",
      "Final payment due 15 days before travel",
      "Flexible date changes up to 30 days prior",
      "Group discounts available for 4+ couples",
    ],
    childPolicy: [
      "Below 3 years: Free of cost, no seat provided (lap seating with parent).",
      "3 to 7 years: 50% charged, folding/jumper seat provided.",
      "Above 7 years: 100% charged with full seat.",
    ],
    mealsMenu: {
      breakfast: "Anda, Paratha, Tea, Channa, Omelet (rotating menu)",
      dinner: "Chicken Karahi, Handi, BBQ, Chicken Fried Rice, Vegetables, Daal, Raita, Salad, Naan (rotation)",
    },
    detailSections: [
      {
        title: "Menu During Trip",
        content: [
          "Breakfast: Anda, Paratha, Tea, Channa, Omelet (rotating menu)",
          "Dinner: Chicken Karahi, Handi, BBQ, Chicken Fried Rice, Vegetables, Daal, Raita, Salad, Naan (rotation)",
        ],
      },
      {
        title: "Refund Policy",
        content: [
          "50% refund if cancellation is made 30 days before travel",
          "30% refund if cancellation is made 15 days before travel",
          "No refund if cancellation is made within 15 days of travel",
          "Force majeure events are subject to negotiation",
        ],
      },
      {
        title: "Traveler's Instruction",
        content: [
          "Carry valid CNIC or passport for all travelers",
          "Wear comfortable clothing and sturdy hiking shoes",
          "Bring sunscreen, insect repellent, and medications",
          "Check road conditions before travel; Babusar Top may be closed in winter",
          "Avoid heavy luggage; one small backpack per person recommended",
        ],
      },
    ],
  },

  "kashmir-arangkel-5days": {
    title: "Kashmir Arang Kel — 5 Days",
    duration: "5 Days / 4 Nights",
    image: "/images/honeymoon/kashmir-arangkel.jpg",
    description: "Neelum Valley journey to Kel and Arang Kel with hill-meadow stays and riverside views.",
    price: "PKR 150,000",
    includes: [
      "Hotel accommodations on sharing basis",
      "Luxury transport",
      "4x4 vehicle for upper valley access",
      "Cable car/suspension bridge crossing",
      "Breakfasts and dinners as noted",
      "Tolls and taxes",
      "Local guide services",
      "Valley photography support",
    ],
    excluded: [
      "Alcoholic beverages",
      "Personal shopping and souvenirs",
      "Horse riding in Arang Kel",
      "Tips and gratuities",
      "Activities beyond itinerary",
    ],
    bookingPolicy: [
      "Advance payment of 50% to confirm booking",
      "Final payment due 15 days before travel",
      "Flexible date changes up to 30 days prior",
      "Group discounts available for 4+ couples",
    ],
    childPolicy: [
      "Below 3 years: Free of cost, no seat provided (lap seating with parent).",
      "3 to 7 years: 50% charged, folding/jumper seat provided.",
      "Above 7 years: 100% charged with full seat.",
    ],
    mealsMenu: {
      breakfast: "Anda, Paratha, Tea, Channa, Omelet (rotating menu)",
      dinner: "Chicken Karahi, Handi, BBQ, Chicken Fried Rice, Vegetables, Daal, Raita, Salad, Naan (rotation)",
    },
    detailSections: [
      {
        title: "Menu During Trip",
        content: [
          "Breakfast: Anda, Paratha, Tea, Channa, Omelet (rotating menu)",
          "Dinner: Chicken Karahi, Handi, BBQ, Chicken Fried Rice, Vegetables, Daal, Raita, Salad, Naan (rotation)",
        ],
      },
      {
        title: "Refund Policy",
        content: [
          "50% refund if cancellation is made 30 days before travel",
          "30% refund if cancellation is made 15 days before travel",
          "No refund if cancellation is made within 15 days of travel",
          "Force majeure events are subject to negotiation",
        ],
      },
      {
        title: "Traveler's Instruction",
        content: [
          "Carry valid CNIC or passport; check any travel advisories",
          "Wear comfortable clothing and sturdy hiking shoes",
          "Bring sunscreen, insect repellent, and medications",
          "Maintain fitness for 45–90 minute climb to Arang Kel",
          "Avoid heavy luggage; one small backpack per person recommended",
        ],
      },
    ],
  },
};

function SwatKalamContent() {
  return (
    <>
      <h2 className="mt-6 text-xl font-semibold">Tour Overview</h2>
      <p className="mt-2 text-sm text-stone-600">
        Experience the breathtaking beauty of Swat Valley and Kalam: alpine forests, clear rivers, and relaxed
        valley rhythms. This 4-day route is paced for couples wanting scenic drives and short hikes.
      </p>

      <h3 className="mt-6 text-lg font-semibold">Day 1 — Islamabad → Swat → Kalam</h3>
      <ul className="mt-2 list-inside list-disc text-sm text-stone-600">
        <li>Departure early morning from Islamabad via M-1 and Malakand Pass.</li>
        <li>Stops: Chakdara, Mingora, Fizagat Park, Madyan, Bahrain — lunch in Bahrain.</li>
        <li>Arrive Kalam, hotel check-in, evening stroll and riverside walk.</li>
      </ul>

      <h3 className="mt-4 text-lg font-semibold">Day 2 — Mahodand Lake Excursion</h3>
      <ul className="mt-2 list-inside list-disc text-sm text-stone-600">
        <li>Breakfast and 4×4 jeep ride toward Mahodand Lake via Ushu Forest.</li>
        <li>Activities: short walks in Ushu, boat ride (seasonal), tea by the lake, optional horse riding.</li>
        <li>Return to Kalam for dinner and overnight.</li>
      </ul>

      <h3 className="mt-4 text-lg font-semibold">Day 3 — Kalam → Bahrain → Mingora</h3>
      <ul className="mt-2 list-inside list-disc text-sm text-stone-600">
        <li>After breakfast, drive back via Bahrain, visit Fizagat Park and optional Swat Museum.</li>
        <li>Evening arrival Mingora; local shopping and overnight in Mingora/Swat.</li>
      </ul>

      <h3 className="mt-4 text-lg font-semibold">Day 4 — Swat → Islamabad</h3>
      <p className="mt-2 text-sm text-stone-600">Breakfast and departure for Islamabad with photo stops; arrival by evening.</p>

      <h3 className="mt-6 text-lg font-semibold">Practical Notes</h3>
      <ul className="mt-2 list-inside list-disc text-sm text-stone-600">
        <li>Transport: Private car/minivan; hire local 4×4 for Mahodand.</li>
        <li>Packing: layered clothing, waterproof jacket, sturdy shoes, sunscreen, cash.</li>
        <li>Safety: roads narrow and prone to landslides during monsoon — avoid heavy rain travel.</li>
      </ul>
    </>
  );
}

function NaranBabusarContent() {
  return (
    <>
      <h2 className="mt-6 text-xl font-semibold">Tour Overview</h2>
      <p className="mt-2 text-sm text-stone-600">
        Escape to Kaghan Valley: alpine lakes, sweeping mountain passes, and high-altitude viewpoints. Ideal for
        couples seeking dramatic scenery with gentle activities.
      </p>

      <h3 className="mt-6 text-lg font-semibold">Day 1 — Islamabad → Naran</h3>
      <ul className="mt-2 list-inside list-disc text-sm text-stone-600">
        <li>Early departure via Abbottabad, Balakot, and Kiwai with scenic stops along the Kunhar River.</li>
        <li>Arrive Naran, check-in, riverside cafes and local market exploration.</li>
      </ul>

      <h3 className="mt-4 text-lg font-semibold">Day 2 — Babusar Top & Lulusar Lake</h3>
      <ul className="mt-2 list-inside list-disc text-sm text-stone-600">
        <li>Drive toward Babusar Top via Batakundi, Jalkhad and Besal with photo stops at Lulusar Lake.</li>
        <li>Return to Naran for dinner and relaxation.</li>
      </ul>

      <h3 className="mt-4 text-lg font-semibold">Day 3 — Lake Saif-ul-Malook</h3>
      <ul className="mt-2 list-inside list-disc text-sm text-stone-600">
        <li>Jeep/horse access to Saif-ul-Malook; optional boat rides and short meadow walks.</li>
        <li>Return to Naran for shopping and evening leisure.</li>
      </ul>

      <h3 className="mt-4 text-lg font-semibold">Day 4 — Naran → Islamabad</h3>
      <p className="mt-2 text-sm text-stone-600">Breakfast and return drive toward Islamabad with stops; arrival by evening.</p>

      <h3 className="mt-6 text-lg font-semibold">Practical Notes</h3>
      <ul className="mt-2 list-inside list-disc text-sm text-stone-600">
        <li>Transport: sturdy car; jeeps for Saif-ul-Malook approach.</li>
        <li>Season: Babusar Top usually open May–October; check road conditions.</li>
      </ul>
    </>
  );
}

function KashmirArangkelContent() {
  return (
    <>
      <h2 className="mt-6 text-xl font-semibold">Tour Overview</h2>
      <p className="mt-2 text-sm text-stone-600">
        Discover Azad Kashmir's Neelum Valley: terraced meadows, pine forests and the cliff-hugging village of Arang
        Kel. This route balances scenic drives with a short steep hike to the hill-meadow.
      </p>

      <h3 className="mt-6 text-lg font-semibold">Day 1 — Islamabad → Muzaffarabad → Keran</h3>
      <ul className="mt-2 list-inside list-disc text-sm text-stone-600">
        <li>Early departure via Murree Expressway and Kohala Bridge; stop at Kohala viewpoint.</li>
        <li>Continue to Keran for hotel check-in and briefing with a local guide.</li>
      </ul>

      <h3 className="mt-4 text-lg font-semibold">Day 2 — Keran → Sharda</h3>
      <ul className="mt-2 list-inside list-disc text-sm text-stone-600">
        <li>Drive through Upper Neelum to Sharda; visit ruins and riverfront market.</li>
      </ul>

      <h3 className="mt-4 text-lg font-semibold">Day 3 — Sharda → Kel → Arang Kel</h3>
      <ul className="mt-2 list-inside list-disc text-sm text-stone-600">
        <li>Drive to Kel, cross via cable car/suspension, and hike to Arang Kel (45–90 minutes).</li>
        <li>Enjoy meadow views, photography, and an overnight in Arang Kel or Kel.</li>
      </ul>

      <h3 className="mt-4 text-lg font-semibold">Day 4 — Arang Kel → Kel → Sharda</h3>
      <p className="mt-2 text-sm text-stone-600">Morning at Arang Kel, descend to Kel and return to Sharda for evening leisure.</p>

      <h3 className="mt-4 text-lg font-semibold">Day 5 — Sharda → Muzaffarabad → Islamabad</h3>
      <p className="mt-2 text-sm text-stone-600">Breakfast and return trip to Islamabad with scenic photo stops along Neelum Valley.</p>

      <h3 className="mt-6 text-lg font-semibold">Practical Notes</h3>
      <ul className="mt-2 list-inside list-disc text-sm text-stone-600">
        <li>Permits: check local security advisories and register with authorities where required.</li>
        <li>Transport: 4×4 recommended for last-mile access; local guides advised for border-adjacent areas.</li>
      </ul>
    </>
  );
}

export async function generateStaticParams() {
  return Object.keys(packages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pkg = packages[slug];
  if (!pkg) return {};
  return {
    title: pkg.title,
    description: pkg.description,
    alternates: { canonical: `/honeymoon-packages/${slug}` },
    openGraph: { title: pkg.title, description: pkg.description, url: absoluteUrl(`/honeymoon-packages/${slug}`) },
  };
}

// Render content inline to avoid component complexity during build
const renderContent = (slug: string) => {
  switch (slug) {
    case "swat-kalam-4days":
      return <SwatKalamContent />;
    case "naran-babusar-4days":
      return <NaranBabusarContent />;
    case "kashmir-arangkel-5days":
      return <KashmirArangkelContent />;
    default:
      return null;
  }
};

export default async function PackagePage({ params }: Props) {
  const { slug } = await params;
  const pkg = packages[slug];
  if (!pkg) {
    notFound();
  }

  return (
    <PageShell wide>
      {/* Hero Section */}
      <section className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden">
        <div className="relative min-h-[62vh] md:min-h-[68vh]">
          <Image
            src={pkg.image}
            alt={pkg.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,11,11,0.22)_0%,rgba(11,11,11,0.72)_100%)]" />

          <div className="relative z-10 mx-auto flex min-h-[62vh] max-w-[96rem] flex-col justify-end px-4 pb-12 pt-24 text-white md:min-h-[68vh] md:px-6 lg:px-10 xl:px-14">
            <p className="text-xs uppercase tracking-[0.34em] text-white/75">Honeymoon Package</p>
            <h1 className="mt-3 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
              {pkg.title}
            </h1>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-white/85 sm:text-base">
              {pkg.description}
            </p>
          </div>
        </div>
      </section>

      {/* Two Column Layout */}
      <section className="mt-12 grid gap-8 lg:grid-cols-[minmax(18rem,24rem)_minmax(0,1fr)] xl:gap-12">
        {/* Sidebar */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-[2rem] border border-stone-200 bg-white p-3 shadow-[0_12px_36px_rgba(15,23,42,0.08)]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-stone-100">
              <Image
                src={pkg.image}
                alt={`${pkg.title} poster`}
                fill
                sizes="(max-width: 1024px) 100vw, 24rem"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
            </div>
          </div>

          <div className="mt-5 rounded-[1.5rem] border border-stone-200 bg-white p-5 shadow-sm">
            <p className="text-xs uppercase tracking-[0.32em] text-stone-500">Package Details</p>
            <p className="mt-3 font-serif text-3xl text-stone-900">{pkg.duration}</p>
            <p className="mt-3 text-2xl font-bold text-[#9c7600]">{pkg.price}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {["Romantic pacing", "Private options", "Route support"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[#fcc000]/20 bg-[#fcc000]/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-[#9c7600]"
                >
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/make-my-trip"
                className="inline-flex rounded-full bg-[#0b0b0b] px-5 py-3 text-sm font-semibold !text-white transition hover:bg-black"
              >
                Request This Package
              </Link>
              <Link
                href="/honeymoon-packages"
                className="inline-flex rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-stone-800 transition hover:border-stone-400 hover:text-stone-900"
              >
                Back to Packages
              </Link>
            </div>
          </div>

          {pkg.includes?.length ? (
            <div className="mt-5 rounded-[1.5rem] border border-stone-200 bg-[#fff8df] p-5 shadow-sm">
              <p className="text-xs uppercase tracking-[0.32em] text-stone-500 font-semibold">This Tour Includes</p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-stone-600">
                {pkg.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#fcc000]" />
                    <span className="font-semibold">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </aside>

        {/* Main Content */}
        <div>
          <div className="grid gap-6">
            <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_12px_36px_rgba(15,23,42,0.06)] md:p-8">
              <p className="text-xs uppercase tracking-[0.32em] text-stone-500">Itinerary</p>
              <h2 className="mt-3 font-serif text-3xl text-stone-900">Day Wise Plan For This Route</h2>

              <div className="mt-8">
                <details className="rounded-[1.75rem] border border-stone-200 bg-stone-50 p-5 shadow-sm" open>
                  <summary className="cursor-pointer text-lg font-semibold text-stone-900">Tour Details</summary>
                  <div className="prose max-w-none mt-5 text-stone-700">
                    {renderContent(slug)}
                  </div>
                </details>
              </div>
            </div>

            {/* Pricing and Details Section */}
            {(pkg.includes?.length || pkg.childPolicy?.length || pkg.mealsMenu) && (
              <div className="rounded-[2rem] border border-[#fcc000] bg-[#fff8df] p-6 shadow-sm md:p-8">
                <p className="text-xs uppercase tracking-[0.32em] text-stone-500">Package Details</p>
                <h2 className="mt-3 font-serif text-3xl text-stone-900">What's Included & Important Info</h2>

                {pkg.childPolicy?.length ? (
                  <div className="mt-6 rounded-[1.5rem] border border-dashed border-stone-300 bg-white p-5">
                    <p className="text-sm font-semibold text-stone-900">Child Policy</p>
                    <ul className="mt-4 space-y-2 text-sm text-stone-600">
                      {pkg.childPolicy.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="mt-1 h-2 w-2 rounded-full bg-[#0b0b0b]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {pkg.mealsMenu ? (
                  <div className="mt-6 rounded-[1.5rem] border border-stone-300 bg-white p-5">
                    <p className="text-sm font-semibold text-stone-900">Meals Menu</p>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <div>
                        <p className="text-xs uppercase tracking-[0.24em] text-stone-500 font-semibold">Breakfast</p>
                        <p className="mt-2 text-sm text-stone-600">{pkg.mealsMenu.breakfast}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.24em] text-stone-500 font-semibold">Dinner</p>
                        <p className="mt-2 text-sm text-stone-600">{pkg.mealsMenu.dinner}</p>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            )}

            {/* Detail Sections */}
            <div className="mt-8 space-y-4">
              {pkg.includes?.length ? (
                <details className="rounded-[1.75rem] border border-stone-200 bg-white p-5 shadow-sm">
                  <summary className="cursor-pointer text-lg font-semibold text-stone-900">Service Included</summary>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-stone-600">
                    {pkg.includes.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#fcc000]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </details>
              ) : null}

              {pkg.excluded?.length ? (
                <details className="rounded-[1.75rem] border border-stone-200 bg-white p-5 shadow-sm">
                  <summary className="cursor-pointer text-lg font-semibold text-stone-900">Service Not Included</summary>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-stone-600">
                    {pkg.excluded.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#fcc000]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </details>
              ) : null}

              {pkg.bookingPolicy?.length ? (
                <details className="rounded-[1.75rem] border border-stone-200 bg-white p-5 shadow-sm">
                  <summary className="cursor-pointer text-lg font-semibold text-stone-900">Booking Procedure</summary>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-stone-600">
                    {pkg.bookingPolicy.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#fcc000]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </details>
              ) : null}

              {pkg.detailSections?.length ? (
                <>
                  {pkg.detailSections.map((section) => (
                    <details
                      key={section.title}
                      className="rounded-[1.75rem] border border-stone-200 bg-white p-5 shadow-sm"
                    >
                      <summary className="cursor-pointer text-lg font-semibold text-stone-900">
                        {section.title}
                      </summary>
                      <div className="mt-4 space-y-3 text-sm leading-7 text-stone-600">
                        {section.content.map((item) => (
                          <p key={item}>{item}</p>
                        ))}
                      </div>
                    </details>
                  ))}
                </>
              ) : null}
            </div>

            <div className="mt-8 rounded-[2rem] border border-[#fcc000] bg-[#fff8df] p-6 shadow-sm md:p-8">
              <p className="text-xs uppercase tracking-[0.32em] text-stone-500">Need changes?</p>
              <h2 className="mt-3 font-serif text-3xl text-stone-900">We can tailor this package for your dates and preferences.</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-stone-700">
                Open the trip builder and we will adjust hotels, transport, meals, and pacing to match your preferred budget and travel dates.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
