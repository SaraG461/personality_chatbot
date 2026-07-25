import { useNavigate } from "react-router-dom";

import ThemeToggle from "../components/ThemeToggle";

import "./CompanionIntro.css";

function CompanionIntro() {
  const navigate = useNavigate();

  return (
    <main className="companion-intro-page">
      <button
        className="companion-intro-home-button"
        type="button"
        onClick={() => navigate("/")}
      >
        ← Back to home
      </button>

      <div className="companion-intro-theme-toggle">
        <ThemeToggle />
      </div>

      <section className="companion-intro-card">
        <p className="companion-intro-label">
          Your companion match
        </p>

        <div className="companion-intro-avatar">
          ?
        </div>

        <p className="companion-intro-small-text">
          Let me introduce you to
        </p>

        <h1>Your companion</h1>

        <p className="companion-intro-description">
          Your companion details will appear here.
        </p>

        <div className="companion-intro-actions">
          <button
            className="companion-intro-secondary-button"
            type="button"
            onClick={() => navigate(-1)}
          >
            ← View my result
          </button>

          <button
            className="companion-intro-primary-button"
            type="button"
          >
            📖 Open my storybook
          </button>
        </div>
      </section>
    </main>
  );
}

export default CompanionIntro;