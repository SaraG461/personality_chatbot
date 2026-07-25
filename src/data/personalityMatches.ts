import type { PersonalityType } from "./types/companion";

export const personalityMatches: Record<
  PersonalityType,
  PersonalityType
> = {
  INFJ: "ENFP",
  INFP: "ENFJ",
  ENFJ: "INFP",
  ENFP: "INFJ",

  INTJ: "ENTP",
  INTP: "ENTJ",
  ENTJ: "INTP",
  ENTP: "INTJ",

  ISTJ: "ESFP",
  ISFJ: "ESTP",
  ESTJ: "ISFP",
  ESFJ: "ISTP",

  ISTP: "ESFJ",
  ISFP: "ESTJ",
  ESTP: "ISFJ",
  ESFP: "ISTJ",
};