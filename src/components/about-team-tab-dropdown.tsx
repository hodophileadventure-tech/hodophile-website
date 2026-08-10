"use client";

import Link from "next/link";
import { useState } from "react";

export function AboutTeamTabDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="about-team-tab-root">
      <div className="about-team-tab-bar">
        <Link href="/about-us" className="about-tab-label about-tab-label-active">
          About Us
        </Link>

        <div
          className="about-team-tab-wrap"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <button
            type="button"
            className="about-team-trigger"
            aria-haspopup="true"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((previous) => !previous)}
            onFocus={() => setIsOpen(true)}
          >
            <span>Our Team</span>
            <span className={`about-team-caret ${isOpen ? "about-team-caret-open" : ""}`} aria-hidden="true">
              ▾
            </span>
          </button>

          <div className={`about-team-dropdown-panel ${isOpen ? "about-team-dropdown-show" : ""}`}> 
            <Link href="/our-team" className="about-team-link" onClick={() => setIsOpen(false)}>
              <span>Meet the team</span>
              <span aria-hidden="true" className="about-team-link-arrow">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .about-team-tab-root {
          margin: 1.25rem 0 2rem;
        }

        .about-team-tab-bar {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .about-tab-label,
        .about-team-trigger {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #dccb88;
          border-radius: 999px;
          background: #fffdf7;
          padding: 0.58rem 1.05rem;
          color: #3a3224;
          font-size: 0.73rem;
          font-weight: 800;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          text-decoration: none;
          transition: all 160ms ease;
        }

        .about-tab-label-active {
          border-color: #fcc000;
          background: #fcc000;
          color: #221c00;
        }

        .about-team-trigger {
          gap: 0.55rem;
          cursor: pointer;
        }

        .about-team-trigger:hover,
        .about-team-trigger:focus,
        .about-tab-label:hover,
        .about-tab-label:focus {
          border-color: #b77e00;
          background: #fff7d8;
          color: #18130a;
        }

        .about-team-caret {
          transition: transform 180ms ease;
          font-size: 1.15rem;
          line-height: 1;
        }

        .about-team-caret-open {
          transform: rotate(180deg);
        }

        .about-team-tab-wrap {
          position: relative;
        }

        .about-team-tab-wrap:hover .about-team-caret,
        .about-team-tab-wrap:focus-within .about-team-caret {
          transform: rotate(180deg);
        }

        .about-team-dropdown-panel {
          position: absolute;
          top: calc(100% + 0.55rem);
          left: 0;
          min-width: 210px;
          padding: 0.45rem;
          border: 1px solid #fcc000;
          border-radius: 1rem;
          background: white;
          box-shadow: 0 22px 55px rgba(32, 24, 7, 0.14);
          opacity: 0;
          visibility: hidden;
          transform: translateY(-6px);
          transition: all 180ms ease;
        }

        .about-team-dropdown-show {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .about-team-tab-wrap:hover .about-team-dropdown-panel,
        .about-team-tab-wrap:focus-within .about-team-dropdown-panel {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .about-team-link {
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          width: 100%;
          padding: 0.72rem 0.88rem;
          border-radius: 0.75rem;
          color: #211b12;
          font-size: 0.74rem;
          font-weight: 800;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          text-decoration: none;
          background: #fff9e8;
        }

        .about-team-link:hover,
        .about-team-link:focus {
          background: #fcc000;
          color: #211b12;
        }

        .about-team-link-arrow {
          font-size: 1rem;
          transition: transform 180ms ease;
        }

        .about-team-link:hover .about-team-link-arrow,
        .about-team-link:focus .about-team-link-arrow {
          transform: translateX(2px);
        }

        @media (max-width: 640px) {
          .about-team-tab-bar {
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
