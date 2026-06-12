import type { Metadata } from "next";
import Image from "next/image";

import { PageHeroImage } from "@/components/page-hero-image";
import { PageShell } from "@/components/page-shell";
import { absoluteUrl } from "@/lib/site";
import { hotels } from "@/lib/data/hotels";

const fallbackImage = "/images/editorial/editorial-3.jpg";

const hotelCities = Array.from(new Set(hotels.map((hotel) => hotel.city))).sort();

export const metadata: Metadata = {
  title: "Hotel Gallery",
  description: "Browse Hodophile's hotel gallery organized by city, hotel, and room type.",
  alternates: {
    canonical: "/hotels",
  },
  openGraph: {
    title: "Hotel Gallery",
    description: "Browse Hodophile's hotel gallery organized by city, hotel, and room type.",
    url: absoluteUrl("/hotels"),
  },
};

function formatPrice(room: { price?: number; low?: number | number[]; high?: number | number[] }) {
  if (room.price) {
    return `PKR ${room.price.toLocaleString()}`;
  }
  if (typeof room.low === "number" && typeof room.high === "number") {
    return `PKR ${room.low.toLocaleString()} – ${room.high.toLocaleString()}`;
  }
  return null;
}

export default function HotelsGalleryPage() {
  return (
    <PageShell wide>
      <PageHeroImage
        image="/images/editorial/editorial-2.jpg"
        imageAlt="Hotel room gallery"
        eyebrow="Hotel Gallery"
        title="Hotel room galleries by city, hotel, and room type."
        description="Explore hotel room options across our Pakistan hotel portfolio. Each card shows the room category, price details, and a photo when available."
      />

      <section className="mt-12 space-y-20">
        {hotelCities.map((city) => (
          <section key={city} className="space-y-8">
            <div className="flex items-center justify-between gap-4 border-b border-stone-200 pb-4">
              <div>
                <span className="text-sm font-semibold uppercase tracking-[0.3em] text-[#fcc000]/90">{city}</span>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-stone-900">{city} hotels</h2>
              </div>
              <span className="rounded-full border border-stone-300 bg-stone-100 px-3 py-1 text-sm font-medium text-stone-700">
                {hotels.filter((hotel) => hotel.city === city).length} hotels
              </span>
            </div>

            <div className="grid gap-8">
              {hotels
                .filter((hotel) => hotel.city === city)
                .map((hotel) => {
                  const hotelImage = hotel.image || hotel.rooms.find((room) => room.image)?.image || fallbackImage;

                  return (
                    <article key={hotel.id} className="overflow-hidden rounded-[2rem] border border-black/10 bg-white/80 shadow-sm">
                      <div className="grid gap-6 p-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,2fr)] lg:items-start">
                        <div className="space-y-4">
                          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-stone-100">
                            <Image
                              src={hotelImage}
                              alt={hotel.name}
                              fill
                              sizes="(max-width: 1024px) 100vw, 500px"
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#fcc000]/85">{hotel.city}</p>
                            <h3 className="text-2xl font-semibold text-stone-900">{hotel.name}</h3>
                            {hotel.seasons ? (
                              <p className="max-w-2xl text-sm leading-7 text-stone-600">
                                {Object.entries(hotel.seasons)
                                  .map(([season, range]) => `${season} ${range}`)
                                  .join(" · ")}
                              </p>
                            ) : null}
                          </div>
                        </div>

                        <div className="space-y-5">
                          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-stone-600">Rooms</p>
                          <div className="grid gap-4 sm:grid-cols-2">
                            {hotel.rooms.map((room) => {
                              const roomImage = room.image || hotelImage;
                              const priceLabel = formatPrice(room);

                              return (
                                <div key={room.name} className="overflow-hidden rounded-[1.75rem] border border-stone-200 bg-stone-50 shadow-sm transition-shadow duration-200 hover:shadow-lg">
                                  <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                                    <Image
                                      src={roomImage}
                                      alt={`${room.name} at ${hotel.name}`}
                                      fill
                                      sizes="(max-width: 768px) 100vw, 300px"
                                      className="object-cover"
                                      unoptimized
                                    />
                                  </div>
                                  <div className="p-4">
                                    <h4 className="text-base font-semibold text-stone-900">{room.name}</h4>
                                    {priceLabel ? (
                                      <p className="mt-2 text-sm text-stone-600">{priceLabel}</p>
                                    ) : (
                                      <p className="mt-2 text-sm text-stone-600">Price on request</p>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
            </div>
          </section>
        ))}
      </section>
    </PageShell>
  );
}
