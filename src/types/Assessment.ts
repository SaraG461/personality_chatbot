export type PersonalityLetter =
  | "E"
  | "I"
  | "S"
  | "N"
  | "T"
  | "F"
  | "J"
  | "P";

export type PersonalityDimension = "EI" | "SN" | "TF" | "JP";

export type AssessmentOption = {
  text: string;
  value: PersonalityLetter;
};

export type AssessmentQuestion = {
  id: number;
  category: string;
  dimension: PersonalityDimension;
  question: string;
  options: [AssessmentOption, AssessmentOption];

  /*
   * One question in each dimension has a weight of 2.
   * This helps prevent an exact tie when users answer
   * four questions for each side.
   */
  weight?: number;
};

export type AssessmentAnswers = Record<number, PersonalityLetter>;

export type TraitPercentages = {
  E: number;
  I: number;
  S: number;
  N: number;
  T: number;
  F: number;
  J: number;
  P: number;
};

export type AssessmentResult = {
  personalityType: string;
  percentages: TraitPercentages;
  scores: Record<PersonalityLetter, number>;
};