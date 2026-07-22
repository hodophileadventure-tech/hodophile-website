import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageShell } from "@/components/page-shell";
import { TourLanding } from "@/components/tour-landing";
import { absoluteUrl } from "@/lib/site";

type Props = { params: { slug: string } };

const packages: Record<
  string,
  { title: string; duration: string; image: string; description: string; price?: string }
> = {
  "swat-kalam-4days": {
    title: "Swat & Kalam — 4 Days",
    duration: "4 Days / 3 Nights",
    image: "/images/honeymoon/swat-kalam.jpg",
    description: "Experience Swat Valley and Kalam with Mahodand Lake and Ushu Forest excursions.",
    price: "PKR 120,000",
  },

  "naran-babusar-4days": {
    title: "Naran & Babusar — 4 Days",
    duration: "4 Days / 3 Nights",
    image: "/images/honeymoon/naran-babusar.jpg",
    description: "A romantic route through Kaghan Valley with Saif-ul-Malook and Babusar Top highlights.",
    price: "PKR 120,000",
  },

  "kashmir-arangkel-5days": {
    title: "Kashmir Arang Kel — 5 Days",
    duration: "5 Days / 4 Nights",
    image: "/images/honeymoon/kashmir-arangkel.jpg",
    description: "Neelum Valley journey to Kel and Arang Kel with hill-meadow stays and riverside views.",
    price: "PKR 150,000",
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
  const pkg = packages[params.slug];
  if (!pkg) return {};
  return {
    title: pkg.title,
    description: pkg.description,
    alternates: { canonical: `/honeymoon-packages/${params.slug}` },
    openGraph: { title: pkg.title, description: pkg.description, url: absoluteUrl(`/honeymoon-packages/${params.slug}`) },
  };
}

function getContent(slug: string) {
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
}

export default function PackagePage({ params }: Props) {
  const pkg = packages[params.slug];
  if (!pkg) notFound();

  return (
    <PageShell wide>
      <TourLanding
        eyebrow="Honeymoon Package"
        title={pkg.title}
        description={pkg.description}
        image={pkg.image}
        highlights={["Romantic pacing", "Private options", "Route support"]}
        ctaHref="/make-my-trip"
        ctaLabel="Request This Package"
      />

      <div className="mt-6 flex items-center gap-4">
        <p className="rounded-full bg-[#fff8df] px-4 py-2 text-sm font-semibold text-[#8d6500]">Starting from {pkg.price}</p>
        <p className="text-sm text-stone-500">{pkg.duration}</p>
      </div>

      <article className="mt-8 rounded-[1.5rem] border border-stone-200 bg-white p-8">
        <div className="prose max-w-none mt-4 text-stone-700">{getContent(params.slug)}</div>
      </article>
    </PageShell>
  );
}
