"use client";

import { useState } from "react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      setStatus("error");
      setErrorMessage("Please fill in all fields");
      return;
    }

    setLoading(true);
    setStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", phone: "", email: "", message: "" });
        // Reset message after 5 seconds
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        throw new Error(result.error || result.details || "Failed to submit form");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2rem] border border-black/10 bg-white/80 p-6 backdrop-blur"
      noValidate
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label htmlFor="contact-name" className="grid gap-2 text-sm font-medium text-stone-700">
          Name
          <input
            id="contact-name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            required
            aria-required="true"
            aria-invalid={status === "error" && !formData.name}
            className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-stone-900 outline-none ring-0 placeholder:text-stone-500 focus:border-[#fcc000] focus-visible:ring-4 focus-visible:ring-[#fcc000]/20"
          />
        </label>
        <label htmlFor="contact-phone" className="grid gap-2 text-sm font-medium text-stone-700">
          Phone
          <input
            id="contact-phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Your phone number"
            required
            aria-required="true"
            aria-invalid={status === "error" && !formData.phone}
            className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-stone-900 outline-none ring-0 placeholder:text-stone-500 focus:border-[#fcc000] focus-visible:ring-4 focus-visible:ring-[#fcc000]/20"
          />
        </label>
      </div>

      <label htmlFor="contact-email" className="mt-4 grid gap-2 text-sm font-medium text-stone-700">
        Email
        <input
          id="contact-email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          required
          aria-required="true"
          aria-invalid={status === "error" && !formData.email}
          className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-stone-900 outline-none ring-0 placeholder:text-stone-500 focus:border-[#fcc000] focus-visible:ring-4 focus-visible:ring-[#fcc000]/20"
        />
      </label>

      <label htmlFor="contact-message" className="mt-4 grid gap-2 text-sm font-medium text-stone-700">
        Message
        <textarea
          id="contact-message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us your destination, travel dates, and number of travelers."
          required
          aria-required="true"
          aria-invalid={status === "error" && !formData.message}
          className="min-h-[12rem] rounded-2xl border border-black/10 bg-white px-4 py-3 text-stone-900 outline-none ring-0 placeholder:text-stone-500 focus:border-[#fcc000] focus-visible:ring-4 focus-visible:ring-[#fcc000]/20"
        />
      </label>

      {status === "success" && (
        <div role="status" className="mt-4 rounded-2xl bg-green-50 p-4 text-sm text-green-700 border border-green-200">
          ✓ Thank you! Your inquiry has been sent successfully. We'll contact you soon.
        </div>
      )}

      {status === "error" && (
        <div role="alert" className="mt-4 rounded-2xl bg-red-50 p-4 text-sm text-red-700 border border-red-200">
          ✗ {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        aria-busy={loading}
        className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full border border-[#fcc000]/40 bg-[#fcc000] px-6 text-sm font-semibold text-black shadow-sm transition hover:-translate-y-0.5 hover:bg-[#ffd24d] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Sending..." : "Send inquiry"}
      </button>
    </form>
  );
}
