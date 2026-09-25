"use client";

import { useState } from "react";

import { trackEvent } from "@/lib/analytics";
import { whatsappUrl } from "@/lib/site";

export function HomeQuickLeadForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    tripType: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof formData, string>>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const nextErrors: Partial<Record<keyof typeof formData, string>> = {};

    if (!formData.name.trim()) nextErrors.name = "Name is required";
    if (!formData.email.trim()) nextErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) nextErrors.email = "Enter a valid email";
    if (!formData.whatsapp.trim()) nextErrors.whatsapp = "WhatsApp number is required";
    else if (!/^\d{10,}$/.test(formData.whatsapp.replace(/\D/g, ""))) nextErrors.whatsapp = "Enter a valid number";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    setIsLoading(true);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          whatsapp: formData.whatsapp,
          timestamp: new Date().toISOString(),
          tripType: formData.tripType,
          source: "home-quick-quote",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Please try again.");
      }

      setIsSuccess(true);
      trackEvent("lead_submit", { form: "home_quick_quote", trip_type: formData.tripType || "unspecified" });
      setFormData({ name: "", email: "", whatsapp: "", tripType: "" });
      setErrors({});
    } catch (error) {
      const message = error instanceof Error ? error.message : "Please try again.";
      setErrors((current) => ({ ...current, whatsapp: message }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative mt-24 w-full overflow-hidden border-y border-stone-300/70 bg-[#111111] text-white">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="bg-[radial-gradient(circle_at_top_left,_rgba(252,192,0,0.18),transparent_35%)] p-6 sm:p-8 lg:p-12">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#fcc000]">Quick quote</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">Get a custom Pakistan itinerary in minutes.</h2>
            <p className="mt-4 text-sm leading-7 text-white/70">
              Tell us your route and travel style and we will suggest the right package, budget, and departure plan.
            </p>
            <div className="mt-6 space-y-3 text-sm text-white/75">
              <div className="flex items-center gap-3"><span className="inline-block h-2.5 w-2.5 rounded-full bg-[#fcc000]" />Fast expert reply</div>
              <div className="flex items-center gap-3"><span className="inline-block h-2.5 w-2.5 rounded-full bg-[#fcc000]" />Transparent pricing</div>
              <div className="flex items-center gap-3"><span className="inline-block h-2.5 w-2.5 rounded-full bg-[#fcc000]" />Tailored for families, couples, or adventure travelers</div>
            </div>
            <a
              href={whatsappUrl("Hi Hodophile, I want a custom Pakistan tour plan and fast availability details.")}
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              WhatsApp travel expert
            </a>
          </div>

          <div className="border-t border-white/10 bg-[#f7f3ea] p-6 text-stone-900 sm:p-8 lg:border-l lg:border-t-0 lg:p-12">
            {isSuccess ? (
              <div className="flex h-full flex-col justify-center border-y border-[#d8d2c7] bg-white p-6 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#dff7e7] text-2xl text-[#1a7f4f]">✓</div>
                <h3 className="mt-4 text-2xl font-semibold text-stone-900">Thanks, we&apos;ll be in touch.</h3>
                <p className="mt-3 text-sm leading-7 text-stone-600">
                  Your trip interest has been captured. A Hodophile team member will reach out with the best-fit route and pricing.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm font-medium text-stone-700">
                    Full name
                    <input
                      value={formData.name}
                      onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))}
                      className="mt-2 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-[#fcc000] focus:ring-2 focus:ring-[#fcc000]/20"
                      placeholder="Your name"
                    />
                    {errors.name ? <span className="mt-1 block text-xs text-red-600">{errors.name}</span> : null}
                  </label>

                  <label className="block text-sm font-medium text-stone-700">
                    Email
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))}
                      className="mt-2 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-[#fcc000] focus:ring-2 focus:ring-[#fcc000]/20"
                      placeholder="your@email.com"
                    />
                    {errors.email ? <span className="mt-1 block text-xs text-red-600">{errors.email}</span> : null}
                  </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm font-medium text-stone-700">
                    WhatsApp number
                    <input
                      value={formData.whatsapp}
                      onChange={(event) => setFormData((current) => ({ ...current, whatsapp: event.target.value }))}
                      className="mt-2 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-[#fcc000] focus:ring-2 focus:ring-[#fcc000]/20"
                      placeholder="+92 300 0000000"
                    />
                    {errors.whatsapp ? <span className="mt-1 block text-xs text-red-600">{errors.whatsapp}</span> : null}
                  </label>

                  <label className="block text-sm font-medium text-stone-700">
                    Trip type
                    <select
                      value={formData.tripType}
                      onChange={(event) => setFormData((current) => ({ ...current, tripType: event.target.value }))}
                      className="mt-2 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-[#fcc000] focus:ring-2 focus:ring-[#fcc000]/20"
                    >
                      <option value="">Select a trip</option>
                      <option value="Family holiday">Family holiday</option>
                      <option value="Couple getaway">Couple getaway</option>
                      <option value="Adventure trip">Adventure trip</option>
                      <option value="Custom itinerary">Custom itinerary</option>
                    </select>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex w-full items-center justify-center rounded-full bg-[#fcc000] px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-black transition hover:bg-[#ffd454] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isLoading ? "Submitting..." : "Get my itinerary"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
