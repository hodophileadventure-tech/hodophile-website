"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
}

export function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={index}
          className="rounded-lg border-2 border-[#fcc000] bg-white overflow-hidden transition-all shadow-sm hover:shadow-md"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-[#fffbf0] transition-colors"
          >
            <h3 className="font-semibold text-[#fcc000] text-left text-lg">
              {item.title}
            </h3>
            <ChevronDown
              className={`w-5 h-5 text-[#fcc000] flex-shrink-0 transition-transform duration-300 ${
                openIndex === index ? "rotate-180" : ""
              }`}
            />
          </button>

          {openIndex === index && (
            <div className="px-6 py-4 border-t-2 border-[#fcc000]/20 bg-white text-stone-700 leading-7 space-y-4">
              {typeof item.content === "string" ? (
                <p>{item.content}</p>
              ) : (
                item.content
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
