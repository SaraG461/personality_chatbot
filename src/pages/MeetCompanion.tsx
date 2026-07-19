import { useLocation, useNavigate } from "react-router-dom";

import ThemeToggle from "../components/ThemeToggle";

import type {
  AICompanion,
  PersonalityType,
} from "../data/types/companion";

import "./MeetCompanion.css";

type MeetCompanionLocationState = {
  userPersonalityType: PersonalityType;
  matchedPersonalityType: PersonalityType;
  companion: AICompanion;
};

function MeetCompanion() {
  const navigate = useNavigate();
  const location = useLocation();

  const state =
    location.state as MeetCompanionLocationState | null;

  if (!state?.companion) {
    return (
      <main className="meet-companion-page">
        <div className="meet-companion-theme-toggle">
          <ThemeToggle />
        </div>

        <section className="meet-companion-error-card">
          <div className="meet-companion-error-icon">!</div>

          <p className="meet-companion-label">
            Companion unavailable
          </p>

          <h1>We could not load your companion</h1>

          <p>
            Please return to your assessment history and reveal
            your companion again.
          </p>

          <button
            className="meet-companion-primary-button"
            type="button"
            onClick={() => navigate("/history")}
          >
            Return to assessment history
          </button>
        </section>
      </main>
    );
  }

  const {
    userPersonalityType,
    matchedPersonalityType,
    companion,
  } = state;

  const handleOpenStorybook = () => {
    navigate("/storybook", {
      state: {
        userPersonalityType,
        matchedPersonalityType,
        companion,
      },
    });
  };

  return (
    <main className="meet-companion-page">
      <div className="meet-companion-background-glow" />

      <div className="meet-companion-particles">
        <span>✨</span>
        <span>🌸</span>
        <span>✨</span>
        <span>🌸</span>
        <span>✨</span>
        <span>🌸</span>
      </div>

      <button
        className="meet-companion-back-button"
        type="button"
        onClick={() => navigate(-1)}
      >
        ← Back to result
      </button>

      <div className="meet-companion-theme-toggle">
        <ThemeToggle />
      </div>

      <section className="meet-companion-card">
        <p className="meet-companion-label">
          Your companion has arrived
        </p>

        <div className="meet-companion-avatar">
          {companion.name.charAt(0)}
        </div>

        <p className="meet-companion-intro-text">
          Someone has been waiting to meet you...
        </p>

        <h1>{companion.name}</h1>

        <span className="meet-companion-type-badge">
          {matchedPersonalityType} · {companion.title}
        </span>

        <p className="meet-companion-match-text">
          Selected to complement your{" "}
          <strong>{userPersonalityType}</strong> personality
        </p>

        <p className="meet-companion-description">
          {companion.shortDescription}
        </p>

        <blockquote className="meet-companion-greeting">
          “{companion.greeting}”
        </blockquote>

        <div className="meet-companion-actions">
          <button
            className="meet-companion-secondary-button"
            type="button"
            onClick={() => navigate("/history")}
          >
            Assessment history
          </button>

          <button
            className="meet-companion-primary-button"
            type="button"
            onClick={handleOpenStorybook}
          >
            📖 Open {companion.name}&apos;s storybook
          </button>
        </div>
      </section>
    </main>
  );
}

export default MeetCompanion;