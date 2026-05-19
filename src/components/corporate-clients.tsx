import Image from "next/image";

const corporateClients = [
  {
    name: "Hamdard University",
    logo: "/images/clients/humdard-university.png",
  },
  {
    name: "Iqra University",
    logo: "/images/clients/iqra-university.png",
  },
  {
    name: "Baqai Medical University",
    logo: "/images/clients/baqai.png",
  },
  {
    name: "HBL DHA Phase 4 Branch",
    logo: "/images/clients/hbl.png",
  },
  {
    name: "SMC Flavours and Fragrances",
    logo: "/images/clients/smc.png",
  },
  {
    name: "Highland Agri Solutions (Hydrabad)",
    logo: "/images/clients/highland-agri.png",
  },
  {
    name: "Ask Shipping and Logistics Karachi",
    logo: "/images/clients/ask-shipping.png",
  },
  {
    name: "GET LISENCED Software House Karachi",
    logo: "/images/clients/get-lisenced.png",
  },
  {
    name: "Tapal Tea (Pvt.) Ltd",
    logo: "/images/clients/tapal.png",
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {corporateClients.map((client, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center gap-4 rounded-lg border-4 border-[#fcc000] bg-white p-6 shadow-md transition hover:shadow-lg hover:scale-105"
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
    </section>
  );
}
