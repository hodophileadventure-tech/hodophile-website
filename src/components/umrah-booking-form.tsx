"use client";

import React, { useState } from "react";

const hotelDistances = [100, 300, 500, 700, 900, 1100, 1400, 1600];

const starCategories = ["Economy", "2 Star", "3 Star", "4 Star", "5 Star"];

const transportOptions = [
  { name: "jeddahToMakkah", label: "Jeddah airport → Makkah", choices: ["Private"] },
  { name: "makkahToMedina", label: "Makkah → Medina", choices: ["Private", "Sharing"] },
  { name: "medinaToMakkah", label: "Medina → Makkah", choices: ["Private", "Sharing"] },
  { name: "makkahToJeddah", label: "Makkah → Jeddah airport", choices: ["Private"] },
  { name: "medinaAirportToHotel", label: "Medina Airport → Medina hotel", choices: ["Private"] },
  { name: "medinaToMakkah_flow", label: "Medina → Makkah", choices: ["Private", "Sharing"] },
  { name: "makkahToMedina_flow", label: "Makkah → Medina", choices: ["Private", "Sharing"] },
  { name: "medinaHotelToAirport", label: "Medina hotel → Medina airport", choices: ["Private"] },
];

const directAirlines = [
  "Air Blue",
  "Saudia Airlines",
  "Fly Jinnah",
  "PIA",
  "Air Sial",
  "Fly Nas",
  "Fly A Deal",
];

const indirectAirlines = [
  "Emirates",
  "Qatar Airways",
  "Salam Airways",
  "Fly Dubai",
  "Air Arabia",
  "Etihad Airways",
  "Oman Airways",
];

/* Selective route removed per spec - replaced by Ziyarat selectors */

