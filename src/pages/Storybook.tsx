import { useLocation, useNavigate } from "react-router-dom";

import ThemeToggle from "../components/ThemeToggle";

import type {
  AiCompanion,
  PersonalityType,
} from "../data/aiCompanions";

import "./Storybook.css";

type StorybookLocationState = {
  userPersonalityType?: PersonalityType;
  matchedPersonalityType?: PersonalityType;
  companion?: AiCompanion;
};

function Storybook() {
  const navigate = useNavigate();
  const location = useLocation();

  const state =
    location.state as StorybookLocationState | null;

  const companion = state?.companion;
  const userPersonalityType =
    state?.userPersonalityType;
  const matchedPersonalityType =
    state?.matchedPersonalityType;

  if (!companion) {
    return (
      <main className="storybook-page">
        <button
          className="storybook-home-button"
          type="button"
          onClick={() => navigate("/")}
        >
          ← Back to home
        </button>

        <div className="storybook-theme-toggle">
          <ThemeToggle />
        </div>

        <section className="storybook-unavailable-card">
          <div className="storybook-unavailable-icon">
            📖
          </div>

          <h1>Storybook unavailable</h1>

          <p>
            Your companion details are missing. Please
            complete the assessment again before opening
            the storybook.
          </p>

          <button
            className="storybook-primary-button"
            type="button"
            onClick={() => navigate("/assessment")}
          >
            Return to assessment
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="storybook-page">
      <button
        className="storybook-home-button"
        type="button"
        onClick={() => navigate("/")}
      >
        ← Back to home
      </button>

      <div className="storybook-theme-toggle">
        <ThemeToggle />
      </div>

      <section className="storybook-container">
        <header className="storybook-header">
          <p className="storybook-label">
            Your companion’s story
          </p>

          <h1>
            {companion.name}
          </h1>

          <p className="storybook-subtitle">
            Discover the story behind the companion
            selected to complement your personality.
          </p>
        </header>

        <article className="storybook-book">
          <div className="storybook-page-number">
            Chapter One
          </div>

          <div className="storybook-avatar">
            {companion.name.charAt(0)}
          </div>

          <h2>
            The beginning of {companion.name}'s story
          </h2>

          <p className="storybook-opening-line">
            “{companion.greeting}”
          </p>

          <p>
            {companion.name} has always experienced the
            world through a{" "}
            {companion.personalityType} perspective.
            Their thoughtful way of communicating helps
            them understand people whose strengths and
            preferences differ from their own.
          </p>

          <p>
            You are {userPersonalityType}, while{" "}
            {companion.name} is{" "}
            {matchedPersonalityType}. Together, these
            personality styles can bring different ideas,
            perspectives and strengths into the same
            conversation.
          </p>

          <p>
            This is not simply the story of an AI
            companion. It is the beginning of a shared
            journey shaped by curiosity, reflection and
            meaningful conversation.
          </p>
        </article>

        <footer className="storybook-actions">
          <button
            className="storybook-secondary-button"
            type="button"
            onClick={() => navigate(-1)}
          >
            ← Back to companion
          </button>

          <button
            className="storybook-primary-button"
            type="button"
          >
            Begin our story →
          </button>
        </footer>
      </section>
    </main>
  );
}

export default Storybook;