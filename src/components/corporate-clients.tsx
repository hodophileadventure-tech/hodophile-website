import Image from "next/image";

const corporateClients = [
  {
    name: "Hamdard University",
    logo: "/images/package-cards/images__clients__humdard-university.webp",
  },
  {
    name: "Iqra University",
    logo: "/images/package-cards/images__clients__iqra-university.webp",
  },
  {
    name: "Baqai Medical University",
    logo: "/images/package-cards/images__clients__baqai.webp",
  },
  {
    name: "HBL DHA Phase 4 Branch",
    logo: "/images/package-cards/images__clients__hbl.webp",
  },
  {
    name: "SMC Flavours and Fragrances",
    logo: "/images/package-cards/images__clients__smc.webp",
  },
  {
    name: "Highland Agri Solutions (Hydrabad)",
    logo: "/images/package-cards/images__clients__highland-agri.webp",
  },
  {
    name: "Ask Shipping and Logistics Karachi",
    logo: "/images/package-cards/images__clients__ask-shipping.webp",
  },
  {
    name: "GET LISENCED Software House Karachi",
    logo: "/images/package-cards/images__clients__get-lisenced.webp",
  },
  {
    name: "Tapal Tea (Pvt.) Ltd",
    logo: "/images/package-cards/images__clients__tapal.webp",
  },
];

export function CorporateClients() {
  return (
    <section className="bg-[#f7f6f2] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="text-stone-900">Our Corporate</span>{" "}
            <span className="text-[#fcc000]">Clients</span>
          </h2>
          <div className="h-1 w-24 bg-[#fcc000] mx-auto"></div>
        </div>

        <div className="overflow-x-auto -mx-4 px-4">
          <div className="flex gap-6 md:gap-8 items-stretch py-4">
            {corporateClients.map((client, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-56 md:w-64 flex flex-col items-center justify-center gap-4 rounded-lg border-4 border-[#fcc000] bg-white p-6 shadow-md transition hover:shadow-lg hover:scale-105"
              >
                <div className="h-32 w-32 flex items-center justify-center">
                  <Image
                    src={client.logo}
                    alt={client.name}
                    width={128}
                    height={128}
                    className="h-full w-full object-contain"
                  />
                </div>
                <p className="text-center text-sm md:text-base font-semibold text-stone-900">
                  {client.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
