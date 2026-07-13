import { useNavigate } from "react-router-dom";

import ThemeToggle from "../components/ThemeToggle";

import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <main className="home-page">
      <div className="home-theme-toggle">
        <ThemeToggle />
      </div>
      <section className="hero">
        <p className="eyebrow">PERSONALITY-BASED AI COMPANION</p>

        <h1>
          Discover the AI companion
          <span> made for you</span>
        </h1>

        <p className="hero-description">
          Complete a personality assessment and get matched automatically with
          an AI companion suited to your communication style and personality.
        </p>

        <div className="hero-buttons">
          <button
            className="primary-button"
            type="button"
            onClick={() => navigate("/assessment")}
          >
            Start Assessment
          </button>

          <button className="secondary-button" type="button">
            View Assessment History
          </button>
        </div>
      </section>

      <section className="preview-card">
        <div className="preview-heading">
          <div>
            <p className="small-label">Example personality result</p>
            <h2>INFJ</h2>
          </div>

          <span className="match-badge">AI matched</span>
        </div>

        <div className="personality-details">
          <h3>The Advocate</h3>

          <p>
            Thoughtful, empathetic and motivated by meaningful connections.
          </p>
        </div>

        <div className="companion-card">
          <div className="avatar">L</div>

          <div>
            <p className="small-label">Your AI companion</p>
            <h3>Luna</h3>
            <p>Calm, supportive and reflective</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;