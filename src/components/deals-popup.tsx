"use client";

import { useState, useEffect } from "react";

export function DealsPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Check if user has closed the popup today
    const lastClosed = localStorage.getItem("dealsPopupClosedAt");
    const now = new Date().toDateString();
    
    // Show popup only if it hasn't been closed today
    if (!lastClosed || lastClosed !== now) {
      // Delay showing popup by 1 second for better UX
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Store that popup was closed today
    localStorage.setItem("dealsPopupClosedAt", new Date().toDateString());
  };

  if (!isMounted || !isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div
          className="relative w-full max-w-lg rounded-[15px] overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-300 my-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button - On Top of Image */}
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 z-20 bg-white/95 hover:bg-white p-2 rounded-full transition-all duration-200 hover:scale-110 shadow-lg"
            aria-label="Close popup"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-stone-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Image Container - Scrollable */}
          <div className="w-full bg-black overflow-y-auto max-h-[80vh]">
            <img
              src="/images/summer-tour-2026.jpg"
              alt="Summer Tour 2026 - Special Deals"
              className="w-full h-auto block"
            />
          </div>

          {/* Call-to-action button overlay */}
          <div className="bg-gradient-to-t from-black/95 via-black/70 to-transparent p-4 sm:p-6 flex justify-center">
            <button
              onClick={() => {
                handleClose();
                // Scroll to form or navigate
                document.getElementById("make-my-trip-form")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-[#FCC000] hover:bg-[#ffd700] text-black font-bold px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base rounded-[15px] transition-all duration-200 hover:shadow-lg hover:scale-105 whitespace-nowrap"
            >
              Book Your Tour Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
