"use client";

import { TeamMemberArtwork } from "./team-member-artwork";

type TeamProfile = {
  id: string;
  name: string;
  role: string;
  image?: string;
};

const teamProfiles: readonly TeamProfile[] = [
  { id: "sana", name: "Sana Masood", role: "Chief Executive Officer" },
  { id: "masood", name: "Masood Ahmed", role: "Managing Director" },
  { id: "israr", name: "Israr Ahmed Siddiqui", image: "/images/package-cards/images__team__israar.webp", role: "Director Corporate" },
  { id: "yashar", name: "Yashar Ahmed Siddiqui", role: "HR" },
  { id: "maaz", name: "Maaz Ahmed Siddiqui", image: "/images/package-cards/images__team__maaz.webp", role: "Operations Executive" },
  { id: "qasim", name: "Qasim Ateeque", image: "/images/package-cards/images__team__qasim.webp", role: "Software Engineer" },
  { id: "altamash", name: "Altamash Ali", image: "/images/package-cards/images__team__ALTAMASH-ALI.webp", role: "Travel Consultant" },
  { id: "sameer", name: "Sameer Khan", image: "/images/package-cards/images__team__sameer--1-.webp", role: "Video Editor" },
  { id: "areeba", name: "Areeba Siddique", image: "/images/package-cards/images__team__areeba.webp", role: "Content Creator" },
  { id: "sikandar", name: "Sikandar Abbas", image: "/images/package-cards/images__team__sikander.webp", role: "Tour Manager" },
  { id: "emran", name: "Emraan Nadeem", image: "/images/package-cards/images__team__imran.webp", role: "Tour Manager" },
] as const;

function getMember(id: string) {
  return teamProfiles.find((member) => member.id === id)!;
}

export function AboutTeamShowcase() {
  return (
    <section className="team-showcase-root">
      <div className="team-showcase-shell">
        <div className="team-showcase-heading">
          <p className="eyebrow">OUR TEAM</p>
          <h2>Our leadership <span>team</span></h2>
          <p>Meet {teamProfiles.length} people across leadership, planning, operations, technology, and content.</p>
        </div>

        <h3 className="team-group-label">Leadership</h3>
        <div className="team-row row-ceo">
          <TeamMemberArtwork profile={getMember("sana")} featured />
        </div>

        <div className="team-row row-two">
          <TeamMemberArtwork profile={getMember("masood")} />
          <TeamMemberArtwork profile={getMember("israr")} />
        </div>

        <h3 className="team-group-label">People and operations</h3>
        <div className="team-row row-two">
          <TeamMemberArtwork profile={getMember("yashar")} />
          <TeamMemberArtwork profile={getMember("maaz")} />
        </div>

        <h3 className="team-group-label">Travel planning and on-trip support</h3>
        <div className="team-row row-four">
          <TeamMemberArtwork profile={getMember("altamash")} />
          <TeamMemberArtwork profile={getMember("sikandar")} />
          <TeamMemberArtwork profile={getMember("emran")} />
        </div>

        <h3 className="team-group-label">Technology and creative</h3>
        <div className="team-row row-four">
          <TeamMemberArtwork profile={getMember("qasim")} />
          <TeamMemberArtwork profile={getMember("sameer")} />
          <TeamMemberArtwork profile={getMember("areeba")} />
        </div>
      </div>

      <style jsx>{`
        .team-showcase-root {
          background: #fffdf9;
          padding: clamp(4.5rem, 8vw, 7.5rem) 0;
        }

        .team-showcase-shell {
          width: min(100%, 1320px);
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .team-showcase-heading {
          max-width: 740px;
          margin: 0 auto clamp(2.75rem, 5vw, 4.5rem);
          text-align: center;
        }

        .eyebrow {
          margin: 0 0 0.85rem;
          color: #b77e00;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.3em;
        }

        h2 {
          margin: 0;
          color: #1d1915;
          font-size: clamp(2.5rem, 5vw, 4.75rem);
          line-height: 0.98;
          letter-spacing: -0.055em;
        }

        h2 span { color: #b77e00; }

        .team-showcase-heading > p:last-child {
          margin: 1.1rem auto 0;
          color: #625a52;
          font-size: 1rem;
          line-height: 1.65;
        }

        .team-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: stretch;
          gap: 1.35rem;
          margin: 0 auto clamp(1rem, 2.25vw, 1.85rem);
        }

        .team-group-label {
          margin: clamp(2rem, 4vw, 3.25rem) 0 1.25rem;
          color: #8b6b00;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.2em;
          text-align: center;
          text-transform: uppercase;
        }

        .team-row :global(.team-card) { width: 340px; }

        @media (max-width: 920px) {
          .team-row :global(.team-card) { width: min(340px, calc(50% - 0.7rem)); }
        }

        @media (max-width: 560px) {
          .team-showcase-root { padding: 4rem 0; }
          .team-showcase-shell { padding: 0 1rem; }
          .team-row :global(.team-card) { width: min(100%, 340px); }
        }
      `}</style>
    </section>
  );
}
