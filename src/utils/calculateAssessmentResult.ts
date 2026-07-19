import { assessmentQuestions } from "../data/assessmentQuestions";

import type {
  AssessmentAnswers,
  AssessmentResult,
  PersonalityLetter,
} from "../types/Assessment";

// const personalityLetters: PersonalityLetter[] = [
//   "E",
//   "I",
//   "S",
//   "N",
//   "T",
//   "F",
//   "J",
//   "P",
// ];

export function calculateAssessmentResult(
  answers: AssessmentAnswers,
): AssessmentResult {
  const scores: Record<PersonalityLetter, number> = {
    E: 0,
    I: 0,
    S: 0,
    N: 0,
    T: 0,
    F: 0,
    J: 0,
    P: 0,
  };

  assessmentQuestions.forEach((question) => {
    const selectedLetter = answers[question.id];

    if (!selectedLetter) {
      return;
    }

    const weight = question.weight ?? 1;

    scores[selectedLetter] += weight;
  });

  const calculatePairPercentages = (
    firstLetter: PersonalityLetter,
    secondLetter: PersonalityLetter,
  ): [number, number] => {
    const firstScore = scores[firstLetter];
    const secondScore = scores[secondLetter];
    const total = firstScore + secondScore;

    if (total === 0) {
      return [50, 50];
    }

    const firstPercentage = Math.round((firstScore / total) * 100);
    const secondPercentage = 100 - firstPercentage;

    return [firstPercentage, secondPercentage];
  };

  const [ePercentage, iPercentage] = calculatePairPercentages("E", "I");
  const [sPercentage, nPercentage] = calculatePairPercentages("S", "N");
  const [tPercentage, fPercentage] = calculatePairPercentages("T", "F");
  const [jPercentage, pPercentage] = calculatePairPercentages("J", "P");

  const personalityType = [
    scores.E >= scores.I ? "E" : "I",
    scores.S >= scores.N ? "S" : "N",
    scores.T >= scores.F ? "T" : "F",
    scores.J >= scores.P ? "J" : "P",
  ].join("");

  return {
    personalityType,
    scores,
    percentages: {
      E: ePercentage,
      I: iPercentage,
      S: sPercentage,
      N: nPercentage,
      T: tPercentage,
      F: fPercentage,
      J: jPercentage,
      P: pPercentage,
    },
  };
}