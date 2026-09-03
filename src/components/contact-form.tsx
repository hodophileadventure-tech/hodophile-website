"use client";

import { useState } from "react";
import { motion } from "framer-motion";

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
  const [focusedField, setFocusedField] = useState<string | null>(null);

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

  const formFields = [
    { id: "contact-name", name: "name", type: "text", label: "Full Name", placeholder: "Your name" },
    { id: "contact-phone", name: "phone", type: "tel", label: "Phone Number", placeholder: "Your phone number" },
    { id: "contact-email", name: "email", type: "email", label: "Email Address", placeholder: "you@example.com" },
  ];

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="rounded-3xl border border-stone-200/50 bg-gradient-to-br from-white/80 to-stone-50/80 backdrop-blur-lg p-8 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
      noValidate
    >
      <div className="mb-8">
        <h3 className="text-2xl font-serif font-bold text-stone-950 mb-2">Get in Touch</h3>
        <p className="text-stone-600 text-sm">We'll get back to you within 24 hours to discuss your dream journey.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {formFields.slice(0, 2).map((field) => (
          <motion.div
            key={field.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            <label htmlFor={field.id} className="block text-sm font-semibold text-stone-700 mb-2">
              {field.label}
            </label>
            <div className="relative">
              <input
                id={field.id}
                type={field.type}
                name={field.name}
                value={formData[field.name as keyof typeof formData]}
                onChange={handleChange}
                onFocus={() => setFocusedField(field.name)}
                onBlur={() => setFocusedField(null)}
                placeholder={field.placeholder}
                required
                aria-required="true"
                aria-invalid={status === "error" && !formData[field.name as keyof typeof formData]}
                className="w-full rounded-xl border border-stone-200/60 bg-white/70 px-4 py-3 text-stone-900 placeholder:text-stone-400 transition-all duration-300 focus:bg-white focus:border-yellow-400/60 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 backdrop-blur-sm"
              />
              {focusedField === field.name && (
                <motion.div
                  layoutId={`focus-ring-${field.id}`}
                  className="absolute inset-0 rounded-xl border border-yellow-400/40 pointer-events-none"
                  transition={{ duration: 0.2 }}
                />
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mt-6 relative"
      >
        <label htmlFor="contact-email" className="block text-sm font-semibold text-stone-700 mb-2">
          {formFields[2].label}
        </label>
        <div className="relative">
          <input
            id="contact-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onFocus={() => setFocusedField("email")}
            onBlur={() => setFocusedField(null)}
            placeholder={formFields[2].placeholder}
            required
            aria-required="true"
            aria-invalid={status === "error" && !formData.email}
            className="w-full rounded-xl border border-stone-200/60 bg-white/70 px-4 py-3 text-stone-900 placeholder:text-stone-400 transition-all duration-300 focus:bg-white focus:border-yellow-400/60 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 backdrop-blur-sm"
          />
          {focusedField === "email" && (
            <motion.div
              className="absolute inset-0 rounded-xl border border-yellow-400/40 pointer-events-none"
              transition={{ duration: 0.2 }}
            />
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mt-6 relative"
      >
        <label htmlFor="contact-message" className="block text-sm font-semibold text-stone-700 mb-2">
          Message
        </label>
        <div className="relative">
          <textarea
            id="contact-message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            onFocus={() => setFocusedField("message")}
            onBlur={() => setFocusedField(null)}
            placeholder="Tell us about your destination dreams, travel dates, and number of travelers..."
            required
            aria-required="true"
            aria-invalid={status === "error" && !formData.message}
            className="w-full min-h-[140px] rounded-xl border border-stone-200/60 bg-white/70 px-4 py-3 text-stone-900 placeholder:text-stone-400 transition-all duration-300 focus:bg-white focus:border-yellow-400/60 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 backdrop-blur-sm resize-none"
          />
          {focusedField === "message" && (
            <motion.div
              className="absolute inset-0 rounded-xl border border-yellow-400/40 pointer-events-none"
              transition={{ duration: 0.2 }}
            />
          )}
        </div>
      </motion.div>

      {/* Status Messages */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: status !== "idle" ? 1 : 0, y: status !== "idle" ? 0 : -10 }}
        transition={{ duration: 0.3 }}
        className="mt-6"
      >
        {status === "success" && (
          <div role="status" className="rounded-xl bg-green-50/80 border border-green-200/60 p-4 text-sm text-green-700 backdrop-blur-sm flex items-start gap-3">
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="font-semibold">Success!</p>
              <p className="text-xs mt-1">Thank you! Your inquiry has been received. We'll contact you within 24 hours.</p>
            </div>
          </div>
        )}

        {status === "error" && (
          <div role="alert" className="rounded-xl bg-red-50/80 border border-red-200/60 p-4 text-sm text-red-700 backdrop-blur-sm flex items-start gap-3">
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="font-semibold">Error</p>
              <p className="text-xs mt-1">{errorMessage}</p>
            </div>
          </div>
        )}
      </motion.div>

      <motion.button
        type="submit"
        disabled={loading}
        aria-busy={loading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mt-8 btn-primary w-full justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
            </svg>
            Sending...
          </>
        ) : (
          <>
            Send Inquiry
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </>
        )}
      </motion.button>

      <p className="mt-6 text-xs text-stone-500 text-center">
        We respect your privacy. Your information will never be shared.
      </p>
    </motion.form>
  );
}
