import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ThemeToggle from "../components/ThemeToggle";

import { assessmentQuestions } from "../data/assessmentQuestions";
import {
  aiCompanions,
  personalityMatches,
} from "../data/aiCompanions";

import { saveAssessment } from "../services/assessmentService";
import { calculateAssessmentResult } from "../utils/calculateAssessmentResult";

import type { PersonalityType } from "../data/aiCompanions";

import type {
  AssessmentAnswers,
  PersonalityLetter,
} from "../types/Assessment";

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
    leftPercentage >= rightPercentage ? leftLetter : rightLetter;

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
          style={{ width: `${leftPercentage}%` }}
        />
      </div>
    </div>
  );
}

function Assessment() {
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AssessmentAnswers>({});
  const [isComplete, setIsComplete] = useState(false);
  const [showCompanion, setShowCompanion] = useState(false);

  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [hasSaved, setHasSaved] = useState(false);

  const currentQuestion = assessmentQuestions[currentIndex];
  const selectedAnswer = answers[currentQuestion.id];

  const progress = isComplete
    ? 100
    : ((currentIndex + 1) / assessmentQuestions.length) * 100;

  const result = isComplete
    ? calculateAssessmentResult(answers)
    : null;

  const userPersonalityType =
    result?.personalityType as PersonalityType | undefined;

  const matchedPersonalityType = userPersonalityType
    ? personalityMatches[userPersonalityType]
    : undefined;

  const matchedCompanion = matchedPersonalityType
    ? aiCompanions[matchedPersonalityType]
    : undefined;

  const handleAnswer = (value: PersonalityLetter) => {
    setAnswers((previousAnswers) => ({
      ...previousAnswers,
      [currentQuestion.id]: value,
    }));
  };

  const handleNext = () => {
    if (!selectedAnswer) {
      return;
    }

    if (currentIndex === assessmentQuestions.length - 1) {
      setIsComplete(true);
      return;
    }

    setCurrentIndex((previousIndex) => previousIndex + 1);
  };

  const handleBack = () => {
    if (isComplete) {
      setIsComplete(false);
      setShowCompanion(false);
      setSaveError("");
      return;
    }

    if (currentIndex > 0) {
      setCurrentIndex((previousIndex) => previousIndex - 1);
    }
  };

  const handleSaveAssessment = async (): Promise<boolean> => {
  if (
    !result ||
    !matchedPersonalityType ||
    !matchedCompanion
  ) {
    return false;
  }

  if (hasSaved) {
    return true;
  }

  try {
    setIsSaving(true);
    setSaveError("");

    await saveAssessment({
      result,
      matchedPersonalityType,
      companionName: matchedCompanion.name,
    });

    setHasSaved(true);
    return true;
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "The assessment could not be saved.";

    setSaveError(message);
    return false;
  } finally {
    setIsSaving(false);
  }
};

const handleMeetCompanion = async () => {
  const savedSuccessfully = await handleSaveAssessment();

  if (savedSuccessfully) {
    setShowCompanion(true);
  }
};

  if (isComplete && result && matchedCompanion) {
    return (
      <main className="assessment-page">
        <button
          className="assessment-home-button"
          type="button"
          onClick={() => navigate("/")}
        >
          ← Back to home
        </button>

        <div className="assessment-theme-toggle">
          <ThemeToggle />
        </div>

        <section
          className={`assessment-complete-card ${
            showCompanion ? "companion-card-reveal" : ""
          }`}
        >
          {!showCompanion ? (
            <>
              <div className="completion-icon">✓</div>

              <p className="assessment-label">
                Assessment complete
              </p>

              <h1>
                Your personality type is {result.personalityType}
              </h1>

              <p className="completion-description">
                Your result was calculated from your preferences across social
                energy, information style, decision-making and lifestyle.
              </p>

              <div className="trait-results-list">
                <TraitBar
                  leftLabel="Extraversion"
                  leftLetter="E"
                  leftPercentage={result.percentages.E}
                  rightLabel="Introversion"
                  rightLetter="I"
                  rightPercentage={result.percentages.I}
                />

                <TraitBar
                  leftLabel="Sensing"
                  leftLetter="S"
                  leftPercentage={result.percentages.S}
                  rightLabel="Intuition"
                  rightLetter="N"
                  rightPercentage={result.percentages.N}
                />

                <TraitBar
                  leftLabel="Thinking"
                  leftLetter="T"
                  leftPercentage={result.percentages.T}
                  rightLabel="Feeling"
                  rightLetter="F"
                  rightPercentage={result.percentages.F}
                />

                <TraitBar
                  leftLabel="Judging"
                  leftLetter="J"
                  leftPercentage={result.percentages.J}
                  rightLabel="Perceiving"
                  rightLetter="P"
                  rightPercentage={result.percentages.P}
                />
              </div>

              {saveError && (
                <p className="assessment-save-error">
                  {saveError}
                </p>
              )}

              {hasSaved && (
                <p className="assessment-save-success">
                  Your assessment was saved successfully.
                </p>
              )}

              <div className="completion-actions">
                <button
                  className="assessment-secondary-button"
                  type="button"
                  onClick={handleBack}
                  disabled={isSaving}
                >
                  Review last answer
                </button>

                <button
                  className="assessment-primary-button"
                  type="button"
                  onClick={handleMeetCompanion}
                  disabled={isSaving}
                >
                  {isSaving
                    ? "Saving result..."
                    : "Meet my AI companion →"}
                </button>
              </div>
            </>
          ) : (
            <div className="companion-introduction">
              <p className="assessment-label">
                Your companion match
              </p>

              <div className="companion-avatar-large">
                {matchedCompanion.name.charAt(0)}
              </div>

              <p className="companion-intro-text">
                Let me introduce you to
              </p>

              <h1>{matchedCompanion.name}</h1>

              <span className="companion-type-badge">
                {matchedCompanion.personalityType} ·{" "}
                {matchedCompanion.title}
              </span>

              <p className="companion-description">
                {matchedCompanion.description}
              </p>

              <blockquote className="companion-greeting">
                “{matchedCompanion.greeting}”
              </blockquote>

              <p className="matching-explanation">
                You are {result.personalityType}, and{" "}
                {matchedCompanion.name} uses a{" "}
                {matchedCompanion.personalityType} communication style selected
                to complement your personality preferences.
              </p>

              <div className="completion-actions">
                <button
                  className="assessment-secondary-button"
                  type="button"
                  onClick={() => setShowCompanion(false)}
                >
                  ← View my result
                </button>

                <button
                  className="assessment-primary-button"
                  type="button"
                >
                  Start chatting with {matchedCompanion.name} →
                </button>
              </div>
            </div>
          )}
        </section>
      </main>
    );
  }

  return (
    <main className="assessment-page">
      <button
        className="assessment-home-button"
        type="button"
        onClick={() => navigate("/")}
      >
        ← Back to home
      </button>

      <div className="assessment-theme-toggle">
        <ThemeToggle />
      </div>

      <section className="assessment-container">
        <header className="assessment-header">
          <div>
            <p className="assessment-label">
              Personality assessment
            </p>

            <h1>Discover how your mind works</h1>
          </div>

          <div className="question-counter">
            <strong>{currentIndex + 1}</strong>
            <span>of {assessmentQuestions.length}</span>
          </div>
        </header>

        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <section
          className="question-card"
          key={currentQuestion.id}
        >
          <div className="question-category">
            <span className="category-dot" />
            {currentQuestion.category}
          </div>

          <h2>{currentQuestion.question}</h2>

          <p className="question-help">
            Choose the answer that feels most natural to you.
          </p>

          <div className="answer-list">
            {currentQuestion.options.map(
              (option, optionIndex) => {
                const isSelected =
                  selectedAnswer === option.value;

                return (
                  <button
                    className={`answer-card ${
                      isSelected
                        ? "answer-card-selected"
                        : ""
                    }`}
                    type="button"
                    key={option.value}
                    onClick={() =>
                      handleAnswer(option.value)
                    }
                  >
                    <span className="answer-letter">
                      {optionIndex === 0 ? "A" : "B"}
                    </span>

                    <span className="answer-text">
                      {option.text}
                    </span>

                    <span className="answer-check">
                      {isSelected ? "✓" : ""}
                    </span>
                  </button>
                );
              },
            )}
          </div>
        </section>

        <footer className="assessment-controls">
          <button
            className="assessment-back-button"
            type="button"
            onClick={handleBack}
            disabled={currentIndex === 0}
          >
            ← Back
          </button>

          <button
            className="assessment-primary-button"
            type="button"
            onClick={handleNext}
            disabled={!selectedAnswer}
          >
            {currentIndex === assessmentQuestions.length - 1
              ? "Complete assessment"
              : "Continue →"}
          </button>
        </footer>
      </section>
    </main>
  );
}

export default Assessment;