import { useLocation, useNavigate } from "react-router-dom";

import ThemeToggle from "../components/ThemeToggle";

import type {
  AiCompanion,
  PersonalityType,
} from "../data/types/companion";

import "./Introduction.css";

type IntroductionLocationState = {
  userPersonalityType?: PersonalityType;
  matchedPersonalityType?: PersonalityType;
  companion?: AiCompanion;
};

function Introduction() {
  const navigate = useNavigate();
  const location = useLocation();

  const state =
    location.state as IntroductionLocationState | null;

  const userPersonalityType =
    state?.userPersonalityType;

  const matchedPersonalityType =
    state?.matchedPersonalityType;

  const companion = state?.companion;

  const handleReveal = () => {
    if (
      !userPersonalityType ||
      !matchedPersonalityType ||
      !companion
    ) {
      return;
    }

    navigate("/meet-companion", {
      state: {
        userPersonalityType,
        matchedPersonalityType,
        companion,
      },
    });
  };

  if (
    !userPersonalityType ||
    !matchedPersonalityType ||
    !companion
  ) {
    return (
      <main className="introduction-page">
        <div className="introduction-theme-toggle">
          <ThemeToggle />
        </div>

        <section className="introduction-error-card">
          <span className="introduction-error-icon">
            ✦
          </span>

          <h1>Your introduction could not be prepared</h1>

          <p>
            Please return to your assessment history and
            select your result again.
          </p>

          <button
            type="button"
            onClick={() => navigate("/history")}
          >
            Return to history
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="introduction-page">
      <div className="introduction-theme-toggle">
        <ThemeToggle />
      </div>

      <div
        className="introduction-glow introduction-glow-one"
        aria-hidden="true"
      />

      <div
        className="introduction-glow introduction-glow-two"
        aria-hidden="true"
      />

      <div
        className="introduction-particles"
        aria-hidden="true"
      >
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      <section className="introduction-scene">
        <div className="introduction-symbol">
          ✦
        </div>

        <p className="introduction-eyebrow">
          Your match has been found
        </p>

        <h1>
          Someone has been waiting
          <span>to meet you...</span>
        </h1>

        <p className="introduction-message">
          Your personalities have crossed paths for a
          reason. The next chapter begins with an
          introduction.
        </p>

        <div className="introduction-personality">
          <span>Your personality</span>
          <strong>{userPersonalityType}</strong>
        </div>

        <button
          className="introduction-reveal-button"
          type="button"
          onClick={handleReveal}
        >
          <span>Reveal your companion</span>
          <span aria-hidden="true">✦</span>
        </button>

        <button
          className="introduction-back-button"
          type="button"
          onClick={() => navigate(-1)}
        >
          Back to your result
        </button>
      </section>
    </main>
  );
}

export default Introduction;