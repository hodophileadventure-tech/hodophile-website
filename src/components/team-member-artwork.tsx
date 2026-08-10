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
      <div className="card-accent" aria-hidden />
      <div className="avatar-frame">
        {profile.image ? (
          <img
            className={`portrait portrait-${profile.id}`}
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
        }

        .team-card-featured { min-height: 0; }

        .card-accent {
          display: none;
        }

        .avatar-frame {
          display: grid;
          width: 100%;
          aspect-ratio: 1;
          margin: 0 0 1.15rem;
          overflow: hidden;
          place-items: center;
          position: relative;
          border: 3px solid #fcc000;
          border-radius: 0;
          background: #fff;
        }

        .team-card-featured .avatar-frame {
          height: auto;
        }

        .avatar-frame::after {
          position: absolute;
          z-index: 2;
          right: 0;
          bottom: 0;
          left: 0;
          height: 18%;
          background: #fff;
          content: "";
          pointer-events: none;
        }

        .portrait {
          position: relative;
          z-index: 1;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: 50% 38%;
          /* Source artwork has generous transparent margins; crop them out. */
          transform: scale(2.05);
          transform-origin: center;
        }

        /* Normalize the differently composed source artworks to one portrait scale. */
        .portrait-qasim,
        .portrait-israr { transform: scale(1.85); }

        .portrait-altamash,
        .portrait-areeba { transform: scale(1.95); }

        .portrait-emran { transform: scale(1.9); }

        .portrait-maaz,
        .portrait-sameer,
        .portrait-sikandar { transform: scale(2.25); }

        .portrait-israr { top: 14px; }
        .portrait-maaz { top: 36px; }
        .portrait-altamash { top: 7px; }
        .portrait-sameer { top: 22px; }
        .portrait-sikandar { top: 28px; }

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

        @media (max-width: 560px) {
          .team-card,
          .team-card-featured { min-height: 0; }
        }
      `}</style>
    </motion.article>
  );
}
