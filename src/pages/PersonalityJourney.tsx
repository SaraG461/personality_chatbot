import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import ThemeToggle from "../components/ThemeToggle";

import { personalityProfiles } from "../data/personalityProfiles";

import type {
  AiCompanion,
  PersonalityType,
} from "../data/types/companion";

import "./PersonalityJourney.css";

type JourneyStage =
  | "personality"
  | "chart"
  | "introduction";

type PersonalityJourneyLocationState = {
  assessmentId?: number;

  userPersonalityType?: PersonalityType;
  matchedPersonalityType?: PersonalityType;
  companion?: AiCompanion;

  extraversion?: number;
  introversion?: number;
  sensing?: number;
  intuition?: number;
  thinking?: number;
  feeling?: number;
  judging?: number;
  perceiving?: number;
};

const stageOrder: JourneyStage[] = [
  "personality",
  "chart",
  "introduction",
];

function PersonalityJourney() {
  const navigate = useNavigate();
  const location = useLocation();

  const [stage, setStage] =
  useState<JourneyStage>("personality");

  const state =
    location.state as PersonalityJourneyLocationState | null;

 

  const userPersonalityType =
    state?.userPersonalityType;

  const matchedPersonalityType =
    state?.matchedPersonalityType;

  const companion = state?.companion;

  const personalityProfile = userPersonalityType
  ? personalityProfiles[userPersonalityType]
  : undefined;

  const extraversion = state?.extraversion ?? 50;
    const introversion = state?.introversion ?? 50;
    const sensing = state?.sensing ?? 50;
    const intuition = state?.intuition ?? 50;
    const thinking = state?.thinking ?? 50;
    const feeling = state?.feeling ?? 50;
    const judging = state?.judging ?? 50;
    const perceiving = state?.perceiving ?? 50;

  const currentStageIndex =
    stageOrder.indexOf(stage);

  const handleRevealCompanion = () => {
    if (
      !userPersonalityType ||
      !matchedPersonalityType ||
      !companion
    ) {
      return;
    }

    navigate("/meet-companion", {
      state: {
        userPersonalityType,
        matchedPersonalityType,
        companion,
      },
    });
  };

  if (
  !userPersonalityType ||
  !matchedPersonalityType ||
  !companion ||
  !personalityProfile
) {
    return (
      <main className="personality-journey-page">
        <div className="personality-journey-theme">
          <ThemeToggle />
        </div>

        <section className="personality-journey-error">
          <h1>Your journey could not be prepared</h1>

          <p>
            Please return to your assessment history and
            open your result again.
          </p>

          <button
            type="button"
            onClick={() => navigate("/history")}
          >
            Return to history
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="personality-journey-page">
      <div className="personality-journey-theme">
        <ThemeToggle />
      </div>

      <p
        className="journey-page-number"
        aria-label={`Page ${currentStageIndex + 1} of 3`}
      >
        Page {currentStageIndex + 1} of 3
      </p>

      

      {stage === "personality" && (
        <section className="journey-stage">
          <p className="journey-eyebrow">
            Your personality type is
          </p>

          <h1 className="journey-personality-type">
            {userPersonalityType}
          </h1>

          <h2 className="journey-personality-title">
              {personalityProfile.title}
            </h2>

            <p className="journey-short-description">
              {personalityProfile.description}
            </p>

          <button
            className="journey-primary-button"
            type="button"
            onClick={() => setStage("chart")}
          >
            Continue
          </button>
        </section>
      )}

      {stage === "chart" && (
  <section className="journey-stage journey-chart-stage">
    <p className="journey-eyebrow">
      Your personality balance
    </p>

    <h1 className="journey-chart-title">
      How your preferences are shaped
    </h1>

    <div className="journey-trait-list">
      <div className="journey-trait-card">
        <div className="journey-trait-header">
          <span>
            <strong>E</strong> Extraversion
          </span>

          <span>
            <strong>I</strong> Introversion
          </span>
        </div>

        <div className="journey-trait-percentages">
          <span>{extraversion}%</span>
          <span>{introversion}%</span>
        </div>

        <div className="journey-trait-track">
          <div
            className="journey-trait-fill"
            style={{
              width: `${extraversion}%`,
            }}
          />
        </div>
      </div>

      <div className="journey-trait-card">
        <div className="journey-trait-header">
          <span>
            <strong>S</strong> Sensing
          </span>

          <span>
            <strong>N</strong> Intuition
          </span>
        </div>

        <div className="journey-trait-percentages">
          <span>{sensing}%</span>
          <span>{intuition}%</span>
        </div>

        <div className="journey-trait-track">
          <div
            className="journey-trait-fill"
            style={{
              width: `${sensing}%`,
            }}
          />
        </div>
      </div>

      <div className="journey-trait-card">
        <div className="journey-trait-header">
          <span>
            <strong>T</strong> Thinking
          </span>

          <span>
            <strong>F</strong> Feeling
          </span>
        </div>

        <div className="journey-trait-percentages">
          <span>{thinking}%</span>
          <span>{feeling}%</span>
        </div>

        <div className="journey-trait-track">
          <div
            className="journey-trait-fill"
            style={{
              width: `${thinking}%`,
            }}
          />
        </div>
      </div>

      <div className="journey-trait-card">
        <div className="journey-trait-header">
          <span>
            <strong>J</strong> Judging
          </span>

          <span>
            <strong>P</strong> Perceiving
          </span>
        </div>

        <div className="journey-trait-percentages">
          <span>{judging}%</span>
          <span>{perceiving}%</span>
        </div>

        <div className="journey-trait-track">
          <div
            className="journey-trait-fill"
            style={{
              width: `${judging}%`,
            }}
          />
        </div>
      </div>
    </div>

    <button
      className="journey-primary-button"
      type="button"
      onClick={() => setStage("introduction")}
    >
      Continue
    </button>
  </section>
)}

      {stage === "introduction" && (
        <section className="journey-stage">
          <span
            className="journey-symbol"
            aria-hidden="true"
          >
            ✦
          </span>

          <h1>
            Someone has been waiting to meet you...
          </h1>

          <button
            className="journey-primary-button"
            type="button"
            onClick={handleRevealCompanion}
          >
            Reveal Companion
          </button>
        </section>
      )}
    </main>
  );
}

export default PersonalityJourney;