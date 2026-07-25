import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import ThemeToggle from "../components/ThemeToggle";

import type {
  AiCompanion,
  PersonalityType,
} from "../data/types/companion";

import "./LetterInvitation.css";

type LetterInvitationState = {
  assessmentId?: number;

  userPersonalityType: PersonalityType;
  matchedPersonalityType: PersonalityType;
  companion: AiCompanion;

  extraversion: number;
  introversion: number;
  sensing: number;
  intuition: number;
  thinking: number;
  feeling: number;
  judging: number;
  perceiving: number;
};

function LetterInvitation() {
  const navigate = useNavigate();
  const location = useLocation();

  const state =
    location.state as LetterInvitationState | null;

  if (
    !state ||
    !state.userPersonalityType ||
    !state.matchedPersonalityType ||
    !state.companion
  ) {
    return (
      <main className="letter-invitation-page">
        <div className="letter-theme-toggle">
          <ThemeToggle />
        </div>

        <section className="letter-invitation-content">
          <h1>Your journey could not be prepared</h1>

          <p>
            Please return to your assessment history and
            open your result again.
          </p>

          <button
            className="open-letter-button"
            type="button"
            onClick={() =>
              navigate("/assessment-history")
            }
          >
            Return to history
          </button>
        </section>
      </main>
    );
  }

  const handleOpenLetter = () => {
    navigate("/personality-journey", {
      state,
    });
  };

  return (
    <main className="letter-invitation-page">
      <div className="letter-theme-toggle">
        <ThemeToggle />
      </div>

      <div className="letter-background-glow letter-glow-one" />
      <div className="letter-background-glow letter-glow-two" />

      <section className="letter-invitation-content">
        <p className="letter-eyebrow">
          Your journey continues
        </p>

        <button
          className="magical-envelope"
          type="button"
          onClick={handleOpenLetter}
          aria-label="Open your letter"
        >
          <span className="envelope-glow" />

          <span className="envelope-body">
            <span className="envelope-back" />

            <span className="envelope-letter">
              <span className="letter-line" />
              <span className="letter-line letter-line-medium" />
              <span className="letter-line letter-line-short" />
            </span>

            <span className="envelope-left-fold" />
            <span className="envelope-right-fold" />
            <span className="envelope-bottom-fold" />
            <span className="envelope-flap" />

            <span className="wax-seal">
              ✦
            </span>
          </span>
        </button>

        <div className="letter-invitation-copy">
          <h1>
            A letter has been prepared for you.
          </h1>

          <p>
            Every answer you shared has been carefully
            considered.
          </p>

          <p>
            Inside this letter is a reflection of the way
            you naturally think, feel, and see the world.
          </p>

          <p className="letter-companion-hint">
            It also explains why someone has been chosen
            to accompany your journey.
          </p>
        </div>

        <button
          className="open-letter-button"
          type="button"
          onClick={handleOpenLetter}
        >
          Open Letter

          <span
            className="open-letter-arrow"
            aria-hidden="true"
          >
            →
          </span>
        </button>

        <p className="letter-small-hint">
          Open when you are ready
        </p>
      </section>
    </main>
  );
}

export default LetterInvitation;