export function UmrahBookingForm() {
  const initialTransportSelections = transportOptions.reduce((acc, option) => {
    acc[option.name] = option.choices[0].toLowerCase();
    return acc;
  }, {} as Record<string, string>);

  const [selectedStar, setSelectedStar] = useState<string>("4 Star");
  const [selectedAirline, setSelectedAirline] = useState<string>(directAirlines[0]);
  const [airlineType, setAirlineType] = useState<"direct" | "indirect">("direct");
  const [transportFlow, setTransportFlow] = useState<"flowA" | "flowB">("flowA");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);
  const [infants, setInfants] = useState<number>(0);
  const [makkahZiyarat, setMakkahZiyarat] = useState<"private" | "sharing">("private");
  const [medinaZiyarat, setMedinaZiyarat] = useState<"private" | "sharing">("private");
  const [makkahHotelDistance, setMakkahHotelDistance] = useState<number>(100);
  const [medinaHotelDistance, setMedinaHotelDistance] = useState<number>(100);
  const [transportSelections, setTransportSelections] = useState<Record<string, string>>(initialTransportSelections);
  const [message, setMessage] = useState<string>("");
  const [submissionStatus, setSubmissionStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [k: string]: string }>({});

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmissionStatus(null);

    const nextErrors: { [k: string]: string } = {};
    if (!name.trim()) nextErrors.name = "Please enter a name";
    if (!phone.trim()) nextErrors.phone = "Please enter a contact number";
    if (!startDate) nextErrors.startDate = "Please choose a start date";
    if (!endDate) nextErrors.endDate = "Please choose an end date";
    if (startDate && endDate) {
      const s = new Date(startDate);
      const e = new Date(endDate);
      if (e < s) nextErrors.endDate = "End date must be the same or after start date";
    }
    if (!adults || adults < 1) nextErrors.adults = "At least one adult is required";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const payload = {
      name,
      phone,
      startDate,
      endDate,
      adults,
      children,
      infants,
      makkahZiyarat,
      medinaZiyarat,
      makkahHotelDistance,
      medinaHotelDistance,
      hotelCategory: selectedStar,
      airlineType,
      selectedAirline,
      transportFlow,
      transportSelections,
      message,
      source: "miqat-booking",
    };

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/miqat-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result?.error || `Booking request failed with status ${response.status}`);
      }

      setSubmissionStatus({
        type: "success",
        message: "Your MIQAT booking request has been submitted. Our team will follow up shortly.",
      });
      setName("");
      setPhone("");
      setStartDate("");
      setEndDate("");
      setAdults(1);
      setChildren(0);
      setInfants(0);
      setMakkahZiyarat("private");
      setMedinaZiyarat("private");
      setMakkahHotelDistance(100);
      setMedinaHotelDistance(100);
      setSelectedStar("4 Star");
      setAirlineType("direct");
      setSelectedAirline(directAirlines[0]);
      setTransportFlow("flowA");
      setTransportSelections(initialTransportSelections);
      setMessage("");
      setErrors({});
    } catch (error) {
      setSubmissionStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Failed to submit MIQAT booking request.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  // routeLabel and routeChoices were removed per spec; no memoization needed

  return (
    <section className="mt-12 rounded-[2rem] bg-gradient-to-br from-[#05110a] to-[#07120b] p-8 lg:p-12 ring-1 ring-[#0b2d14]/10">
      <div className="grid gap-6 lg:grid-cols-[1fr_420px] lg:items-start">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-widest text-[#FCC000]">MIQAT Package Inquiry</p>
          <h1 className="font-[var(--font-miqat-heading)] text-4xl leading-tight text-white sm:text-5xl">
            Submit your Umrah package preferences
          </h1>
          <p className="max-w-2xl text-sm leading-7 text-stone-300">
            Share your travel dates, hotel preferences, and transfer choices — our team will prepare a tailored MIQAT package proposal.
          </p>
        </div>

        <aside className="rounded-[1.25rem] border border-white/5 bg-white/3 p-6 shadow-lg">
          <p className="text-sm uppercase tracking-[0.18em] text-[#FCC000]">Need help?</p>
          <p className="mt-3 text-sm leading-6 text-stone-200">
            Send your details and our team will follow up with a tailored package proposal for Umrah travel, hotel distances and transfers.
          </p>
          <div className="mt-4 flex gap-3">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#FCC000] px-4 py-2 text-sm font-semibold text-black shadow-sm"
            >
              Contact Us
            </a>
            <a href="#" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white/80">
              Live Chat
            </a>
          </div>
        </aside>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 grid gap-6">
        <div className="grid gap-4 lg:grid-cols-2">
          <label className="grid gap-2 text-sm text-stone-100">
            Client Name
              <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`h-12 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-white outline-none placeholder:text-stone-500 focus:border-[#FCC000]/50 focus:ring-2 focus:ring-[#FCC000]/15 transition-shadow ${
                errors.name ? "ring-2 ring-red-400" : ""
              }`}
              placeholder="Full name"
            />
            {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}
          </label>
          <label className="grid gap-2 text-sm text-stone-100">
            Number
              <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`h-12 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-white outline-none placeholder:text-stone-500 focus:border-[#FCC000]/50 focus:ring-2 focus:ring-[#FCC000]/15 transition-shadow ${
                errors.phone ? "ring-2 ring-red-400" : ""
              }`}
              placeholder="+92 3XX XXX XXXX"
            />
            {errors.phone && <p className="text-red-400 text-sm">{errors.phone}</p>}
          </label>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <label className="grid gap-2 text-sm text-stone-100">
            Travel dates
            <div className="flex w-full gap-2">
              <div className="flex-1 grid gap-1">
                <span className="text-xs text-stone-300">Start date</span>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="h-12 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-white outline-none placeholder:text-stone-500 focus:border-[#FCC000]/50 focus:ring-2 focus:ring-[#FCC000]/15"
                  aria-label="Start date"
                />
              </div>
              <div className="flex-1 grid gap-1">
                <span className="text-xs text-stone-300">End date</span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="h-12 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-white outline-none placeholder:text-stone-500 focus:border-[#FCC000]/50 focus:ring-2 focus:ring-[#FCC000]/15"
                  aria-label="End date"
                />
              </div>
            </div>
            {(errors.startDate || errors.endDate) && (
              <p className="text-red-400 text-sm">{errors.startDate ?? errors.endDate}</p>
            )}
          </label>
          <label className="grid gap-2 text-sm text-stone-100">
            Adults
            <input
              type="number"
              min="1"
              value={adults}
              onChange={(e) => setAdults(parseInt(e.target.value || "0", 10))}
              className={`h-12 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-white outline-none placeholder:text-stone-500 focus:border-[#FCC000]/50 focus:ring-2 focus:ring-[#FCC000]/15 ${
                errors.adults ? "ring-2 ring-red-400" : ""
              }`}
              placeholder="2"
            />
            {errors.adults && <p className="text-red-400 text-sm">{errors.adults}</p>}
          </label>
          <label className="grid gap-2 text-sm text-stone-100">
            Children
            <input
              type="number"
              min="0"
              value={children}
              onChange={(e) => setChildren(parseInt(e.target.value || "0", 10))}
              className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-stone-500 focus:border-[#FCC000]/50 focus:ring-2 focus:ring-[#FCC000]/15"
              placeholder="1"
            />
          </label>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <label className="grid gap-2 text-sm text-stone-100">
            Infants
            <input
              type="number"
              min="0"
              value={infants}
              onChange={(e) => setInfants(parseInt(e.target.value || "0", 10))}
              className="h-12 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-white outline-none placeholder:text-stone-500 focus:border-[#FCC000]/50 focus:ring-2 focus:ring-[#FCC000]/15"
              placeholder="0"
            />
          </label>
          <div className="grid gap-4 lg:grid-cols-2">
            <fieldset className="rounded-3xl border border-white/10 bg-white/5 p-4 text-stone-100">
              <legend className="mb-3 px-1 text-sm font-semibold uppercase tracking-[0.28em] text-[#FCC000]">
                Ziyarat
              </legend>
              <div className="grid gap-3">
                <label className="grid gap-2 text-sm text-stone-100">
                  Makkah ziyarat
                  <select
                    value={makkahZiyarat}
                    onChange={(e) => setMakkahZiyarat(e.target.value as "private" | "sharing")}
                    className="w-full rounded-2xl border border-white/10 bg-[#09110d] px-4 py-2 text-white outline-none focus:border-[#FCC000]/50 focus:ring-2 focus:ring-[#FCC000]/15"
                  >
                    <option value="private" className="bg-[#09110d] text-white">
                      Private
                    </option>
                    <option value="sharing" className="bg-[#09110d] text-white">
                      Sharing
                    </option>
                  </select>
                </label>

                <label className="grid gap-2 text-sm text-stone-100">
                  Medina ziyarat
                  <select
                    value={medinaZiyarat}
                    onChange={(e) => setMedinaZiyarat(e.target.value as "private" | "sharing")}
                    className="rounded-3xl border border-white/10 bg-[#09110d] px-4 py-3 text-white outline-none focus:border-[#FCC000]/50 focus:ring-2 focus:ring-[#FCC000]/15"
                  >
                    <option value="private" className="bg-[#09110d] text-white">
                      Private
                    </option>
                    <option value="sharing" className="bg-[#09110d] text-white">
                      Sharing
                    </option>
                  </select>
                </label>
              </div>
            </fieldset>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <label className="grid gap-2 text-sm text-stone-100">
            Makkah hotel distance
            <select
              value={makkahHotelDistance}
              onChange={(e) => setMakkahHotelDistance(parseInt(e.target.value, 10))}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-white outline-none focus:border-[#FCC000]/50 focus:ring-2 focus:ring-[#FCC000]/15"
            >
              {hotelDistances.map((d) => (
                <option key={`makkah-${d}`} value={d} className="bg-[#09110d] text-white">
                  {d > 900 ? `${d} meter - Shuttle service` : `${d} meter`}
                </option>
              ))}
            </select>
          </label>

              <label className="grid gap-2 text-sm text-stone-100">
                Medina hotel distance
                <select
                  value={medinaHotelDistance}
                  onChange={(e) => setMedinaHotelDistance(parseInt(e.target.value, 10))}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-white outline-none focus:border-[#FCC000]/50 focus:ring-2 focus:ring-[#FCC000]/15"
                >
                  {hotelDistances.map((d) => (
                    <option key={`medina-${d}`} value={d} className="bg-[#09110d] text-white">
                      {d > 900 ? `${d} meter - Shuttle service` : `${d} meter`}
                    </option>
                  ))}
                </select>
              </label>

          <label className="grid gap-2 text-sm text-stone-100">
            Hotel star category
            <select
              value={selectedStar}
              onChange={(event) => setSelectedStar(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-white outline-none focus:border-[#FCC000]/50 focus:ring-2 focus:ring-[#FCC000]/15"
            >
              {starCategories.map((star) => (
                <option key={star} value={star} className="bg-[#09110d] text-white">
                  {star}
                </option>
              ))}
            </select>
          </label>
        </div>


        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5">
          <h2 className="text-lg font-semibold text-white">Transportation options</h2>
          <p className="mt-2 text-sm leading-7 text-stone-400">
            Choose private or shared transfers for each route segment.
          </p>
          <div className="mt-5 grid gap-4">
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setTransportFlow("flowA")}
                className={`rounded-3xl px-4 py-2 text-sm transition ${
                  transportFlow === "flowA" ? "bg-[#FCC000] text-black" : "bg-white/5 text-stone-200"
                }`}
              >
                Jeddah → Makkah flow
              </button>
              <button
                type="button"
                onClick={() => setTransportFlow("flowB")}
                className={`rounded-3xl px-4 py-2 text-sm transition ${
                  transportFlow === "flowB" ? "bg-[#FCC000] text-black" : "bg-white/5 text-stone-200"
                }`}
              >
                Medina-focused flow
              </button>
            </div>

            {transportFlow === "flowA" && (
              <div className="mt-3 grid gap-4">
                {[
                  "jeddahToMakkah",
                  "makkahToMedina",
                  "medinaToMakkah",
                  "makkahToJeddah",
                ].map((name) => {
                  const route = transportOptions.find((r) => r.name === name)!;
                  return (
                    <label key={route.name} className="grid gap-2 text-sm text-stone-100">
                      {route.label}
                      <select
                        value={transportSelections[route.name]}
                        onChange={(e) =>
                          setTransportSelections((prev) => ({
                            ...prev,
                            [route.name]: e.target.value,
                          }))
                        }
                        className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-[#FCC000]/50 focus:ring-2 focus:ring-[#FCC000]/15"
                      >
                        {route.choices.map((choice) => (
                          <option key={choice} value={choice.toLowerCase()} className="bg-[#09110d] text-white">
                            {choice}
                          </option>
                        ))}
                      </select>
                    </label>
                  );
                })}
              </div>
            )}

            {transportFlow === "flowB" && (
              <div className="mt-3 grid gap-4">
                {[
                  "medinaAirportToHotel",
                  "medinaToMakkah_flow",
                  "makkahToMedina_flow",
                  "medinaHotelToAirport",
                ].map((name) => {
                  const route = transportOptions.find((r) => r.name === name)!;
                  return (
                    <label key={route.name} className="grid gap-2 text-sm text-stone-100">
                      {route.label}
                      <select
                        value={transportSelections[route.name]}
                        onChange={(e) =>
                          setTransportSelections((prev) => ({
                            ...prev,
                            [route.name]: e.target.value,
                          }))
                        }
                        className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-[#FCC000]/50 focus:ring-2 focus:ring-[#FCC000]/15"
                      >
                        {route.choices.map((choice) => (
                          <option key={choice} value={choice.toLowerCase()} className="bg-[#09110d] text-white">
                            {choice}
                          </option>
                        ))}
                      </select>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">Airline selection</h2>
              <p className="mt-2 text-sm leading-7 text-stone-400">
                Pick a direct or indirect airline for your flights.
              </p>
            </div>
            <div className="grid w-full grid-cols-2 gap-3 rounded-3xl border border-[#FCC000]/15 bg-[#09110d] p-3 text-sm text-white lg:w-auto">
              <button
                type="button"
                onClick={() => {
                  setAirlineType("direct");
                  setSelectedAirline(directAirlines[0]);
                }}
                className={`rounded-3xl px-4 py-2 transition ${
                  airlineType === "direct"
                    ? "bg-[#FCC000] text-black shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
                    : "bg-white/5 text-stone-200 hover:bg-white/10"
                }`}
              >
                Direct
              </button>
              <button
                type="button"
                onClick={() => {
                  setAirlineType("indirect");
                  setSelectedAirline(indirectAirlines[0]);
                }}
                className={`rounded-3xl px-4 py-2 transition ${
                  airlineType === "indirect"
                    ? "bg-[#FCC000] text-black shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
                    : "bg-white/5 text-stone-200 hover:bg-white/10"
                }`}
              >
                Indirect
              </button>
            </div>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            <label className="grid gap-2 text-sm text-stone-100">
              {airlineType === "direct" ? "Direct airline" : "Indirect airline"}
              <select
                value={selectedAirline}
                onChange={(event) => setSelectedAirline(event.target.value)}
                className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-[#FCC000]/50 focus:ring-2 focus:ring-[#FCC000]/15"
              >
                {(airlineType === "direct" ? directAirlines : indirectAirlines).map((airline) => (
                  <option key={airline} value={airline} className="bg-[#09110d] text-white">
                    {airline}
                  </option>
                ))}
              </select>
            </label>
            <div className="rounded-3xl border border-[#FCC000]/25 bg-[#020b08] p-4 text-sm text-stone-300">
              <p className="text-white">Selected airline</p>
              <p className="mt-2 font-semibold text-white">{selectedAirline}</p>
            </div>
          </div>
        </div>

        {submissionStatus && (
          <div
            className={`rounded-3xl p-4 text-sm ${
              submissionStatus.type === "success"
                ? "bg-emerald-500/10 text-emerald-200"
                : "bg-red-500/10 text-red-200"
            }`}
          >
            {submissionStatus.message}
          </div>
        )}

        <label className="grid gap-2 text-sm text-stone-100 lg:col-span-1">
          Message for the team
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[10rem] rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-stone-500 focus:border-[#FCC000]/50 focus:ring-2 focus:ring-[#FCC000]/15"
            placeholder="Write any special request: Makkah hotel names, Medina hotel names, transport (sharing/private), ziyarat (pvt/sharing)"
          />
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center rounded-full bg-[#FCC000] px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:-translate-y-0.5 hover:bg-[#f8d741] disabled:cursor-not-allowed disabled:bg-[#e0c354] sm:w-auto"
        >
          {isSubmitting ? "Submitting request..." : "Submit booking request"}
        </button>
      </form>
    </section>
  );
}
