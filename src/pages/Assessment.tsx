import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ThemeToggle from "../components/ThemeToggle";

import { assessmentQuestions } from "../data/assessmentQuestions";
import { aiCompanions } from "../data/aiCompanions";
import { personalityMatches } from "../data/personalityMatches";

import { saveAssessment } from "../services/assessmentService";
import { calculateAssessmentResult } from "../utils/calculateAssessmentResult";

import type { PersonalityType } from "../data/types/companion";

import type {
  AssessmentAnswers,
  PersonalityLetter,
} from "../types/Assessment";

import "./Assessment.css";





function Assessment() {
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AssessmentAnswers>({});
  

  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [hasSaved, setHasSaved] = useState(false);

  const currentQuestion = assessmentQuestions[currentIndex];
  const selectedAnswer = answers[currentQuestion.id];

 const progress =
  ((currentIndex + 1) / assessmentQuestions.length) * 100;

const result = calculateAssessmentResult(answers);

const userPersonalityType =
  result.personalityType as PersonalityType;

const suggestedMatchedPersonalityType =
  personalityMatches[userPersonalityType];

const matchedPersonalityType: PersonalityType =
  aiCompanions[suggestedMatchedPersonalityType]
    ? suggestedMatchedPersonalityType
    : "INFJ";

const matchedCompanion =
  aiCompanions[matchedPersonalityType];

console.log("RESULT:", result);
console.log("USER TYPE:", userPersonalityType);
console.log(
  "SUGGESTED MATCH:",
  suggestedMatchedPersonalityType,
);
console.log(
  "FINAL MATCH:",
  matchedPersonalityType,
);
console.log("COMPANION:", matchedCompanion);



  const handleAnswer = (value: PersonalityLetter) => {
    setAnswers((previousAnswers) => ({
      ...previousAnswers,
      [currentQuestion.id]: value,
    }));
  };

         const handleSaveAssessment = async (): Promise<boolean> => {
  if (!matchedPersonalityType || !matchedCompanion) {
    setSaveError(
      "Your personality result could not be prepared.",
    );
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

const handleNext = async () => {
  if (!selectedAnswer || isSaving) {
    return;
  }

  const isLastQuestion =
    currentIndex ===
    assessmentQuestions.length - 1;

  if (isLastQuestion) {
    if (!matchedPersonalityType || !matchedCompanion) {
      setSaveError(
        "Your personality result could not be prepared.",
      );
      return;
    }

    const savedSuccessfully =
      await handleSaveAssessment();

    if (!savedSuccessfully) {
      return;
    }

    navigate("/letter-invitation", {
      state: {
        userPersonalityType:
          result.personalityType,

        matchedPersonalityType,
        companion: matchedCompanion,

        extraversion: result.percentages.E,
        introversion: result.percentages.I,
        sensing: result.percentages.S,
        intuition: result.percentages.N,
        thinking: result.percentages.T,
        feeling: result.percentages.F,
        judging: result.percentages.J,
        perceiving: result.percentages.P,
      },
    });

    return;
  }

  setSaveError("");

  setCurrentIndex(
    (previousIndex) => previousIndex + 1,
  );
};

const handleBack = () => {
  if (currentIndex > 0) {
    setSaveError("");

    setCurrentIndex(
      (previousIndex) => previousIndex - 1,
    );
  }
};

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
          <span>
            of {assessmentQuestions.length}
          </span>
        </div>
      </header>

      <div className="progress-track">
        <div
          className="progress-fill"
          style={{
            width: `${progress}%`,
          }}
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
          Choose the answer that feels most natural
          to you.
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
                  disabled={isSaving}
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

      {saveError && (
        <p className="assessment-save-error">
          {saveError}
        </p>
      )}

      <footer className="assessment-controls">
        <button
          className="assessment-back-button"
          type="button"
          onClick={handleBack}
          disabled={
            currentIndex === 0 || isSaving
          }
        >
          ← Back
        </button>

        <button
          className="assessment-primary-button"
          type="button"
          onClick={handleNext}
          disabled={!selectedAnswer || isSaving}
        >
          {isSaving
            ? "Preparing your letter..."
            : currentIndex ===
                assessmentQuestions.length - 1
              ? "Complete assessment"
              : "Continue →"}
        </button>
      </footer>
    </section>
  </main>
);
}

export default Assessment;