import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import ThemeToggle from "../components/ThemeToggle";
import { aiCompanions } from "../data/aiCompanions";

import {
  getAssessmentById,
  type AssessmentHistoryItem,
} from "../services/assessmentService";

import type { PersonalityType } from "../data/types/companion";

import "./Assessment.css";

type TraitBarProps = {
  leftLabel: string;
  leftLetter: string;
  leftPercentage: number;
  rightLabel: string;
  rightLetter: string;
  rightPercentage: number;
};

function TraitBar({
  leftLabel,
  leftLetter,
  leftPercentage,
  rightLabel,
  rightLetter,
  rightPercentage,
}: TraitBarProps) {
  const dominantLetter =
    leftPercentage >= rightPercentage
      ? leftLetter
      : rightLetter;

  return (
    <div className="trait-result">
      <div className="trait-result-heading">
        <div>
          <strong>{leftLetter}</strong>
          <span>{leftLabel}</span>
        </div>

        <span className="dominant-trait">
          Stronger preference: {dominantLetter}
        </span>

        <div>
          <strong>{rightLetter}</strong>
          <span>{rightLabel}</span>
        </div>
      </div>

      <div className="trait-percentages">
        <span>{leftPercentage}%</span>
        <span>{rightPercentage}%</span>
      </div>

      <div className="trait-bar-track">
        <div
          className="trait-bar-left"
          style={{
            width: `${leftPercentage}%`,
          }}
        />
      </div>
    </div>
  );
}

function AssessmentResultDetails() {
  const navigate = useNavigate();

  const { assessmentId } = useParams<{
    assessmentId: string;
  }>();

  const [assessment, setAssessment] =
    useState<AssessmentHistoryItem | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isRevealing, setIsRevealing] = useState(false);

  useEffect(() => {
    const loadAssessment = async () => {
      if (!assessmentId) {
        setError("No assessment ID was provided.");
        setIsLoading(false);
        return;
      }

      const numericAssessmentId = Number(assessmentId);

      if (Number.isNaN(numericAssessmentId)) {
        setError("The assessment ID is invalid.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError("");

        const savedAssessment =
          await getAssessmentById(numericAssessmentId);

        setAssessment(savedAssessment);
      } catch (loadError) {
        const message =
          loadError instanceof Error
            ? loadError.message
            : "The assessment result could not be loaded.";

        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    loadAssessment();
  }, [assessmentId]);

  if (isLoading) {
    return (
      <main className="assessment-page">
        <button
          className="assessment-home-button"
          type="button"
          onClick={() => navigate("/history")}
        >
          ← Back to history
        </button>

        <div className="assessment-theme-toggle">
          <ThemeToggle />
        </div>

        <section className="assessment-complete-card">
          <p className="assessment-label">
            Loading assessment
          </p>

          <h1>Getting your result...</h1>
        </section>
      </main>
    );
  }

  if (error || !assessment) {
    return (
      <main className="assessment-page">
        <button
          className="assessment-home-button"
          type="button"
          onClick={() => navigate("/history")}
        >
          ← Back to history
        </button>

        <div className="assessment-theme-toggle">
          <ThemeToggle />
        </div>

        <section className="assessment-complete-card">
          <div className="completion-icon">!</div>

          <p className="assessment-label">
            Unable to load result
          </p>

          <h1>We could not find this assessment</h1>

          <p className="assessment-save-error">
            {error || "The assessment result was not found."}
          </p>

          <button
            className="assessment-primary-button"
            type="button"
            onClick={() => navigate("/history")}
          >
            Return to history
          </button>
        </section>
      </main>
    );
  }

  const matchedPersonalityType =
    assessment.matched_personality_type as PersonalityType;

  const matchedCompanion =
    aiCompanions[matchedPersonalityType];

  const formattedDate = new Date(
    assessment.created_at,
  ).toLocaleString("en-GB", {
    dateStyle: "long",
    timeStyle: "short",
  });

  const handleRevealCompanion = () => {
    if (!matchedCompanion || isRevealing) {
      return;
    }

    setIsRevealing(true);

    window.setTimeout(() => {
      navigate("/meet-companion", {
        state: {
          userPersonalityType:
            assessment.personality_type,
          matchedPersonalityType:
            assessment.matched_personality_type,
          companion: matchedCompanion,
        },
      });
    }, 1800);
  };

  return (
    <main className="assessment-page">
      <button
        className="assessment-home-button"
        type="button"
        onClick={() => navigate("/history")}
      >
        ← Back to history
      </button>

      <div className="assessment-theme-toggle">
        <ThemeToggle />
      </div>

      <section className="assessment-complete-card">
        <p className="assessment-label">
          Saved assessment result
        </p>

        <h1>
          Your personality type is{" "}
          {assessment.personality_type}
        </h1>

        <p className="completion-description">
          Completed on {formattedDate}
        </p>

        <div className="trait-results-list">
          <TraitBar
            leftLabel="Extraversion"
            leftLetter="E"
            leftPercentage={assessment.extraversion}
            rightLabel="Introversion"
            rightLetter="I"
            rightPercentage={assessment.introversion}
          />

          <TraitBar
            leftLabel="Sensing"
            leftLetter="S"
            leftPercentage={assessment.sensing}
            rightLabel="Intuition"
            rightLetter="N"
            rightPercentage={assessment.intuition}
          />

          <TraitBar
            leftLabel="Thinking"
            leftLetter="T"
            leftPercentage={assessment.thinking}
            rightLabel="Feeling"
            rightLetter="F"
            rightPercentage={assessment.feeling}
          />

          <TraitBar
            leftLabel="Judging"
            leftLetter="J"
            leftPercentage={assessment.judging}
            rightLabel="Perceiving"
            rightLetter="P"
            rightPercentage={assessment.perceiving}
          />
        </div>

        <div className="companion-reveal-section">
          {!isRevealing ? (
            <>
              <p className="assessment-label">
                Your companion is waiting
              </p>

              <h2>Ready to meet your companion?</h2>

              <p className="completion-description">
                A companion has been selected to complement
                your personality.
              </p>

              <button
                className="assessment-primary-button"
                type="button"
                onClick={handleRevealCompanion}
                disabled={!matchedCompanion}
              >
                ✨ Reveal your companion
              </button>

              {!matchedCompanion && (
                <p className="assessment-save-error">
                  The matched companion could not be found.
                </p>
              )}
            </>
          ) : (
            <div className="companion-searching">
              <div className="reveal-spinner" />

              <p className="assessment-label">
                Searching...
              </p>

              <h2>
                Finding the companion meant for you...
              </h2>

              <p className="completion-description">
                Preparing your introduction.
              </p>
            </div>
          )}
        </div>

        <div className="completion-actions">
          <button
            className="assessment-secondary-button"
            type="button"
            onClick={() => navigate("/history")}
            disabled={isRevealing}
          >
            ← Assessment history
          </button>
        </div>
      </section>
    </main>
  );
}

export default AssessmentResultDetails;