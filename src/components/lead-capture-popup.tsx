'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  whatsapp: string;
}

export function LeadCapturePopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    whatsapp: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  // Show popup after 120 seconds (but only once per session)
  useEffect(() => {
    const hasShownPopup = sessionStorage.getItem('leadCapturePopupShown');
    if (!hasShownPopup) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        sessionStorage.setItem('leadCapturePopupShown', 'true');
      }, 120000); // 120 seconds

      return () => clearTimeout(timer);
    }
  }, []);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = 'WhatsApp number is required';
    } else if (!/^\d{10,}$/.test(formData.whatsapp.replace(/\D/g, ''))) {
      newErrors.whatsapp = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          whatsapp: formData.whatsapp,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setShowSuccess(true);
      setFormData({ name: '', email: '', whatsapp: '' });

      // Close popup after 3 seconds
      setTimeout(() => {
        setIsVisible(false);
        setShowSuccess(false);
      }, 3000);

      // Optionally open WhatsApp
      const whatsappNumber = formData.whatsapp.replace(/\D/g, '');
      if (whatsappNumber) {
        setTimeout(() => {
          window.open(
            `https://wa.me/${whatsappNumber}?text=Hi%20Hodophile%20Tours!%20I%27m%20interested%20in%20your%20travel%20packages.`,
            '_blank'
          );
        }, 3500);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 animate-fade-in"
        onClick={handleClose}
      />

      {/* Popup */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md animate-fade-in px-4">
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-black to-[#FCC000] p-6 relative">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-white hover:bg-white/20 p-1 rounded-full transition-colors"
              aria-label="Close popup"
            >
              <X size={24} />
            </button>
            <h2 className="text-white text-xl font-bold">Exclusive Travel Deals</h2>
            <p className="text-white/90 text-sm mt-1">Join our community & get special offers</p>
          </div>

          {/* Content */}
          {!showSuccess ? (
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FCC000] transition-colors ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  disabled={isLoading}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FCC000] transition-colors ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  disabled={isLoading}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* WhatsApp Field */}
              <div>
                <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-1">
                  WhatsApp Number
                </label>
                <input
                  id="whatsapp"
                  type="tel"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleInputChange}
                  placeholder="+92 XXX XXXXXXX"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FCC000] transition-colors ${
                    errors.whatsapp ? 'border-red-500' : 'border-gray-300'
                  }`}
                  disabled={isLoading}
                />
                {errors.whatsapp && <p className="text-red-500 text-xs mt-1">{errors.whatsapp}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-black to-[#FCC000] text-white font-semibold py-2 rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  'Get Exclusive Deals'
                )}
              </button>

              {/* Close link */}
              <button
                type="button"
                onClick={handleClose}
                className="w-full text-gray-600 text-sm hover:text-gray-800 transition-colors"
              >
                Maybe later
              </button>
            </form>
          ) : (
            /* Success Message */
            <div className="p-6 text-center">
              <div className="text-green-500 text-4xl mb-3">✓</div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Thank You!</h3>
              <p className="text-gray-600 text-sm">
                We'll send you exclusive deals and travel offers via WhatsApp soon.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Add animation styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
