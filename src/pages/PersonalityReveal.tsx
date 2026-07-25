import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import ThemeToggle from "../components/ThemeToggle";

import type {
  AiCompanion,
  PersonalityType,
} from "../data/types/companion";

import "./PersonalityReveal.css";

type PersonalityRevealLocationState = {
  assessmentId?: number;
  userPersonalityType?: PersonalityType;
  matchedPersonalityType?: PersonalityType;
  companion?: AiCompanion;
};

function PersonalityReveal() {
  const navigate = useNavigate();
  const location = useLocation();

  const state =
    location.state as PersonalityRevealLocationState | null;

  const assessmentId = state?.assessmentId;
  const userPersonalityType =
    state?.userPersonalityType;
  const matchedPersonalityType =
    state?.matchedPersonalityType;
  const companion = state?.companion;

  const handleRevealPersonality = () => {
    if (
      !assessmentId ||
      !userPersonalityType ||
      !matchedPersonalityType ||
      !companion
    ) {
      return;
    }

    navigate("/personality-details", {
        state: {
            assessmentId,
            userPersonalityType,
            matchedPersonalityType,
            companion,
        },
        });
  };

  if (
    !assessmentId ||
    !userPersonalityType ||
    !matchedPersonalityType ||
    !companion
  ) {
    return (
      <main className="personality-reveal-page">
        <div className="personality-reveal-theme">
          <ThemeToggle />
        </div>

        <section className="personality-reveal-error">
          <span aria-hidden="true">✦</span>

          <h1>Your result could not be prepared</h1>

          <p>
            Please return to your assessment history and
            open your result again.
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
    <main className="personality-reveal-page">
      <div className="personality-reveal-theme">
        <ThemeToggle />
      </div>

      <div
        className="personality-reveal-glow personality-reveal-glow-one"
        aria-hidden="true"
      />

      <div
        className="personality-reveal-glow personality-reveal-glow-two"
        aria-hidden="true"
      />

      <div
        className="personality-reveal-stars"
        aria-hidden="true"
      >
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      <section className="personality-reveal-content">
        <p className="personality-reveal-chapter">
          Chapter One
        </p>

        <div
          className="personality-reveal-letter"
          aria-hidden="true"
        >
          <span>✦</span>
        </div>

        <p className="personality-reveal-eyebrow">
          Your answers have been carefully considered
        </p>

        <h1>A letter has been prepared for you.</h1>

        <p className="personality-reveal-description">
          Within it is a reflection of your personality:
          the qualities that guide how you connect, think,
          decide and experience the world.
        </p>

        <button
          className="personality-reveal-button"
          type="button"
          onClick={handleRevealPersonality}
        >
          <span>Open your letter</span>
          <span aria-hidden="true">✦</span>
        </button>

        <button
          className="personality-reveal-back"
          type="button"
          onClick={() => navigate("/history")}
        >
          Return to assessment history
        </button>
      </section>
    </main>
  );
}

export default PersonalityReveal;