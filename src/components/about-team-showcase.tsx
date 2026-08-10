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
  { id: "israr", name: "Israr Ahmed Siddiqui", image: "/images/team/israar.png", role: "Director Corporate" },
  { id: "yashar", name: "Yashar Ahmed Siddiqui", role: "HR" },
  { id: "maaz", name: "Maaz Ahmed Siddiqui", image: "/images/team/maaz.png", role: "Operations Executive" },
  { id: "qasim", name: "Qasim Ateeque", image: "/images/team/qasim.png", role: "Software Engineer" },
  { id: "altamash", name: "Altamash Ali", image: "/images/team/ALTAMASH ALI.png", role: "Travel Consultant" },
  { id: "sameer", name: "Sameer Khan", image: "/images/team/sameer (1).png", role: "Video Editor" },
  { id: "areeba", name: "Areeba Siddique", image: "/images/team/areeba.png", role: "Content Creator" },
  { id: "sikandar", name: "Sikandar Abbas", image: "/images/team/sikander.png", role: "Tour Manager" },
  { id: "emran", name: "Emraan Nadeem", image: "/images/team/imran.png", role: "Tour Manager" },
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
          <p>Meet the people who bring thoughtful journeys and exceptional experiences to life.</p>
        </div>

        <div className="team-row row-ceo">
          <TeamMemberArtwork profile={getMember("sana")} featured />
        </div>

        <div className="team-row row-two">
          <TeamMemberArtwork profile={getMember("masood")} />
          <TeamMemberArtwork profile={getMember("israr")} />
        </div>

        <div className="team-row row-two">
          <TeamMemberArtwork profile={getMember("yashar")} />
          <TeamMemberArtwork profile={getMember("maaz")} />
        </div>

        <div className="team-row row-four">
          <TeamMemberArtwork profile={getMember("qasim")} />
          <TeamMemberArtwork profile={getMember("altamash")} />
          <TeamMemberArtwork profile={getMember("sameer")} />
          <TeamMemberArtwork profile={getMember("areeba")} />
        </div>

        <div className="team-row row-two">
          <TeamMemberArtwork profile={getMember("sikandar")} />
          <TeamMemberArtwork profile={getMember("emran")} />
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
