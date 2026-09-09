"use client";

import { useState, useEffect } from "react";

export function DealsPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Check if user has closed the popup in this session (page load)
    const wasClosedThisSession = sessionStorage.getItem("dealsPopupClosedThisSession");
    
    // Show popup only if it hasn't been closed in this session
    if (!wasClosedThisSession) {
      // Delay showing popup by 1 second for better UX
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Mark popup as closed for this session only
    sessionStorage.setItem("dealsPopupClosedThisSession", "true");
  };

  if (!isMounted || !isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[101] flex items-center justify-center overflow-y-auto p-3 sm:p-4">
        <div
          className="relative my-2 flex max-h-[calc(100svh-1.5rem)] w-[min(92vw,32rem)] flex-col overflow-visible rounded-[15px] shadow-2xl animate-in fade-in zoom-in-95 duration-300 sm:my-8 sm:max-h-[calc(100vh-4rem)] sm:w-full sm:max-w-lg"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button - On Top of Image */}
          <button
            onClick={handleClose}
            className="absolute right-3 top-3 z-30 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/95 p-0 text-stone-900 shadow-lg transition-transform duration-200 hover:scale-110 hover:bg-white"
            aria-label="Close popup"
          >
            <svg
              className="h-5 w-5 sm:h-6 sm:w-6"
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

          <div className="min-h-0 overflow-hidden rounded-[15px]">
            {/* Image Container - Scrollable */}
            <div className="w-full bg-black sm:max-h-[80vh]">
              <img
                src="/images/summer-tour-2026.jpg"
                alt="Summer Tour 2026 - Special Deals"
                className="block max-h-[calc(100svh-8rem)] w-full object-contain sm:max-h-none sm:object-cover"
              />
            </div>

            {/* Call-to-action button overlay */}
            <div className="flex justify-center bg-gradient-to-t from-black/95 via-black/70 to-transparent p-4 sm:p-6">
              <button
                onClick={() => {
                  handleClose();
                  // Scroll to form or navigate
                  document.getElementById("make-my-trip-form")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="rounded-[15px] bg-[#FCC000] px-6 py-2.5 text-sm font-bold text-black transition-all duration-200 hover:scale-105 hover:bg-[#ffd700] hover:shadow-lg sm:px-8 sm:py-3 sm:text-base"
              >
                Book Your Tour Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
