import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ThemeToggle from "../components/ThemeToggle";

import { aiCompanions } from "../data/aiCompanions";

import type {
  AiCompanion,
  PersonalityType,
} from "../data/types/companion";

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

  const findCompanion = (
    assessment: AssessmentHistoryItem,
  ): AiCompanion | undefined => {
    const storedMatchedType =
      assessment.matched_personality_type as PersonalityType;

    const companionFromType =
      aiCompanions[storedMatchedType];

    if (companionFromType) {
      return companionFromType;
    }

    const companionFromName = Object.values(
      aiCompanions,
    ).find(
      (companion) =>
        companion?.name.toLowerCase() ===
        assessment.companion_name.toLowerCase(),
    );

    return companionFromName ?? aiCompanions.INFJ;
  };

  const handleOpenLetter = (
    assessment: AssessmentHistoryItem,
  ) => {
    const companion = findCompanion(assessment);

    if (!companion) {
      setError(
        "The companion connected to this letter could not be found.",
      );
      return;
    }

    const userPersonalityType =
      assessment.personality_type as PersonalityType;

    const matchedPersonalityType =
      companion.personalityType;

    navigate("/letter-invitation", {
      state: {
        assessmentId: assessment.id,

        userPersonalityType,
        matchedPersonalityType,
        companion,

        extraversion: assessment.extraversion,
        introversion: assessment.introversion,
        sensing: assessment.sensing,
        intuition: assessment.intuition,
        thinking: assessment.thinking,
        feeling: assessment.feeling,
        judging: assessment.judging,
        perceiving: assessment.perceiving,
      },
    });
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
            Your collection of letters
          </p>

          <h1>Assessment history</h1>

          <p>
            Reopen a letter to revisit your personality
            journey and AI companion.
          </p>
        </header>

        {isLoading && (
          <section className="history-message-card">
            <div className="history-loader" />

            <h2>Loading your letters</h2>

            <p>
              Please wait while we retrieve your saved
              assessments.
            </p>
          </section>
        )}

        {!isLoading && error && (
          <section className="history-message-card">
            <div className="history-message-icon">
              !
            </div>

            <h2>We could not load your letters</h2>

            <p>{error}</p>

            <button
              className="history-primary-button"
              type="button"
              onClick={() =>
                void loadAssessmentHistory()
              }
            >
              Try again
            </button>
          </section>
        )}

        {!isLoading &&
          !error &&
          assessments.length === 0 && (
            <section className="history-message-card">
              <div className="history-message-icon">
                ✦
              </div>

              <h2>No letters yet</h2>

              <p>
                Complete your first personality
                assessment and your letter will appear
                here.
              </p>

              <button
                className="history-primary-button"
                type="button"
                onClick={() =>
                  navigate("/assessment")
                }
              >
                Start assessment
              </button>
            </section>
          )}

        {!isLoading &&
          !error &&
          assessments.length > 0 && (
            <section className="history-letter-grid">
              {assessments.map((assessment) => {
                const companion =
                  findCompanion(assessment);

                const companionName =
                  companion?.name ??
                  assessment.companion_name;

                return (
                  <article
                    className="history-letter-wrapper"
                    key={assessment.id}
                  >
                    <button
                      className="history-letter-card"
                      type="button"
                      onClick={() =>
                        handleOpenLetter(assessment)
                      }
                      aria-label={`Open a letter from ${companionName}`}
                    >
                      <span className="history-letter-date">
                        {formatDate(
                          assessment.created_at,
                        )}
                      </span>

                      <span
                        className="history-envelope"
                        aria-hidden="true"
                      >
                        <span className="history-envelope-glow" />

                        <span className="history-envelope-body">
                          <span className="history-envelope-letter">
                            <span className="history-letter-line" />
                            <span className="history-letter-line history-letter-line-medium" />
                            <span className="history-letter-line history-letter-line-short" />
                          </span>

                          <span className="history-envelope-left" />
                          <span className="history-envelope-right" />
                          <span className="history-envelope-bottom" />
                          <span className="history-envelope-flap" />

                          <span className="history-wax-seal">
                            ✦
                          </span>
                        </span>
                      </span>

                      <span className="history-letter-hover-content">
                        <span className="history-letter-from">
                          A letter from
                        </span>

                        <strong className="history-letter-companion-name">
                          {companionName}
                        </strong>
                      </span>

                      <span className="history-letter-open-text">
                        Open letter →
                      </span>
                    </button>
                  </article>
                );
              })}
            </section>
          )}
      </section>
    </main>
  );
}

export default AssessmentHistory;