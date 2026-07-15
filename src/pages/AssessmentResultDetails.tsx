import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import ThemeToggle from "../components/ThemeToggle";
import "./AssessmentResultDetails.css";

import {
  getAssessmentById,
  type AssessmentHistoryItem,
} from "../services/assessmentService";

import "./AssessmentResultDetails.css";

type TraitRowProps = {
  leftLabel: string;
  leftValue: number;
  rightLabel: string;
  rightValue: number;
};

function TraitRow({
  leftLabel,
  leftValue,
  rightLabel,
  rightValue,
}: TraitRowProps) {
  return (
    <div className="result-detail-trait">
      <div className="result-detail-trait-labels">
        <span>
          {leftLabel}: {leftValue}%
        </span>

        <span>
          {rightLabel}: {rightValue}%
        </span>
      </div>

      <div className="result-detail-trait-track">
        <div
          className="result-detail-trait-fill"
          style={{ width: `${leftValue}%` }}
        />
      </div>
    </div>
  );
}

function AssessmentResultDetails() {
  const navigate = useNavigate();
  const { assessmentId } = useParams();

  const [assessment, setAssessment] =
    useState<AssessmentHistoryItem | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadAssessment = async () => {
      const parsedId = Number(assessmentId);

      if (!Number.isInteger(parsedId) || parsedId <= 0) {
        setError("This assessment ID is not valid.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError("");

        const result = await getAssessmentById(parsedId);

        setAssessment(result);
      } catch (caughtError) {
        const message =
          caughtError instanceof Error
            ? caughtError.message
            : "The assessment result could not be loaded.";

        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    void loadAssessment();
  }, [assessmentId]);

  const formatDate = (dateValue: string) => {
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateValue));
  };

  return (
    <main className="result-details-page">
      <button
        className="result-details-back-button"
        type="button"
        onClick={() => navigate("/history")}
      >
        ← Back to history
      </button>

      <div className="result-details-theme-toggle">
        <ThemeToggle />
      </div>

      {isLoading && (
        <section className="result-details-message-card">
          <div className="result-details-loader" />

          <h1>Loading your result</h1>
        </section>
      )}

      {!isLoading && error && (
        <section className="result-details-message-card">
          <div className="result-details-message-icon">!</div>

          <h1>We could not load this result</h1>

          <p>{error}</p>

          <button
            className="result-details-primary-button"
            type="button"
            onClick={() => navigate("/history")}
          >
            Return to history
          </button>
        </section>
      )}

      {!isLoading && !error && assessment && (
        <section className="result-details-container">
          <header className="result-details-header">
            <p className="result-details-label">
              Personality result
            </p>

            <h1>{assessment.personality_type}</h1>

            <p>
              Completed on {formatDate(assessment.created_at)}
            </p>
          </header>

          <section className="result-details-card">
            <div className="result-details-companion">
              <div className="result-details-avatar">
                {assessment.companion_name
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <div>
                <span>Your matched AI companion</span>

                <h2>{assessment.companion_name}</h2>

                <p>
                  {assessment.matched_personality_type} personality
                </p>
              </div>
            </div>

            <div className="result-details-traits">
              <TraitRow
                leftLabel="Extraversion"
                leftValue={assessment.extraversion}
                rightLabel="Introversion"
                rightValue={assessment.introversion}
              />

              <TraitRow
                leftLabel="Sensing"
                leftValue={assessment.sensing}
                rightLabel="Intuition"
                rightValue={assessment.intuition}
              />

              <TraitRow
                leftLabel="Thinking"
                leftValue={assessment.thinking}
                rightLabel="Feeling"
                rightValue={assessment.feeling}
              />

              <TraitRow
                leftLabel="Judging"
                leftValue={assessment.judging}
                rightLabel="Perceiving"
                rightValue={assessment.perceiving}
              />
            </div>

            <div className="result-details-actions">
              <button
                className="result-details-secondary-button"
                type="button"
                onClick={() => navigate("/assessment")}
              >
                Retake assessment
              </button>

              <button
                className="result-details-primary-button"
                type="button"
              >
                Start chatting with {assessment.companion_name}
              </button>
            </div>
          </section>
        </section>
      )}
    </main>
  );
}

export default AssessmentResultDetails;