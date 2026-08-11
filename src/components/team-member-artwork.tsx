"use client";

import { motion, useReducedMotion } from "framer-motion";

type TeamProfile = {
  id: string;
  name: string;
  role: string;
  image?: string;
};

type TeamMemberArtworkProps = {
  profile: TeamProfile;
  featured?: boolean;
};

export function TeamMemberArtwork({
  profile,
  featured = false,
}: TeamMemberArtworkProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      className={`team-card ${featured ? "team-card-featured" : ""}`}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45 }}
      whileHover={shouldReduceMotion ? undefined : { y: -7 }}
    >
      <div className="portrait-background" aria-hidden />
      <div className="yellow-decoration" aria-hidden />

      <div className="portrait-stage">
        {profile.image ? (
          <img
            className="person-image"
            src={profile.image}
            alt={`${profile.name} — ${profile.role}`}
          />
        ) : (
          <svg className="avatar-icon" viewBox="0 0 24 24" aria-hidden>
            <circle cx="12" cy="7.5" r="3.75" />
            <path d="M4 21c0-3.8 3.6-6.25 8-6.25s8 2.45 8 6.25" />
          </svg>
        )}
      </div>

      <div className="card-divider" aria-hidden>
        <span />
        <i />
        <span />
      </div>
      <h3>{profile.name}</h3>
      <p>{profile.role}</p>

      <style jsx>{`
        .team-card {
          position: relative;
          display: flex;
          min-height: 0;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          overflow: hidden;
          border: 0;
          background: transparent;
          padding: 0;
          box-shadow: none;
          text-align: center;
          height: 100%;
        }

        .team-card-featured { min-height: 0; }

        .portrait-background {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background: transparent;
        }

        .yellow-decoration {
          position: absolute;
          top: 12px;
          left: 22%;
          width: 74px;
          height: 74px;
          z-index: 1;
          pointer-events: none;
          background: linear-gradient(135deg, transparent 0%, transparent 48%, #fcc000 48%, #fcc000 100%);
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
          transform: rotate(-45deg);
          opacity: 0.95;
        }

        .portrait-stage {
          position: relative;
          z-index: 2;
          width: 100%;
          height: 330px;
          min-height: 330px;
          margin: 0 0 1.15rem;
          overflow: hidden;
          border: 3px solid #fcc000;
          border-radius: 0;
          background: #fff;
          display: flex;
          align-items: flex-start;
          justify-content: center;
        }

        .team-card-featured .portrait-stage {
          height: 330px;
        }

        .person-image {
          position: absolute;
          inset: 0;
          z-index: 2;
          width: 100%;
          height: 100%;
          max-width: none;
          object-fit: cover;
          object-position: center bottom;
        }

        .avatar-icon {
          z-index: 1;
          width: 84px;
          height: 84px;
          padding: 17px;
          border: 1px solid rgba(37, 33, 28, 0.7);
          border-radius: 50%;
          background: rgba(255, 253, 249, 0.8);
          fill: #c58a00;
          stroke: #201d1a;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-width: 1.5;
        }

        .card-divider {
          display: flex;
          width: 42px;
          align-items: center;
          justify-content: center;
          gap: 0;
          margin-bottom: 0.85rem;
        }

        .card-divider span {
          display: block;
          width: 100%;
          height: 2px;
          background: #fcc000;
        }

        .card-divider i {
          display: none;
        }

        h3 {
          margin: 0;
          color: #1d1915;
          font-size: 1.18rem;
          font-weight: 700;
          line-height: 1.2;
        }

        p {
          margin: 0.55rem 0 0;
          color: #8c650b;
          font-size: 0.66rem;
          font-weight: 800;
          letter-spacing: 0.13em;
          line-height: 1.35;
          text-transform: uppercase;
        }

        @media (max-width: 920px) {
          .team-card {
            height: auto;
          }
          .portrait-stage {
            height: 330px;
            min-height: 330px;
          }
        }

        @media (max-width: 560px) {
          .team-card,
          .team-card-featured { min-height: 0; }
          .portrait-stage {
            height: 330px;
            min-height: 330px;
          }
        }
      `}</style>
    </motion.article>
  );
}
