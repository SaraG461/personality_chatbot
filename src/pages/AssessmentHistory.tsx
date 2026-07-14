import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AssessmentHistory.css";

import ThemeToggle from "../components/ThemeToggle";

import {
  getAssessmentHistory,
  type AssessmentHistoryItem,
} from "../services/assessmentService";

import "./AssessmentHistory.css";

function AssessmentHistory() {
  const navigate = useNavigate();

  const [assessments, setAssessments] = useState<
    AssessmentHistoryItem[]
  >([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadAssessmentHistory = async () => {
    try {
      setIsLoading(true);
      setError("");

      const history = await getAssessmentHistory();

      setAssessments(history);
    } catch (caughtError) {
      const message =
        caughtError instanceof Error
          ? caughtError.message
          : "The assessment history could not be loaded.";

      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadAssessmentHistory();
  }, []);

  const formatDate = (dateValue: string) => {
    const parsedDate = new Date(dateValue);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Date unavailable";
    }

    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(parsedDate);
  };

  return (
    <main className="history-page">
      <button
        className="history-home-button"
        type="button"
        onClick={() => navigate("/")}
      >
        ← Back to home
      </button>

      <div className="history-theme-toggle">
        <ThemeToggle />
      </div>

      <section className="history-container">
        <header className="history-header">
          <p className="history-label">
            Your personality journey
          </p>

          <h1>Assessment history</h1>

          <p>
            Review your previous personality results and matched AI
            companions.
          </p>
        </header>

        {isLoading && (
          <section className="history-message-card">
            <div className="history-loader" />

            <h2>Loading your history</h2>

            <p>
              Please wait while we retrieve your saved assessments.
            </p>
          </section>
        )}

        {!isLoading && error && (
          <section className="history-message-card">
            <div className="history-message-icon">!</div>

            <h2>We could not load your history</h2>

            <p>{error}</p>

            <button
              className="history-primary-button"
              type="button"
              onClick={() => void loadAssessmentHistory()}
            >
              Try again
            </button>
          </section>
        )}

        {!isLoading &&
          !error &&
          assessments.length === 0 && (
            <section className="history-message-card">
              <div className="history-message-icon">?</div>

              <h2>No assessments yet</h2>

              <p>
                Complete your first personality assessment and
                your result will appear here.
              </p>

              <button
                className="history-primary-button"
                type="button"
                onClick={() => navigate("/assessment")}
              >
                Start assessment
              </button>
            </section>
          )}

        {!isLoading &&
          !error &&
          assessments.length > 0 && (
            <section className="history-list">
              {assessments.map((assessment) => (
                <article
                  className="history-card"
                  key={assessment.id}
                >
                  <div className="history-card-top">
                    <div>
                      <p className="history-date">
                        {formatDate(assessment.created_at)}
                      </p>

                      <h2>{assessment.personality_type}</h2>
                    </div>

                    <span className="history-match-badge">
                      Matched
                    </span>
                  </div>

                  <div className="history-match-section">
                    <div className="history-companion-avatar">
                      {assessment.companion_name
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <div>
                      <span>Your AI companion</span>

                      <h3>{assessment.companion_name}</h3>

                      <p>
                        {assessment.matched_personality_type}{" "}
                        personality
                      </p>
                    </div>
                  </div>

                  <div className="history-trait-grid">
                    <div>
                      <span>E / I</span>

                      <strong>
                        {assessment.extraversion}% /{" "}
                        {assessment.introversion}%
                      </strong>
                    </div>

                    <div>
                      <span>S / N</span>

                      <strong>
                        {assessment.sensing}% /{" "}
                        {assessment.intuition}%
                      </strong>
                    </div>

                    <div>
                      <span>T / F</span>

                      <strong>
                        {assessment.thinking}% /{" "}
                        {assessment.feeling}%
                      </strong>
                    </div>

                    <div>
                      <span>J / P</span>

                      <strong>
                        {assessment.judging}% /{" "}
                        {assessment.perceiving}%
                      </strong>
                    </div>
                  </div>

                  <button
                    className="history-secondary-button"
                    type="button"
                  >
                    View full result
                  </button>
                </article>
              ))}
            </section>
          )}
      </section>
    </main>
  );
}

export default AssessmentHistory;