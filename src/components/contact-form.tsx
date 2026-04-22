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
        throw new Error(result.error || "Failed to submit form");
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
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm text-stone-700">
          Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-stone-900 outline-none ring-0 placeholder:text-stone-500 focus:border-[#fcc000]/50"
          />
        </label>
        <label className="grid gap-2 text-sm text-stone-700">
          Phone
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Your phone number"
            className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-stone-900 outline-none ring-0 placeholder:text-stone-500 focus:border-[#fcc000]/50"
          />
        </label>
      </div>

      <label className="mt-4 grid gap-2 text-sm text-stone-700">
        Email
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-stone-900 outline-none ring-0 placeholder:text-stone-500 focus:border-[#fcc000]/50"
        />
      </label>

      <label className="mt-4 grid gap-2 text-sm text-stone-700">
        Message
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us your destination, travel dates, and number of travelers."
          className="min-h-40 rounded-2xl border border-black/10 bg-white px-4 py-3 text-stone-900 outline-none ring-0 placeholder:text-stone-500 focus:border-[#fcc000]/50"
        />
      </label>

      {status === "success" && (
        <div className="mt-4 rounded-2xl bg-green-50 p-4 text-sm text-green-700 border border-green-200">
          ✓ Thank you! Your inquiry has been sent successfully. We'll contact you soon.
        </div>
      )}

      {status === "error" && (
        <div className="mt-4 rounded-2xl bg-red-50 p-4 text-sm text-red-700 border border-red-200">
          ✗ {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 inline-flex rounded-full border border-[#fcc000]/40 bg-[#fcc000] px-6 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Sending..." : "Send inquiry"}
      </button>
    </form>
  );
}
